
# Event Registration Management - Frontend

This is the frontend application for the **Event Registration Management System**. It is built with **React.js** using **Vite** for development and build processes. The frontend interacts with the backend APIs to manage events, participants, and user authentication.

## Features

- Event Management: View and interact with a list of sporting events.
- Participant Registration: Register and view participants for specific events.
- User Authentication: Secure login and access control.
- State Management: Utilizes Context API for global state management.
- Protected Routes: Prevent unauthorized access to sensitive routes.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) installed

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/HIBA-BEG/Wellness-Warriors-Client.git
   cd wellness-warriors-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build the production bundle:
   ```bash
   npm run build
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
