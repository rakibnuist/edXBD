# Deployment Guide for edXBD

## Vercel Environment Variables Configuration

To fix the 404 NOT_FOUND error, you need to configure these environment variables in your Vercel dashboard:

### Required Environment Variables:

1. **MONGODB_URI**
   ```
   mongodb+srv://eduexpressoffice_db_user:TJIFW1Q49HfzHLe8@main.pqygrwc.mongodb.net/?retryWrites=true&w=majority&appName=Main
   ```

2. **JWT_SECRET**
   ```
   your-super-secure-jwt-secret-key-change-this-in-production-12345
   ```

3. **NEXT_PUBLIC_SITE_URL**
   ```
   https://your-app-name.vercel.app
   ```

4. **NODE_ENV**
   ```
   production
   ```

5. **NEXT_PUBLIC_SITE_NAME**
   ```
   EduExpress International
   ```

6. **NEXT_PUBLIC_CONTACT_EMAIL**
   ```
   info@eduexpressint.com
   ```

7. **NEXT_PUBLIC_CONTACT_PHONE**
   ```
   +880-1983-333566
   ```

### How to Configure in Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `edXBD` project
3. Go to **Settings** → **Environment Variables**
4. Add each variable above with the exact values
5. Make sure to set them for **Production** environment
6. Click **Save**
7. Go to **Deployments** tab and click **Redeploy** on the latest deployment

### Optional Environment Variables:

- `NEXT_PUBLIC_GTM_ID=GTM-NJSCVL2T`
- `NEXT_PUBLIC_META_PIXEL_ID=1234567890`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-GGJ3CS0ZT0`
- `ADMIN_EMAIL=admin@eduexpressint.com`
- `ADMIN_PASSWORD=admin123`
- `ADMIN_NAME=Admin User`

### After Configuration:

1. Your deployment should automatically redeploy
2. The 404 error should be resolved
3. Your MongoDB connection will work properly
4. All API endpoints should function correctly

### Testing:

Once deployed, test these endpoints:
- `/` - Home page
- `/api/test` - API test endpoint
- `/admin` - Admin dashboard (after login)
- `/api/init-db` - Database initialization

## Local Development:

For local development, update your `.env.local` file with the MongoDB URI:
```
MONGODB_URI=mongodb+srv://eduexpressoffice_db_user:TJIFW1Q49HfzHLe8@main.pqygrwc.mongodb.net/?retryWrites=true&w=majority&appName=Main
```
