# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Agendado: Web3Forms + Google Sheets + Google Calendar

El formulario de `/agendar` usa Web3Forms como registro principal de la cita. Desde Web3Forms puedes activar la integración con Google Sheets para que cada envío caiga en una hoja de cálculo.

1. Crea un access key en Web3Forms.
2. Configura `VITE_WEB3FORMS_ACCESS_KEY` en `.env.local` y en Vercel.
3. En el panel de Web3Forms, conecta ese formulario con Google Sheets.
4. En Google Cloud, crea una cuenta de servicio y una llave JSON si quieres seguir creando eventos en Google Calendar.
5. Comparte el calendario destino con el email de la cuenta de servicio con permiso para modificar eventos.
6. Configura `GOOGLE_CALENDAR_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`.
7. Configura `BOOKING_NOTIFICATION_EMAILS` con los correos internos que deben recibir invitación de cada cita.

`POST /api/bookings` no guarda datos en una base de datos. Esa función serverless solo crea el evento en Google Calendar cuando las variables de Google están configuradas. Para probar esa función localmente usa `vercel dev`; `npm run dev` solo levanta Vite.

Las notificaciones de Google Calendar se envían cuando el evento tiene asistentes. Por defecto, el endpoint:

- Invita a los correos de `BOOKING_NOTIFICATION_EMAILS`.
- Invita al cliente si dejó correo, salvo que `BOOKING_NOTIFY_CUSTOMER_EMAIL=false`.
- Agrega recordatorio de `BOOKING_REMINDER_MINUTES` minutos con los métodos de `BOOKING_REMINDER_METHODS`.

Para que el formulario pueda enviar la cita a Web3Forms, configura:

```env
VITE_WEB3FORMS_ACCESS_KEY=...
```

Web3Forms está diseñado para enviarse desde el navegador con `https://api.web3forms.com/submit`. Esta variable usa prefijo `VITE_` porque Vite debe exponerla al frontend.

La llave privada debe conservar los saltos de línea escapados:

```env
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```
