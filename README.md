# Golden Flop — On-Chain Poker on Solana

Real-time multiplayer poker on Solana. 6-player tables, provably fair, on-chain settlement.

<video src="https://github.com/user-attachments/assets/4269e4d5-3432-47d4-8c5d-c6152b5c5ad3" autoplay loop muted playsinline></video>

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + custom CSS design tokens
- **Animations:** GSAP + @gsap/react (entry sequences, idle floats, parallax tilt)
- **Fonts:** Press Start 2P (pixel headings), Inter (body), Geist (system)
- **Icons:** Lucide React, React Icons
- **UI:** shadcn components, class-variance-authority, tailwind-merge

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Design tokens, LED board effect, neon cards, glows
│   ├── icon.png           # Favicon (golden spade)
│   ├── layout.tsx          # Root layout with Geist font
│   └── page.tsx            # Home page — assembles all sections
├── components/
│   ├── Header.tsx          # Fixed navbar with logo, socials, live badge, nav bg image
│   ├── Hero.tsx            # Full-screen hero — LED board title, phone showcase, parallax
│   ├── HowItWorks.tsx      # Step-by-step gameplay explanation
│   ├── LiveTables.tsx      # Live table status display
│   ├── TrustStrip.tsx      # Trust/partner logos strip
│   ├── WhyGoldenFlop.tsx   # Feature highlights
│   ├── Footer.tsx          # Copyright, legal links, social icons
│   ├── Starfield.tsx       # Background star particle effect
│   └── ui/
│       └── button.tsx      # shadcn button component
├── lib/
│   └── utils.ts            # cn() utility (clsx + tailwind-merge)
public/
├── assets/                 # Poker props (cards, chips), backgrounds
├── screenshots/            # App screenshots for phone showcase
├── logo.png                # Golden spade logo
└── icon.png                # App icon
```

## Design System

- **Background:** Dark space theme (`#05070F`) with full-screen background image
- **Accent colors:** Cyan (`#00F0FF`), Gold (`#FFC857` / `#F5C542`), Pink (`#FF4D9D`)
- **Effects:** LED dot-matrix title, neon card borders, glow shadows, noise overlay
- **Typography:** Pixel font for headings/labels, Inter for body text

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Deployment

Deploy on [Vercel](https://vercel.com) — zero config for Next.js projects.
