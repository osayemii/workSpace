# Step-by-Step: Deploy Chat Application on Netlify

## ⚠️ IMPORTANT: This is a 2-Part Deployment
- **Frontend (Client)**: Deploys on Netlify ✅
- **Backend (Server)**: Must deploy on Render/Railway (Netlify doesn't support WebSockets) ❌

---

## PART 1: Deploy Backend First (Required)

### Step 1: Prepare Backend for Deployment

1. Open your terminal/command prompt
2. Navigate to the server folder:
   ```bash
   cd Chat-Application/server
   ```

3. Make sure `package.json` has a start script (it should already):
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

### Step 2: Deploy Backend on Render (Free)

1. Go to [https://render.com](https://render.com)
2. Click **"Sign Up"** (use GitHub to sign up - easiest)
3. After signing in, click **"New +"** button (top right)
4. Select **"Web Service"**
5. Connect your GitHub account if not already connected
6. Select your repository (the one with Chat-Application)
7. Fill in the form:
   - **Name**: `chat-app-server` (or any name you like)
   - **Environment**: Select **"Node"**
   - **Region**: Choose closest to you
   - **Branch**: `master` (or `main` - check your repo)
   - **Root Directory**: Leave empty OR type `Chat-Application` if deploying from repo root
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
8. Click **"Create Web Service"**
9. Wait 2-3 minutes for deployment
10. Once deployed, copy your backend URL (looks like: `https://chat-app-server.onrender.com`)
   - **SAVE THIS URL** - you'll need it in Part 2!

### Step 3: Configure Backend CORS (Optional but Recommended)

1. In Render dashboard, go to your service
2. Click **"Environment"** tab
3. Add new environment variable:
   - **Key**: `ALLOWED_ORIGINS`
   - **Value**: `https://your-netlify-site.netlify.app` (you'll get this after deploying frontend)
   - Click **"Save Changes"**
   - **Note**: You can update this later after deploying frontend

---

## PART 2: Deploy Frontend on Netlify

### Step 4: Build the Frontend

1. Open terminal/command prompt
2. Navigate to client folder:
   ```bash
   cd Chat-Application/client
   ```

3. Install dependencies (if not done):
   ```bash
   npm install
   ```

4. Build for production:
   ```bash
   npm run build
   ```
   - This creates a `dist` folder with optimized files
   - Wait for build to complete (should see "build completed" message)

### Step 5: Deploy to Netlify (Drag & Drop Method)

1. Go to [https://www.netlify.com](https://www.netlify.com)
2. Click **"Sign up"** or **"Log in"** (use GitHub - easiest)
3. After logging in, you'll see your dashboard
4. Look for a section that says **"Want to deploy a new site without connecting to Git?"**
   - OR look for **"Add new site"** → **"Deploy manually"**
   - OR find the drag-and-drop area (usually a box with dashed border)
5. Open File Explorer (Windows) or Finder (Mac)
6. Navigate to: `Chat-Application/client/dist` folder
7. **Drag the entire `dist` folder** into the Netlify deploy area
8. Wait 30-60 seconds for deployment
9. Once deployed, you'll see:
   - A success message
   - Your site URL (looks like: `https://random-name-12345.netlify.app`)
   - **SAVE THIS URL** - you'll need it!

### Step 6: Configure Frontend Environment Variable

1. In Netlify dashboard, click on your site name
2. Go to **"Site settings"** (top menu)
3. Click **"Environment variables"** (left sidebar)
4. Click **"Add variable"** button
5. Add:
   - **Key**: `VITE_SOCKET_URL`
   - **Value**: Your Render backend URL from Step 2 (e.g., `https://chat-app-server.onrender.com`)
6. Click **"Save"**
7. Go back to **"Deploys"** tab (top menu)
8. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
9. Wait for redeploy to complete (1-2 minutes)

### Step 7: Update Backend CORS (Complete the Connection)

1. Go back to Render dashboard
2. Click on your backend service
3. Go to **"Environment"** tab
4. Update the `ALLOWED_ORIGINS` variable:
   - **Value**: Your Netlify URL from Step 5 (e.g., `https://random-name-12345.netlify.app`)
5. Click **"Save Changes"**
6. Render will automatically redeploy (wait 1-2 minutes)

---

## PART 3: Test Your Deployment

### Step 8: Test the Application

1. Open your Netlify site URL in a browser
2. You should see the login page
3. Enter a username and select a room
4. Try sending a message
5. Open the same URL in another browser tab/window
6. Login with a different username
7. Send messages - they should appear in real-time in both windows!

### Step 9: Troubleshooting (If Something Doesn't Work)

**Problem: Can't connect to server**
- Check browser console (F12 → Console tab) for errors
- Verify `VITE_SOCKET_URL` is set correctly in Netlify
- Verify backend is running on Render (check logs)

**Problem: CORS errors**
- Make sure `ALLOWED_ORIGINS` includes your Netlify URL
- Check that backend redeployed after adding environment variable

**Problem: Messages not appearing**
- Check both frontend and backend are running
- Check browser console for errors
- Verify socket connection in Network tab (should see WebSocket connection)

---

## Quick Checklist

- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Frontend built (`npm run build`)
- [ ] Frontend deployed on Netlify (drag & drop `dist` folder)
- [ ] Netlify URL copied
- [ ] `VITE_SOCKET_URL` environment variable set on Netlify
- [ ] Netlify site redeployed
- [ ] `ALLOWED_ORIGINS` set on Render backend
- [ ] Backend redeployed
- [ ] Tested the application - messages work!

---

## Alternative: Deploy Backend on Railway

If you prefer Railway over Render:

1. Go to [https://railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Select your repository
5. Click **"Add Service"** → **"GitHub Repo"**
6. Select your repo again
7. In settings:
   - **Root Directory**: `Chat-Application/server`
   - **Start Command**: `npm start`
8. Railway auto-detects Node.js and deploys
9. Get your backend URL from Railway dashboard
10. Continue from Step 4 above (use Railway URL instead of Render URL)

---

## Notes

- **Free tiers**: Both Render and Netlify have free tiers (with limitations)
- **Render free tier**: Spins down after 15 minutes of inactivity (takes ~30 seconds to wake up)
- **Custom domain**: You can add custom domains later in both platforms
- **File uploads**: Files uploaded will be lost on server restart (use cloud storage for production)

---

## Need Help?

- Check the detailed guide: `NETLIFY_DEPLOYMENT.md`
- Check Render logs: Render dashboard → Your service → Logs
- Check Netlify logs: Netlify dashboard → Your site → Deploys → Click on deploy → View logs
- Check browser console: F12 → Console tab

