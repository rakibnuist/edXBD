# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/edxbd

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production

# Analytics & Tracking
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890
META_ACCESS_TOKEN=
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# SEO Verification
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
NEXT_PUBLIC_YANDEX_VERIFICATION=your_yandex_verification_code
NEXT_PUBLIC_YAHOO_VERIFICATION=your_yahoo_verification_code

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.eduexpressint.com
NEXT_PUBLIC_SITE_NAME=EduExpress International

# Contact Information
NEXT_PUBLIC_CONTACT_PHONE=+880-1983-333566
NEXT_PUBLIC_CONTACT_EMAIL=info@eduexpressint.com

# Development/Production
NODE_ENV=development
```

## Important Notes

1. **Never commit `.env.local` to version control**
2. **Change JWT_SECRET to a secure random string in production**
3. **Update MongoDB URI for production database**
4. **Replace placeholder tracking IDs with real ones**
5. **Update verification codes with actual values from respective services**

## SEO Verification Setup

To get your verification codes:

### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (website)
3. Choose "HTML tag" verification method
4. Copy the content value from the meta tag
5. Set `NEXT_PUBLIC_GOOGLE_VERIFICATION` to this value

### Yandex Webmaster
1. Go to [Yandex Webmaster](https://webmaster.yandex.com)
2. Add your site
3. Choose "HTML tag" verification method
4. Copy the content value from the meta tag
5. Set `NEXT_PUBLIC_YANDEX_VERIFICATION` to this value

### Yahoo Site Explorer
1. Go to [Yahoo Site Explorer](https://siteexplorer.search.yahoo.com)
2. Add your site
3. Follow the verification process
4. Set `NEXT_PUBLIC_YAHOO_VERIFICATION` to your verification code

## Security Considerations

- **CRITICAL**: Use a strong, random JWT secret (at least 32 characters)
- **CRITICAL**: Use environment-specific MongoDB URIs
- **CRITICAL**: Never use default/placeholder values in production
- Keep sensitive tokens secure and never expose them in client-side code
- The application will now fail to start if JWT_SECRET or MONGODB_URI are not properly configured

## Breaking Changes Made

- Removed hardcoded default values for JWT_SECRET and MONGODB_URI
- Application will throw errors if these critical environment variables are missing
- This ensures no accidental use of insecure defaults in production
