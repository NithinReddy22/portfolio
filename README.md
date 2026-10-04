# 🕹️ Ready Player One // OASIS Cyberpunk Pixel Portfolio

A high-performance, retro 8-bit/16-bit arcade-themed personal website for **Puluputturi Nithin Reddy**.

Built with:
- **Vanilla HTML5, CSS3, & Modern JavaScript** (Zero bloated frameworks, instantaneous load time)
- **Retro Web Audio API Synthesizer** (Custom 8-bit sound effects synthesized dynamically without external audio assets)
- **Ready Player One / OASIS Cyberpunk Design Language**
  - Fonts: `'Press Start 2P'`, `'Silkscreen'`, `'VT323'`
  - CRT Scanlines & Screen Vignette Overlay (with real-time toggle)
  - Interactive OASIS CLI Terminal Emulator (executable commands: `help`, `about`, `skills`, `papers`, `gre`, `contact`, `easteregg`)
  - RPG Character Stat Gauges (GRE 170/170 Quant, 99.9% Systems Reliability, 50-80% Edge Compute Savings)
  - Mission Log / Quest Journal filtering (AI & Vision vs. Systems)
  - Arsenal / Inventory Tech Stack Grid
  - Dungeon EXP Timeline (Psiog Digital & Amrita Vishwa Vidyapeetham)

---

## 🚀 Live Local Preview
To preview locally:
```bash
# Using Python
python -m http.server 8080 --directory .

# Open in browser:
http://localhost:8080/
```

---

## 🌐 Deployment Instructions

### Method 1: Deploy to GitHub Pages (Recommended — 100% Free & Permanent)

1. Go to [GitHub.com/new](https://github.com/new) and create a new repository:
   - **Repository Name**: `NithinReddy22.github.io` *(for root domain https://nithinreddy22.github.io)*  
     *(or name it `portfolio` for https://nithinreddy22.github.io/portfolio)*
   - Make it **Public**.
   - Do **NOT** initialize with README or .gitignore (the local folder is already initialized!).

2. Open your terminal in this `portfolio` folder and run:
   ```bash
   git remote add origin https://github.com/NithinReddy22/NithinReddy22.github.io.git
   git push -u origin main
   ```
   *(If your repo is named `portfolio`, use `https://github.com/NithinReddy22/portfolio.git`)*

3. If using `portfolio`:
   - Go to your repository on GitHub &rarr; **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**: Select `Deploy from a branch`.
   - Branch: `main` &rarr; Folder: `/ (root)` &rarr; **Save**.
   - Your site will be live within 60 seconds!

---

### Method 2: Deploy to Vercel (Instant 30-Second Deploy)

Run directly in this folder:
```bash
npx vercel
```
Follow the 3 quick prompts (login with GitHub or email), and Vercel will give you a live HTTPS domain immediately (e.g. `nithin-reddy-oasis.vercel.app`)!
