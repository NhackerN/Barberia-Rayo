import { createSign, randomUUID } from 'node:crypto'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.events'
const DEFAULT_TIMEZONE = 'America/Mexico_City'
const DEFAULT_DURATION_MINUTES = 60
const DEFAULT_REMINDER_MINUTES = 30

class PublicError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return sendError(res, 405, 'Método no permitido.')
  }

  try {
    const missingConfig = getMissingConfig()

    if (missingConfig.length > 0) {
      return sendError(
        res,
        500,
        'Falta configurar Google Calendar en las variables de entorno.',
        { missingConfig }
      )
    }

    const payload = normalizePayload(await readJsonBody(req))

    let calendarEvent

    try {
      calendarEvent = await createCalendarEvent(payload)
    } catch (error) {
      console.error('Calendar sync failed:', error)
      throw new PublicError(
        'Tu solicitud fue enviada, pero no pudimos crear el evento en Google Calendar. Revisa la configuración del calendario.',
        502
      )
    }

    return res.status(201).json({
      ok: true,
      bookingId: payload.bookingId,
      calendarEventId: calendarEvent.id,
      calendarEventLink: calendarEvent.htmlLink ?? null,
      calendarWarning: calendarEvent.notificationWarning ?? null,
    })
  } catch (error) {
    console.error('Booking request failed:', error)

    if (error instanceof PublicError) {
      return sendError(res, error.statusCode, error.message)
    }

    return sendError(res, 500, 'No pudimos agendar la cita. Inténtalo de nuevo.')
  }
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }

  if (typeof req.body === 'string') {
    return JSON.parse(req.body)
  }

  const chunks = []

  for await (const chunk of req) {
    chunks.push(chunk)
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')
  return rawBody ? JSON.parse(rawBody) : {}
}

function normalizePayload(body) {
  const source = body && typeof body === 'object' ? body : {}
  const payload = {
    fullName: cleanString(source.fullName),
    phone: cleanString(source.phone),
    email: cleanString(source.email),
    service: cleanString(source.service),
    barber: cleanString(source.barber || 'Sin preferencia'),
    date: cleanString(source.date),
    time: cleanString(source.time),
    description: cleanString(source.description),
    comments: cleanString(source.comments),
    acceptTerms: Boolean(source.acceptTerms),
    wantContact: Boolean(source.wantContact),
    contactMethod: cleanString(source.contactMethod),
    bookingId: cleanString(source.bookingId) || randomUUID(),
  }

  const errors = []

  if (!payload.fullName) errors.push('Nombre completo')
  if (!payload.phone) errors.push('Teléfono / WhatsApp')
  if (!payload.service) errors.push('Servicio')
  if (!isIsoDate(payload.date)) errors.push('Fecha')
  if (!isTime(payload.time)) errors.push('Hora')
  if (!payload.acceptTerms) errors.push('Aceptación de contacto')
  if (payload.email && !isEmail(payload.email)) errors.push('Correo electrónico')
  if (payload.wantContact && !payload.contactMethod) errors.push('Método de contacto')

  if (errors.length > 0) {
    throw new PublicError(`Revisa estos campos: ${errors.join(', ')}.`, 400)
  }

  return payload
}

async function createCalendarEvent(payload) {
  const accessToken = await getGoogleAccessToken()
  const timeZone = process.env.BOOKING_TIMEZONE || DEFAULT_TIMEZONE
  const configuredDuration = Number(process.env.BOOKING_DURATION_MINUTES || DEFAULT_DURATION_MINUTES)
  const duration = Number.isFinite(configuredDuration)
    ? configuredDuration
    : DEFAULT_DURATION_MINUTES
  const attendees = getCalendarAttendees(payload)
  const startDateTime = `${payload.date}T${payload.time}:00`
  const endDateTime = addMinutesToLocalDateTime(payload.date, payload.time, duration)
  const calendarId = encodeURIComponent(process.env.GOOGLE_CALENDAR_ID)
  const event = {
    summary: `Cita: ${payload.fullName} - ${payload.service}`,
    description: buildCalendarDescription(payload),
    start: {
      dateTime: startDateTime,
      timeZone,
    },
    end: {
      dateTime: endDateTime,
      timeZone,
    },
    extendedProperties: {
      private: {
        bookingId: payload.bookingId,
        source: 'barberia-rayo-web',
      },
    },
    reminders: {
      useDefault: false,
      overrides: getReminderOverrides(),
    },
    guestsCanInviteOthers: false,
    guestsCanModify: false,
    guestsCanSeeOtherGuests: false,
  }

  if (attendees.length > 0) {
    event.attendees = attendees
  }

  const data = await insertCalendarEvent(calendarId, event, accessToken, attendees.length > 0)

  if (data?.error?.reason === 'forbiddenForServiceAccounts') {
    const fallbackEvent = { ...event }
    delete fallbackEvent.attendees

    const fallbackData = await insertCalendarEvent(calendarId, fallbackEvent, accessToken, false)

    if (fallbackData?.error) {
      throw new Error(`Google Calendar insert failed: ${JSON.stringify(fallbackData)}`)
    }

    return {
      ...fallbackData,
      notificationWarning:
        'Google Calendar no permitió enviar invitaciones desde una service account.',
    }
  }

  if (data?.error) {
    throw new Error(`Google Calendar insert failed: ${JSON.stringify(data)}`)
  }

  return data
}

async function insertCalendarEvent(calendarId, event, accessToken, shouldSendUpdates) {
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?sendUpdates=${
      shouldSendUpdates ? 'all' : 'none'
    }`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }
  )
  const data = await readApiResponse(response)

  if (!response.ok) {
    return {
      error: {
        reason: data?.error?.errors?.[0]?.reason,
        data,
      },
    }
  }

  return data
}

async function getGoogleAccessToken() {
  const assertion = createServiceAccountJwt()
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })
  const data = await readApiResponse(response)

  if (!response.ok || !data.access_token) {
    throw new Error(`Google token request failed: ${JSON.stringify(data)}`)
  }

  return data.access_token
}

function createServiceAccountJwt() {
  const now = Math.floor(Date.now() / 1000)
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  }
  const claimSet = {
    iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: GOOGLE_CALENDAR_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    exp: now + 3600,
    iat: now,
  }
  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
    JSON.stringify(claimSet)
  )}`
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n')
  const signature = createSign('RSA-SHA256').update(unsignedToken).sign(privateKey)

  return `${unsignedToken}.${base64UrlEncode(signature)}`
}

function getMissingConfig() {
  return [
    'GOOGLE_CALENDAR_ID',
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
  ].filter((key) => !process.env[key])
}

async function readApiResponse(response) {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function buildCalendarDescription(payload) {
  return [
    `ID: ${payload.bookingId}`,
    `Cliente: ${payload.fullName}`,
    `Teléfono / WhatsApp: ${payload.phone}`,
    payload.email ? `Correo: ${payload.email}` : null,
    `Servicio: ${payload.service}`,
    `Barbero: ${payload.barber}`,
    payload.description ? `Descripción: ${payload.description}` : null,
    payload.comments ? `Comentarios: ${payload.comments}` : null,
    payload.wantContact ? `Contacto preferido: ${payload.contactMethod}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function getCalendarAttendees(payload) {
  const notifyCustomer = process.env.BOOKING_NOTIFY_CUSTOMER_EMAIL !== 'false'
  const emails = [
    ...splitEmails(process.env.BOOKING_NOTIFICATION_EMAILS),
    notifyCustomer && payload.email ? payload.email : null,
  ].filter(Boolean)
  const uniqueEmails = [...new Set(emails.map((email) => email.toLowerCase()))]

  return uniqueEmails.map((email) => ({ email }))
}

function getReminderOverrides() {
  const minutes = Number(process.env.BOOKING_REMINDER_MINUTES || DEFAULT_REMINDER_MINUTES)
  const reminderMinutes = Number.isFinite(minutes) ? minutes : DEFAULT_REMINDER_MINUTES
  const methods = splitList(process.env.BOOKING_REMINDER_METHODS || 'popup,email')

  return methods.map((method) => ({
    method,
    minutes: reminderMinutes,
  }))
}

function splitEmails(value = '') {
  return splitList(value).filter(isEmail)
}

function splitList(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function addMinutesToLocalDateTime(date, time, minutesToAdd) {
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)
  const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes))

  utcDate.setUTCMinutes(utcDate.getUTCMinutes() + minutesToAdd)

  return [
    [
      utcDate.getUTCFullYear(),
      pad(utcDate.getUTCMonth() + 1),
      pad(utcDate.getUTCDate()),
    ].join('-'),
    [pad(utcDate.getUTCHours()), pad(utcDate.getUTCMinutes()), '00'].join(':'),
  ].join('T')
}

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function isTime(value) {
  return /^\d{2}:\d{2}$/.test(value)
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function sendError(res, statusCode, message, extra = {}) {
  return res.status(statusCode).json({
    ok: false,
    message,
    ...extra,
  })
}
