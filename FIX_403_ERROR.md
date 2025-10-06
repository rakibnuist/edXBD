# Fix 403 Forbidden Error - Admin Dashboard

## Problem
You're getting a 403 Forbidden error when trying to access the admin dashboard. This happens because:

1. **No admin user exists** in the database
2. **Authentication token is missing or invalid**
3. **User doesn't have admin role**

## Solutions

### Option 1: Use the Setup Page (Recommended)
1. Navigate to `http://localhost:3000/setup`
2. Create an admin account with your details
3. Login with the new admin credentials at `http://localhost:3000/login`

### Option 2: Use the Seed Script
1. Make sure you have a `.env.local` file with your MongoDB connection:
   ```env
   MONGODB_URI=mongodb://localhost:27017/edxbd
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

2. Run the seed script:
   ```bash
   npm run seed:admin
   ```

3. Default admin credentials:
   - Email: `admin@edxbd.com`
   - Password: `admin123`

### Option 3: Manual Database Setup
If you have MongoDB access, you can manually create an admin user:

```javascript
// Connect to your MongoDB database
use edxbd

// Create admin user (password is hashed for 'admin123')
db.users.insertOne({
  name: "Admin User",
  email: "admin@edxbd.com",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K5K5K5K", // admin123
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Verification
After creating the admin user:

1. Go to `http://localhost:3000/login`
2. Login with your admin credentials
3. You should be redirected to the admin dashboard
4. The 403 error should be resolved

## Environment Variables
Make sure your `.env.local` file contains:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/edxbd

# JWT Secret (for authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Optional: Custom admin credentials for seed script
ADMIN_EMAIL=admin@edxbd.com
ADMIN_PASSWORD=admin123
ADMIN_NAME=Admin User
```

## Troubleshooting

### Still getting 403 after creating admin user?
1. Check if the user was created with the correct role:
   ```javascript
   db.users.findOne({ role: "admin" })
   ```

2. Clear your browser's localStorage:
   - Open Developer Tools (F12)
   - Go to Application/Storage tab
   - Clear localStorage
   - Refresh the page

3. Check if JWT_SECRET is set correctly in your environment

### Database connection issues?
1. Make sure MongoDB is running
2. Check your MONGODB_URI in `.env.local`
3. Test connection with: `npm run seed:admin`

## Security Note
- Change the default admin password after first login
- Use a strong JWT_SECRET in production
- Consider using environment-specific admin credentials
