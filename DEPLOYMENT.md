# Deployment Guide

## Option 1: StackBlitz → Vercel (Easiest)

1. **Open in StackBlitz:**
   - Upload this entire `zenith-calculator` folder to StackBlitz
   - StackBlitz will auto-detect it's a Next.js project
   - Wait for dependencies to install

2. **Preview locally in StackBlitz:**
   - The dev server should start automatically
   - You'll see the calculator in the preview pane

3. **Deploy to Vercel:**
   - Click the "Deploy" button in StackBlitz
   - Select "Vercel" as the platform
   - Sign in to Vercel (or create account)
   - Click "Deploy"
   - Done! You'll get a live URL like `zenith-calculator.vercel.app`

---

## Option 2: GitHub → Vercel (Recommended for Long-term)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Zenith calculator v1"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repo
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Future Updates:**
   - Just push to GitHub
   - Vercel auto-deploys on every push to main

---

## What Works Today (Session 1)

✅ **Fully styled calculator input form**
- Select tasks by category
- Input custom volumes
- Choose industry with multipliers
- Live counter shows leakage as you select tasks
- Animated counter (casino effect)
- Calculate button (goes to placeholder for now)

❌ **Results page** (coming in Session 2)

---

## Custom Domain (Optional)

Once deployed to Vercel:
1. Go to project settings
2. Add your custom domain (e.g., calculator.zenith.ai)
3. Update DNS records as instructed
4. SSL auto-configured by Vercel

---

## Environment Variables

No environment variables needed for Session 1.

In future sessions, if you add email/form submission, you'll need:
- `NEXT_PUBLIC_API_URL`
- Email service API keys (if applicable)

---

## Troubleshooting

**Issue:** Fonts not loading
- **Fix:** Fonts are loaded via Google Fonts in layout.tsx - they'll work once deployed

**Issue:** Styles not applying
- **Fix:** Make sure `globals.css` is imported in layout.tsx

**Issue:** Build fails
- **Fix:** Run `npm run build` locally to catch errors before deploying

---

## Performance

- **Lighthouse Score Target:** 90+ (should hit 95+ with current build)
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <2.5s

Session 1 code is lightweight (no heavy libraries), so performance should be excellent.
