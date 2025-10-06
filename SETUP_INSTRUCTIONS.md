# Dashboard Setup Instructions

## Issues Found and Solutions

### 1. Missing Environment Variables
The dashboard is failing because there's no `.env.local` file with the required environment variables.

**Solution**: Create a `.env.local` file in the root directory with the following content:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/edxbd

# JWT Secret (for authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-change-this-in-production

# Application Configuration
NODE_ENV=development

# Analytics (Optional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890
META_ACCESS_TOKEN=
```

### 2. Database Connection Issues
The dashboard API endpoints are failing because they can't connect to MongoDB.

**Solution**: 
1. Make sure MongoDB is running locally on port 27017
2. Or update the MONGODB_URI to point to your MongoDB instance (local or cloud)

### 3. Database Initialization
If the database is empty, you can initialize it with sample data.

**Solution**: 
1. Start the development server: `npm run dev`
2. Navigate to the admin dashboard: `http://localhost:3000/admin`
3. Click the "Initialize DB" button if the database status shows "disconnected"

## Quick Fix Steps

1. **Create the environment file**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your MongoDB connection string
   ```

2. **Start MongoDB** (if running locally):
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the dashboard**:
   - Main site: `http://localhost:3000`
   - Admin dashboard: `http://localhost:3000/admin`

## Alternative: Use MongoDB Atlas (Cloud)

If you prefer to use MongoDB Atlas (cloud database):

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env.local` file

Example Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edxbd?retryWrites=true&w=majority
```

## Troubleshooting

### Dashboard shows "Database: disconnected"
- Check if MongoDB is running
- Verify the MONGODB_URI in your `.env.local` file
- Check the browser console for error messages

### API endpoints returning 500 errors
- Check the server console for detailed error messages
- Verify database connection
- Ensure all required environment variables are set

### Dashboard shows "Loading dashboard..." indefinitely
- Check network tab in browser dev tools
- Verify API endpoints are responding
- Check server console for errors
