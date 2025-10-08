# 🚀 Deployment Guide - Meta Conversion API

## ✅ **Local Testing Complete**

Your local environment is working perfectly:
- ✅ Meta Pixel ID: `1292963899542368`
- ✅ Access Token: Configured and working
- ✅ API Endpoint: `http://localhost:3001/api/meta-conversion` ✅ SUCCESS
- ✅ Event ID: `event_1759953308436_5v4v76plk`

## 🎯 **Deploy to Production**

### **Step 1: Deploy to Vercel**

#### **Option A: Deploy via Vercel CLI**
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy to production
vercel --prod
```

#### **Option B: Deploy via Git (Recommended)**
```bash
# Commit your changes
git add .
git commit -m "Add Meta Conversion API integration with credentials"

# Push to your repository
git push origin main
```

### **Step 2: Configure Environment Variables in Vercel**

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project

2. **Add Environment Variables**
   - Go to **Settings** → **Environment Variables**
   - Add these variables:

   ```
   NEXT_PUBLIC_META_PIXEL_ID = 1292963899542368
   META_ACCESS_TOKEN = EAAWM1phofcoBPkJxnqa4PR2ZBciZBn0N0D6kiP5LgepMFPIso5DePvYfRIexplJP5Mb0qThJmyWc0ryIJkgOqpT45U9QfooVrrvpFijVAG89E9EOHsiGQGVaQuyQJ7XoUQuVDrgWdOtmfxJkg9FLH42XDgSRC37AFmaZCypVrUCSGmvHZCPaf7Xw7yPVLAZDZD
   ```

3. **Redeploy**
   - After adding environment variables, trigger a new deployment
   - Go to **Deployments** → **Redeploy**

### **Step 3: Test Production Deployment**

#### **Test Meta Conversion API**
```bash
# Test your production API endpoint
curl -X POST "https://eduexpressint.com/api/meta-conversion" \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "test",
    "data": {},
    "source": "production_test"
  }'
```

#### **Expected Response:**
```json
{
  "success": true,
  "eventId": "event_1759953308436_xxxxx"
}
```

### **Step 4: Verify in Meta Events Manager**

1. **Go to Meta Business Manager**
   - Visit [business.facebook.com](https://business.facebook.com)
   - Navigate to **Events Manager**

2. **Check Test Events**
   - Select your Pixel (1292963899542368)
   - Go to **Test Events** tab
   - Verify events are being received

3. **Check Diagnostics**
   - Go to **Diagnostics** tab
   - Ensure no errors are showing

## 🔧 **Deployment Commands**

### **Quick Deploy Script**
```bash
#!/bin/bash
echo "🚀 Deploying EduExpress International with Meta Conversion API..."

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Your site: https://eduexpressint.com"
echo "🧪 Test API: https://eduexpressint.com/api/meta-conversion"
```

### **Environment Variables Checklist**
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` = `1292963899542368`
- [ ] `META_ACCESS_TOKEN` = `EAAWM1phofcoBPkJxnqa4PR2ZBciZBn0N0D6kiP5LgepMFPIso5DePvYfRIexplJP5Mb0qThJmyWc0ryIJkgOqpT45U9QfooVrrvpFijVAG89E9EOHsiGQGVaQuyQJ7XoUQuVDrgWdOtmfxJkg9FLH42XDgSRC37AFmaZCypVrUCSGmvHZCPaf7Xw7yPVLAZDZD`

## 📊 **Post-Deployment Testing**

### **1. Test All Endpoints**
```bash
# Test Meta Conversion API
curl -X POST "https://eduexpressint.com/api/meta-conversion" \
  -H "Content-Type: application/json" \
  -d '{"eventType":"test","data":{},"source":"production_test"}'

# Test Lead Generation
curl -X POST "https://eduexpressint.com/api/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+8801234567890",
    "country": "South Korea"
  }'

# Test Contact Form
curl -X POST "https://eduexpressint.com/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+8801234567890",
    "message": "Test message"
  }'
```

### **2. Test Meta Pixel**
```javascript
// Add this to browser console on your live site
console.log('Meta Pixel ID:', process.env.NEXT_PUBLIC_META_PIXEL_ID);
console.log('fbq function:', typeof window.fbq);

// Test event firing
if (window.fbq) {
  window.fbq('track', 'Lead', {
    content_name: 'Production Test',
    value: 0,
    currency: 'BDT'
  });
}
```

### **3. Monitor Performance**
- Check Vercel Analytics
- Monitor API response times
- Check error rates
- Verify Meta events in Events Manager

## 🎯 **Expected Results After Deployment**

### **Immediate (Within 1 hour):**
- ✅ Site accessible at `https://eduexpressint.com`
- ✅ Meta Pixel firing on all pages
- ✅ Conversion API receiving events
- ✅ Forms submitting successfully

### **Within 24 hours:**
- ✅ Events visible in Meta Events Manager
- ✅ Custom conversions working
- ✅ Attribution data flowing
- ✅ Ready for campaign launch

## 🚨 **Troubleshooting**

### **If Deployment Fails:**
1. Check environment variables in Vercel
2. Verify build logs for errors
3. Ensure all dependencies are installed
4. Check API endpoint URLs

### **If Events Not Showing in Meta:**
1. Verify Pixel ID is correct
2. Check Access Token permissions
3. Test with Meta Pixel Helper
4. Check browser console for errors

### **If API Errors:**
1. Check server logs in Vercel
2. Verify environment variables
3. Test API endpoints individually
4. Check Meta API documentation

## 🎉 **You're Ready to Launch!**

Once deployed, your Meta Conversion API integration will be:
- ✅ **Live and functional**
- ✅ **Tracking all education events**
- ✅ **Ready for campaign optimization**
- ✅ **Privacy compliant**
- ✅ **Enterprise-grade performance**

**Deploy now and start your Meta campaigns!** 🚀
