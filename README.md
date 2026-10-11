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

1. Clone the Repository
bash
```
git clone https://github.com/HIBA-BEG/Wellness-Warriors-Client.git
```

5. Preview the production build:
   ```bash
   npm run preview
   ```

## Environment

The API base URL is `VITE_API_URL`. Copy the example file and point it at the API:

```bash
cp .env.example .env
```

```
VITE_API_URL=http://localhost:3000
```

`.env` is gitignored. Do not commit it.

## Vercel

1. Import this project in Vercel. The framework preset is Vite, and the build output is `dist`.
2. Set `VITE_API_URL` to the public API URL, for example `https://your-api.onrender.com`.
3. `vercel.json` rewrites every path to `index.html`, so routes such as `/reset-password` work on refresh.

## Scripts

```bash
npm run dev
npm run lint
npm run format:check
npm run build
```
