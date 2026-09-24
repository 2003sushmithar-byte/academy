# Academy 🎓

A modern educational learning platform built with **React**, **Vite**, and **Tailwind CSS**.

## 📁 Project Structure

```
academy/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, and media files
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Generic buttons, cards, inputs, badges
│   │   └── layout/      # Navbar, Footer, Sidebar, Layout wrappers
│   ├── context/         # React Context state management
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Application views/pages (Home, Courses, etc.)
│   ├── services/        # API and data service calls
│   ├── utils/           # Helper functions and constants
│   ├── App.jsx          # Root application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Tailwind CSS styles
├── index.html           # Main HTML document
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration & path aliases (@/)
└── package.json         # Project dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

```bash
npm install
```

### Running Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

The optimized production output will be generated in the `dist/` folder.
