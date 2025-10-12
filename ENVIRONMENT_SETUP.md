# Environment Variables Setup Guide

This document outlines the environment variables needed for the edXBD application.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Database Configuration
```bash
MONGODB_URI=mongodb://localhost:27017/edxbd
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/edxbd
```

### Next.js Configuration
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here
```

### Authentication
```bash
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-admin-password
```

### Meta/Facebook Configuration
```bash
META_ACCESS_TOKEN=your-meta-access-token
META_PIXEL_ID=your-meta-pixel-id
META_APP_ID=your-meta-app-id
META_APP_SECRET=your-meta-app-secret
```

### Optional Configuration

#### Email Services
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Analytics
```bash
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
VERCEL_ANALYTICS_ID=your-vercel-analytics-id
```

## Setup Instructions

1. Copy the variables above into a new `.env.local` file
2. Replace placeholder values with your actual credentials
3. Never commit `.env.local` to version control
4. Use this document to share environment structure with team members

## Security Notes

- Keep your `.env.local` file secure and never share actual credentials
- Use this template to communicate required environment variables
- Consider using environment variable management tools for production
