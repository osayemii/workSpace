# Deploying Chat Application on Netlify - Manual Guide

## Important Note

This is a **full-stack application** with:
- **Frontend (Client)**: React app - Can be deployed on Netlify ✅
- **Backend (Server)**: Node.js with Socket.io - **Cannot be deployed on Netlify** ❌

Netlify doesn't support persistent WebSocket connections needed for Socket.io. You'll need to deploy the backend separately on a platform like:
- **Render** (recommended - free tier available)
- **Railway**
- **Heroku**
- **DigitalOcean App Platform**
- **AWS/Google Cloud**

---

## Part 1: Deploy Frontend (Client) on Netlify

### Step 1: Build the Frontend

1. Navigate to the client directory:
```bash
cd Chat-Application/client
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Build the production version:
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Step 2: Update Backend URL in Client Code

Before building, you need to make the backend URL configurable. The client currently hardcodes `http://localhost:3001`.

**Option A: Use Environment Variables (Recommended)**

1. Update `Chat-Application/client/src/App.jsx`:
   - Change line 19 from:
     ```javascript
     socketRef.current = io('http://localhost:3001', {
     ```
   - To:
     ```javascript
     socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001', {
     ```

2. Create a `.env.production` file in `Chat-Application/client/`:
   ```
   VITE_SOCKET_URL=https://your-backend-url.com
   ```

3. Create a `.env` file for local development:
   ```
   VITE_SOCKET_URL=http://localhost:3001
   ```

**Option B: Manual Configuration**

Update the socket URL directly in `App.jsx` to your deployed backend URL.

### Step 3: Manual Netlify Deployment

#### Method 1: Drag and Drop (Easiest)

1. Go to [Netlify](https://www.netlify.com/) and sign in
2. On your dashboard, find the **"Sites"** section
3. Look for **"Add new site"** → **"Deploy manually"** or drag-and-drop area
4. Drag the entire `Chat-Application/client/dist` folder to the deploy area
5. Wait for deployment to complete
6. Your site will be live at a URL like `https://random-name-123.netlify.app`

#### Method 2: Netlify CLI

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Navigate to the client directory:
```bash
cd Chat-Application/client
```

3. Login to Netlify:
```bash
netlify login
```

4. Initialize and deploy:
```bash
netlify init
# Follow prompts:
# - Create & configure a new site
# - Team: Select your team
# - Site name: (optional, or press enter for random name)
# - Build command: npm run build
# - Directory to deploy: dist
# - Netlify functions folder: (press enter, leave empty)

# Deploy:
netlify deploy --prod
```

### Step 4: Configure Environment Variables on Netlify

1. Go to your site on Netlify dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add a new variable:
   - **Key**: `VITE_SOCKET_URL`
   - **Value**: Your backend URL (e.g., `https://your-backend.onrender.com`)
4. **Redeploy** your site for changes to take effect

### Step 5: Configure CORS on Backend

Make sure your backend server allows requests from your Netlify domain. Update `Chat-Application/server/server.js`:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-site-name.netlify.app',
    'https://*.netlify.app' // Allow all Netlify preview deployments
  ],
  credentials: true
};
```

---

## Part 2: Deploy Backend on Render (Recommended)

### Step 1: Prepare Backend for Deployment

1. Update `server.js` to use environment variables:
   - Change CORS to allow your Netlify domain
   - Ensure PORT uses `process.env.PORT` (already done ✅)

2. Create a `.gitignore` in server folder (if not exists):
```
node_modules/
uploads/
.env
```

### Step 2: Deploy on Render

1. Go to [Render](https://render.com/) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `chat-app-server` (or any name)
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (or set to `Chat-Application` if deploying from repo root)
5. Click **"Create Web Service"**
6. Wait for deployment
7. Copy your backend URL (e.g., `https://chat-app-server.onrender.com`)

### Step 3: Update Frontend with Backend URL

1. Go back to Netlify
2. Update the `VITE_SOCKET_URL` environment variable with your Render backend URL
3. Redeploy your Netlify site

---

## Part 3: Alternative - Deploy Backend on Railway

1. Go to [Railway](https://railway.app/)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Add service → Select your repo
5. Configure:
   - **Root Directory**: `Chat-Application/server`
   - **Start Command**: `npm start`
6. Railway will auto-detect Node.js and deploy
7. Get your backend URL from Railway dashboard

---

## Troubleshooting

### Issue: Socket.io connection fails

**Solution**: 
- Ensure CORS is configured correctly on backend
- Check that your backend URL is correct in Netlify environment variables
- Verify backend is running and accessible

### Issue: File uploads not working

**Solution**:
- Render/Railway have ephemeral file systems - uploaded files will be lost on restart
- Consider using cloud storage (AWS S3, Cloudinary) for production

### Issue: Environment variables not working

**Solution**:
- Vite requires `VITE_` prefix for environment variables
- Redeploy after adding environment variables
- Check browser console for connection errors

---

## Quick Deployment Checklist

- [ ] Build frontend (`npm run build` in client folder)
- [ ] Update socket URL in client code (use environment variable)
- [ ] Deploy backend on Render/Railway
- [ ] Get backend URL
- [ ] Deploy frontend on Netlify (drag & drop `dist` folder)
- [ ] Add `VITE_SOCKET_URL` environment variable on Netlify
- [ ] Update backend CORS to allow Netlify domain
- [ ] Test the deployed application

---

## Production Considerations

1. **File Storage**: Use cloud storage (S3, Cloudinary) instead of local uploads
2. **Database**: Add MongoDB/PostgreSQL for persistent message storage
3. **Authentication**: Add user authentication (JWT, OAuth)
4. **HTTPS**: Ensure both frontend and backend use HTTPS
5. **Rate Limiting**: Add rate limiting to prevent abuse
6. **Monitoring**: Set up error tracking (Sentry, LogRocket)

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Check backend logs on Render/Railway
3. Verify environment variables are set correctly
4. Ensure CORS is properly configured

