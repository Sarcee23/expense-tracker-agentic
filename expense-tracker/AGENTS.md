# Project Guidelines

## Stack

- React 19 with JavaScript (ES modules).
- Vite 8 with the React plugin for development and production builds.
- Oxlint for linting.

## Folder Layout

- `src/` contains the application source: `App.jsx` is the app entry component, with shared styles in `App.css` and `index.css`; `main.jsx` mounts the app.
- `src/assets/` contains imported images and other bundled assets.
- `public/` contains static files served as-is.
- `index.html` is the Vite HTML entry point, and `vite.config.js` configures Vite.

## Install, Run, and Validate

- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- Create a production build: `npm run build`
- Lint the project: `npm run lint`
- There is currently no test script configured in `package.json`.

## Conventions

- Keep each React component in its own file.
- Keep application state in `App.jsx`; pass data and callbacks to child components through props.
- Follow the existing JavaScript and JSX style in `src/`.

## Contribution Rules

- Do not add dependencies without asking first.
- Work on a branch; do not make project changes directly on the default branch.
- Summarize the changes in the pull request description.
