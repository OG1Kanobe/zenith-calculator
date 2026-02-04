# Zenith AI Profit Calculator

A Next.js calculator that shows potential savings from AI automation.

## Features (Session 1 - Complete ✅)

- ✅ Full project setup with Next.js 14 (App Router)
- ✅ Brand styling (#010112 bg, #5ccfa2 accent, Space Mono + Inter Tight)
- ✅ All 11 tasks with pricing from spreadsheet
- ✅ Calculator logic with all formulas (manual cost, savings, ROI, etc.)
- ✅ Industry multipliers (Legal 2.0x, Healthcare 1.8x, etc.)
- ✅ **Styled input form components:**
  - TaskSelector (categorized, checkboxes, volume inputs)
  - LiveCounter (animated, shows leakage in real-time)
  - IndustrySelector (dropdown with multipliers)
  - CalculateButton (disabled state when no tasks selected)

## Todo (Future Sessions)

- ⏳ Results page with:
  - Summary cards (total savings, hours saved)
  - Red vs green comparison chart
  - Breakeven timeline
  - Collapsible task breakdowns
- ⏳ Mobile responsive refinements
- ⏳ Polish animations (Framer Motion)
- ⏳ Form validation & edge cases

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

#### Option A: Direct from StackBlitz
1. Click "Deploy" in StackBlitz
2. Select Vercel
3. Done!

#### Option B: Via GitHub
1. Push code to GitHub repo
2. Connect repo to Vercel
3. Vercel auto-deploys on push

## File Structure

```
src/
├── app/
│   ├── page.tsx           # Main calculator page
│   ├── layout.tsx         # Root layout with fonts
│   └── globals.css        # Global styles
├── components/
│   └── Calculator/
│       ├── TaskSelector.tsx
│       ├── LiveCounter.tsx
│       ├── IndustrySelector.tsx
│       └── CalculateButton.tsx
├── lib/
│   ├── taskData.ts        # 11 tasks with pricing
│   ├── industryData.ts    # Industry multipliers
│   └── calculatorLogic.ts # All math formulas
└── types/
    └── calculator.types.ts # TypeScript interfaces
```

## What You Can See Today

1. **Styled calculator input form** with your brand
2. **Live counter** that animates as you select tasks
3. **All 11 tasks** organized by category (Sales, Marketing, Support, Ops, HR)
4. **Industry selector** with 7 industries + multipliers
5. **Volume inputs** with suggested defaults

Click "Calculate My Savings" to see the placeholder (results page coming in Session 2)

## Brand Colors

- Background: `#010112`
- Accent: `#5ccfa2`
- Text: `#f5f5f5`
- Muted: `#a0a0a0`
- Error/Warning: `#ff6b6b`

## Fonts

- Headers/Titles: Space Mono (monospace)
- Body/UI: Inter Tight (sans-serif)
