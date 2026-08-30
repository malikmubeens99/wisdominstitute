# Wisdom Institute — Online Quran Platform

Production-ready static website for **Wisdom Institute** (a Wisdom Hope Foundation initiative), designed for deployment on **GitHub + Vercel**.

## Architecture & Tech Stack
- **Framework:** Static Semantic HTML5, Modular CSS3, Vanilla JavaScript (ES6+).
- **Dependencies:** 0 dependencies. Zero heavy bundle size.
- **Hosting:** Direct push-to-deploy on Vercel or GitHub Pages.
- **Search & GEO Optimization:** Integrated JSON-LD (`EducationalOrganization`, `WebSite`), semantic H-hierarchy, metadata for Google, Bing, and AI search engines (ChatGPT, Perplexity, Gemini).

## Deployment Instructions

### Deploy to Vercel
1. Push this repository to GitHub.
2. Link your GitHub repository in your [Vercel Dashboard](https://vercel.com).
3. Set Framework Preset to **Other** (Root directory: `./`).
4. Click **Deploy**.

### Local Preview
Open `index.html` directly in any modern browser or run a local server:
```bash
npx serve .
