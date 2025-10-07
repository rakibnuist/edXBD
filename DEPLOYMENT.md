# Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Vercel account
- MongoDB Atlas database
- Environment variables configured

### Manual Deployment to Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Connect your GitHub account

2. **Configure Environment Variables**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   META_ACCESS_TOKEN=your_meta_access_token
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   ```

3. **Deploy**
   - Click "Deploy" in Vercel dashboard
   - Wait for deployment to complete
   - Your site will be available at the provided URL

### Custom Domain Setup

1. **Add Custom Domain**
   - Go to Project Settings > Domains
   - Add your domain: `eduexpressint.com`
   - Configure DNS records as instructed

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - HTTPS will be enabled automatically

### Post-Deployment Checklist

- [ ] Verify website loads correctly
- [ ] Test mobile responsiveness
- [ ] Check form submissions
- [ ] Verify analytics tracking
- [ ] Test WhatsApp integration
- [ ] Check SEO meta tags
- [ ] Verify admin dashboard access

### Monitoring

- **Vercel Analytics** - Built-in performance monitoring
- **Google Analytics** - User behavior tracking
- **Uptime Monitoring** - Set up external monitoring service

---

**Live Website:** [https://eduexpressint.com/](https://eduexpressint.com/)
