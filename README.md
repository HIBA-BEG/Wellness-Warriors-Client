# 🏅 Wellness Warriors - Client

## 👩🏻‍💻 Project Presentation
[Wellness Warriors Presentation HERE](https://www.canva.com/design/DAGX5mRxzho/EUheX8EtAlBNKnvmSsvz7Q/edit?utm_content=DAGX5mRxzho&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## 📋 Project Overview
A web application for managing sports event registrations, providing a streamlined solution for event organizers to manage events and participants efficiently.

## ✨ Features

- Event management (creation, modification, deletion)
- Participant management
- Printable participant lists
- Secure authentication
- Protected routes
- Global state management

## 🛠 Technology Stack

- React.js
- Vite
- React Router (Nested Routes)
- Context API
- Axios
- JWT Authentication

## 🔧 Prerequisites

- Node.js (v18+)
- npm

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/HIBA-BEG/Wellness-Warriors-Client.git
cd Wellness-Warriors-Client
```

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and set `VITE_API_URL` to the API, for example `http://localhost:3000`.

4. Start the development server:

```bash
npm run dev
```

5. Build and preview the production bundle:

```bash
npm run build
npm run preview
```

## Environment

| Name | Required | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | yes | API base URL. |
| `VITE_ENABLE_FORGOT_PASSWORD` | no | Set to `true` to show the forgot-password link. Default is off, because Render's free plan blocks SMTP. The `/forgot-password` and `/reset-password` routes stay available. |

`.env` is gitignored. Do not commit it.

## Vercel

1. Import this project in Vercel. Use the Vite preset, build command `npm run build`, and output directory `dist`.
2. Set `VITE_API_URL` to the public API URL, for example `https://your-api.onrender.com`.
3. Leave `VITE_ENABLE_FORGOT_PASSWORD` unset unless the API can send mail.
4. `vercel.json` rewrites every path to `index.html`, so routes such as `/reset-password` work on refresh.

The Dockerfile builds with Node 20 and serves `dist` with nginx on port 80. Pass `VITE_API_URL` as a build argument.

## Scripts

```bash
npm run dev
npm run lint
npm run format:check
npm run build
```
