# Fix: CONFIGURATION_NOT_FOUND Error

## The Problem
The error `CONFIGURATION_NOT_FOUND` means Firebase Authentication is not properly set up in your Firebase project.

## Solution Steps

### Step 1: Enable Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **task-1f791**
3. Click on **Authentication** in the left sidebar
4. If you see "Get started", click it
5. Go to the **Sign-in method** tab
6. Click on **Email/Password**
7. **Enable** the first toggle (Email/Password provider)
8. Click **Save**

### Step 2: Enable Identity Toolkit API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Make sure you're in the project: **task-1f791**
3. Go to **APIs & Services** > **Library**
4. Search for **"Identity Toolkit API"**
5. Click on it and click **Enable**
6. Wait for it to enable (takes a few seconds)

### Step 3: Check API Key Restrictions (If Still Not Working)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your API key: `AIzaSyDP8a028eW4bbrQjIVmfPvW9OX-Pcv_50k`
4. Click on it to edit
5. Under **API restrictions**, make sure:
   - Either "Don't restrict key" is selected, OR
   - "Restrict key" includes:
     - Identity Toolkit API
     - Firebase Authentication API
6. Under **Application restrictions**, for development:
   - Select "None" (or add your localhost domain)
7. Click **Save**

### Step 4: Verify Everything

After completing the above steps:
1. Wait 1-2 minutes for changes to propagate
2. Clear your browser cache (Ctrl+Shift+Delete)
3. Restart your dev server
4. Try signing up again

## Quick Checklist

- [ ] Authentication enabled in Firebase Console
- [ ] Email/Password provider enabled
- [ ] Identity Toolkit API enabled in Google Cloud
- [ ] API key restrictions allow Identity Toolkit API
- [ ] Browser cache cleared
- [ ] Dev server restarted

## Still Not Working?

If you still get the error after all steps:
1. Double-check that you're using the correct Firebase project
2. Verify the API key is correct in your config file
3. Try creating a new Firebase project and use that config instead
4. Check browser console for any other errors



