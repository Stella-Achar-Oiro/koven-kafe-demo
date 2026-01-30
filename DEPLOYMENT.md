# Deployment Guide - Koven Kafe POS Demo

## Quick Deploy to Vercel (Recommended - FREE)

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd koven-kafe-demo
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Scope: Your account
# - Link to existing project? No
# - Project name: koven-kafe-demo
# - Directory: ./
# - Override settings? No

# Your demo will be live at: https://koven-kafe-demo.vercel.app
```

### Method 2: Vercel GitHub Integration
1. Push code to GitHub
2. Go to vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"
6. Done! Auto-deploys on every push

## Deploy to Netlify (Also FREE)

### Method 1: Drag and Drop
```bash
# Build the project
npm run build

# Go to app.netlify.com
# Drag and drop the 'dist' folder
# Done!
```

### Method 2: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

## Deploy to GitHub Pages

1. Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/koven-kafe-demo/', // Your repo name
})
```

2. Build and deploy:
```bash
npm run build
npx gh-pages -d dist
```

3. Enable GitHub Pages in repo settings
4. Your site: https://yourusername.github.io/koven-kafe-demo/

## Environment Variables (For Production)

Create `.env.production`:
```
VITE_API_URL=https://your-api.com
VITE_APP_NAME=Koven Kafe POS
```

## Testing Deployment

After deployment, test:
- ✅ Landing page loads
- ✅ Dashboard shows data
- ✅ POS can complete orders
- ✅ Receipt modal works
- ✅ Mobile responsive
- ✅ Navigation works

## Custom Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your domain (e.g., pos.kovenkafe.com)
3. Follow DNS instructions

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

## Monitoring

- **Vercel**: Built-in analytics at dashboard
- **Netlify**: Analytics available in dashboard
- **Google Analytics**: Add tracking ID to index.html

## Troubleshooting

**Build fails?**
- Check Node version (need 18+)
- Clear node_modules and reinstall
- Check for syntax errors

**Routing doesn't work?**
- Ensure SPA redirect is configured
- Vercel/Netlify auto-handle this
- For other hosts, add `_redirects` or `.htaccess`

**LocalStorage not persisting?**
- Check browser privacy settings
- Ensure cookies/storage enabled
- In production, use real database

## Next Steps After Demo

1. **Get Feedback** from Dr. Amakove
2. **Iterate** based on feedback
3. **Add Backend** (PostgreSQL + Node.js)
4. **Real Authentication**
5. **Production Deploy** with custom domain

---

Need help? Contact Achar at achar@evarest.tech
