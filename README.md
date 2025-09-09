# Stock Market Prediction App

A real-time stock market tracking and prediction application built with React, TypeScript, and Vite.

## Features

- Real-time stock price tracking
- Interactive charts with multiple timeframes
- AI-powered market predictions
- Market sentiment analysis
- Responsive design with dark mode support

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
```

## Deploying to Render

1. **Push your code to GitHub.**
2. **Create a new Web Service on [Render](https://render.com/):**
   - Connect your GitHub repository.
   - Set the **Root Directory** to `project` (if your code is in the `project/` subfolder).
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Node Version:** 18.x or higher
3. **Add Environment Variables:**
   - `PORT=3000`
   - `NODE_ENV=production`
   - `VITE_API_URL=http://localhost:3001` (or your backend URL)
4. **(Optional) Deploy the backend (server/index.js) as a separate service** if you want real-time mock API and Socket.io features. Set its `PORT` (e.g., 3001) and update `VITE_API_URL` accordingly.
5. **Click "Create Web Service".**
6. **Visit your Render app URL to verify deployment.**

> See `.env.example` for required environment variables.

## Environment Variables

- `PORT`: Server port (default: 3000)
- `VITE_API_URL`: API URL for production

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- Lightweight Charts
- Express (Production server)
- Socket.io (Real-time updates) 