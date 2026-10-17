Deployment instructions

Netlify
- Connect your Git repository and set the build command to `npm run build`.
- Set the publish directory to `dist`.
- `_redirects` is included to route SPA paths to `index.html`.

Vercel
- Import the project; Vercel will detect the Vite build.
- Set the build command to `npm run build` and the output directory to `dist`.
- `vercel.json` rewrites routes to `index.html` for SPA behavior.

Notes
- The app is built with React, Vite, and Tailwind CSS.
- Run `npm run dev` for local development and `npm run build` to create the production site in `dist`.
- The résumé and project imagery are served from the repository root.
