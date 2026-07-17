# Wealth Wise Banking App

A React-based online banking frontend connected to a Sanity CMS / custom REST API backend.

## Stack

- **React 18** (Create React App)
- **React Router v6** for routing
- **React Hook Form + Yup** for form validation
- **Axios** for API calls
- **Framer Motion + AOS** for animations
- **react-select** for country picker

## How to run

```bash
npm start        # dev server on port 3000
npm run build    # production build
```

The workflow **Start App** (`npm start`) is already configured.

## Backend

API base URL is set in `src/context/context.js`:
```js
const baseUrl = "https://wealthwise-api-lmji.onrender.com";
```
No secrets are required to run the frontend.

## Pages

| Route | Component |
|---|---|
| `/` | Home |
| `/about` | About |
| `/login` | Login |
| `/register` | Register |
| `/faq` | Faq |
| `/contact` | Contacts |
| `/dashboard/*` | UserDashboard (protected) |

## Notes

- `jspdf` / `jspdf-autotable` are blocked by Replit's security policy; the PDF export in the dashboard is stubbed out.
- `package.json` includes `overrides` for several packages with CVEs (`websocket-driver`, `shell-quote`, `form-data`, `@babel/traverse`) to satisfy Replit's security firewall during `npm install`.

## User preferences

- Keep login/register form logic and API calls intact when redesigning pages.
