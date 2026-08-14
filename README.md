# Salman Ahmad — Web Developer Platform

React + Vite + Tailwind CSS + Framer Motion + Lucide React.

## Run locally (VS Code)

1. Unzip this folder and open it in VS Code.
2. Open a terminal in VS Code (`` Ctrl+` ``) and install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open the URL shown in the terminal (usually **http://localhost:5173**).

## Build for production

```bash
npm run build
```

This creates a `dist/` folder ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.). To preview the production build locally:

```bash
npm run preview
```

## Project structure

```
├── index.html          # HTML entry point, SEO/meta tags
├── src/
│   ├── main.jsx         # React root
│   ├── App.jsx           # The entire site (all sections/components)
│   └── index.css        # Tailwind directives
├── public/
│   └── favicon.svg
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Editing content

Everything content-related lives at the top of `src/App.jsx` as plain arrays/constants:

- `SERVICES`, `PROCESS_STEPS`, `WHY_POINTS`, `TECHNOLOGIES`, `FAQS`, `SKILLS`
- `PORTFOLIO_PROJECTS` — replace the placeholder entries with real projects as they're finished
- `WHATSAPP_NUMBER`, `EMAIL_ADDRESS`, `LINKEDIN_URL`, `GITHUB_URL` — your contact details

The "Start Your Project" form and the contact form don't require a backend — they open WhatsApp / a pre-filled email respectively. If you later want submissions to go into a database or CRM, that's a separate backend integration you can add.
