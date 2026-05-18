Deployment instructions

Netlify
- Drag & drop the project folder to Netlify Sites, or connect your Git repository.
- Ensure the publish directory is the repository root (default) and no build command is required.
- `_redirects` is included to route SPA paths to `index.html`.

Vercel
- Import the project and deploy; Vercel will detect a static site.
- `vercel.json` rewrites routes to `index.html` for SPA behavior.

Notes
- The main entrypoint is `index.html`.
- Asset paths were normalized to forward slashes for cross-platform hosting.
- `script.js` was hardened for the resume download flow.
