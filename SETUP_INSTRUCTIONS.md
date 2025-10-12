# EduExpress International - Setup Instructions

## Quick Fix for Content Not Fetching

The content management system isn't fetching data because of missing environment configuration. Follow these steps to fix it:

### 1. Create Environment File

Create a `.env.local` file in the root directory with the following content:

```bash
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/eduexpress

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

### 2. Install and Start MongoDB

If you don't have MongoDB installed:

**On macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**On Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**On Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### 3. Initialize the Database

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit the setup page: `http://localhost:3000/setup`

3. Click "Initialize Database" to create sample content

4. Create an admin account

### 4. Access Admin Panel

1. Go to: `http://localhost:3000/login`
2. Login with your admin credentials
3. Navigate to: `http://localhost:3000/admin/content`

## Alternative: Use MongoDB Atlas (Cloud)

If you prefer using a cloud database:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `.env.local` with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eduexpress
   ```

## Troubleshooting

### Content Still Not Loading?

1. **Check Console Logs**: Open browser developer tools and check for errors
2. **Verify Database Connection**: Check if MongoDB is running
3. **Check Authentication**: Ensure you're logged in as admin
4. **API Endpoints**: Test `/api/admin/content` directly

### Common Issues:

- **403 Forbidden**: Not logged in or not admin user
- **500 Server Error**: Database connection issues
- **Network Error**: Check if development server is running

### Manual Database Initialization

If the setup page doesn't work, you can manually initialize:

```bash
curl -X POST http://localhost:3000/api/init-db
```

## Sample Content Created

The initialization creates:
- 3 sample content items (Welcome page, UK guide, Success story)
- 2 sample countries (UK, China)
- 2 sample testimonials
- Database indexes for better performance

## Next Steps

After setup:
1. Login to admin panel
2. Create/edit content as needed
3. Customize the sample content
4. Add more countries and testimonials
5. Configure your production environment variables

## Production Deployment

For production:
1. Use a secure JWT secret
2. Use MongoDB Atlas or a secure MongoDB instance
3. Set proper environment variables in your hosting platform
4. Enable HTTPS
5. Configure proper CORS settings
