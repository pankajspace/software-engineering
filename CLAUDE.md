# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal software engineering learning repository. It contains practical code examples, reference notes, and implementations covering full-stack web development, DSA, algorithms, and CS fundamentals. It is not a single deployable application — it is a collection of independent projects and study material.

## Project Structure

Code examples live in root-level `*-code/` folders. Each project directory has its own `package.json`. Documentation and notes live in topic-named directories at the root (e.g., `react/`, `javascript/`, `node/`, `database/`, `dsa/`).

**Independent projects:**
- `react-code/` — React hooks and patterns demos (Vite/Babel)
- `react-redux-toolkit-code/` — Redux Toolkit with React (Vite/Babel)
- `mern-code-1/` — Node.js features (event loop, workers, cluster)
- `mern-code-2/` — Full-stack MERN app (client: React/Vite, server: Express/MongoDB)
- `javascript-code/js-dsa/` — JavaScript DSA implementations
- `javascript-code/js-asynchronous/` — Async/await and promise patterns
- `javascript-code/js-bindings/` — JavaScript `this` and binding examples
- `javascript-code/js-snippets/` — Miscellaneous JS patterns
- `ui-code/` — HTML/CSS demo

## Development Commands

There is no root-level `package.json`. All commands must be run from within the specific project directory.

**React/Vite projects** (`react-code/`, `react-redux-toolkit-code/`, `mern-code-2/client/`):
```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

**Node.js projects** (`mern-code-1`, `javascript-code/js-dsa`, `javascript/`):
```bash
npm start        # Runs: node --watch index.js (or playground.js)
```

**MERN server** (`mern-code-2/server`):
```bash
npm start        # Runs: node --watch src/index.js
```
Requires a `.env` file with `PORT`, `dbuser`, `dbpass` for MongoDB Atlas connection.

## Architecture Notes

### MERN Stack (`mern-code-2`)
- Server is Express with Mongoose. Routes → Controllers → Models pattern. Entry point: `src/index.js`.
- Client uses Axios for API calls. State is local `useState` — no Redux here.
- MongoDB connection string is built from `.env` variables.

### React Examples (`react-code/`)
- Organized by React hook: each hook has its own component file under `src/`.
- Advanced patterns (portals, error boundaries, lazy loading, render props, custom hooks) are each in separate files.
- Uses `@vitejs/plugin-react` (Babel transform).

### React Redux Toolkit (`react-redux-toolkit-code/`)
- Uses `@vitejs/plugin-react` (Babel). Demonstrates RTK slice/store patterns.

### MERN Client vs React
- `mern-code-2/client` uses `@vitejs/plugin-react-swc` (SWC compiler, faster).
- `react-code/` uses `@vitejs/plugin-react` (Babel).

## Coding Conventions

- All React projects use **functional components with hooks** — no class components.
- JavaScript only (no TypeScript in code projects), ES6+ modules throughout.
- Node.js projects use `node --watch` for hot-reload during development (no nodemon).
- No test runner is configured in any project.
