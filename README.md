# Pokémon Explorer

A responsive Pokémon Explorer web app built with React and Tailwind CSS using the public PokéAPI.
The app allows users to browse Pokémon, view detailed stats, search by name, and explore data in a clean, modern UI.

---

FEATURES

- Pokémon list with pagination (based on design)
- Pokémon detail modal (image, types, height, weight, stats)
- Search Pokémon by name
- Filter by generation and type
- Responsive design (mobile-first)
- Loading & error states
- Custom 404 page for undefined routes
- API data caching for better performance

---

TECH STACK

- React 19
- TypeScript
- Tailwind CSS v4
- React Query (TanStack Query) – data fetching & caching
- PokéAPI – public Pokémon data source
- Vite – build tool

---

GETTING STARTED

Prerequisites:
- Node.js >= 18

Installation:
npm install

Run locally:
npm run dev

Build for production:
npm run build

---

LIVE DEMO

Live Demo:
https://nija-test-fe.vercel.app/wiki

Repository:
https://github.com/wisnu345/nija-test-fe

---

TECHNICAL DECISIONS

Data Fetching Strategy:
The Pokémon list API does not provide enough data to render the card UI (types and images).
Therefore:
- The list endpoint is used for pagination
- Pokémon detail data is fetched per item when needed
- Cached results prevent repeated requests

Detail Modal Fetching:
Pokémon details are fetched on demand to:
- Reduce initial payload size
- Improve initial page load performance
- Keep the list lightweight

Caching (Bonus):
- API responses are cached using React Query
- Previously fetched Pokémon details are reused
- Improves performance and reduces API calls

Error Handling:
- Search errors (404) show clear user feedback
- Loading indicators during API calls
- Custom 404 page for undefined routes

---

NOTES

- Focused on pixel-perfect UI and responsive layout
- Clean, scalable architecture
- Built following modern React best practices

---

LICENSE

This project is for technical assessment purposes only.
