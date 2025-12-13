# Firebase Setup Guide

## Step-by-Step Firebase Configuration

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter a project name
   - (Optional) Enable Google Analytics
   - Click "Create project"

### 2. Enable Authentication

1. In the Firebase Console, go to **Authentication**
2. Click "Get started"
3. Go to the **Sign-in method** tab
4. Click on **Email/Password**
5. Enable the first toggle (Email/Password)
6. Click **Save**

### 3. Create Firestore Database

1. In the Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Select **Start in production mode** (we'll add security rules next)
4. Choose a location for your database (select the closest to your users)
5. Click **Enable**

### 4. Set Up Firestore Security Rules

1. In Firestore Database, go to the **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Tasks collection - users can read/write their own tasks or assigned tasks
    match /tasks/{taskId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.uid == resource.data.assignedTo);
      
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
      
      allow update, delete: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.uid == resource.data.assignedTo);
    }
    
    // Teams collection - only team members can access
    match /teams/{teamId} {
      allow read: if request.auth != null && 
        request.auth.uid in resource.data.members;
      
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.createdBy;
      
      allow update: if request.auth != null && 
        (request.auth.uid in resource.data.members || 
         request.auth.uid == resource.data.createdBy);
      
      allow delete: if request.auth != null && 
        request.auth.uid == resource.data.createdBy;
    }
  }
}
```

3. Click **Publish**

### 5. Create Firestore Indexes (Optional but Recommended)

If you encounter query errors, you may need to create composite indexes:

1. Go to **Firestore Database** > **Indexes**
2. Click **Create Index**
3. For tasks collection:
   - Collection ID: `tasks`
   - Fields to index:
     - `userId` (Ascending)
     - `createdAt` (Descending)
   - Query scope: Collection
   - Click **Create**

4. Create another index:
   - Collection ID: `tasks`
   - Fields to index:
     - `assignedTo` (Ascending)
     - `createdAt` (Descending)
   - Query scope: Collection
   - Click **Create**

### 6. Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. If you don't have a web app, click the **Web icon** (`</>`) to add one
4. Register your app with a nickname (e.g., "Task Management App")
5. Copy the `firebaseConfig` object

### 7. Update Your Application

1. Open `src/firebase/config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",           // Your API key
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 8. Test Your Setup

1. Run your application: `npm run dev`
2. Try to sign up with a new email
3. Create a task
4. Verify the task appears in Firestore Database > Data tab

## Troubleshooting

### "Missing or insufficient permissions" error
- Check that your Firestore security rules are published
- Verify the user is authenticated
- Check that the user ID matches in the rules

### "Index required" error
- Go to Firestore > Indexes
- Click on the link in the error message to create the required index
- Wait for the index to build (can take a few minutes)

### Authentication not working
- Verify Email/Password is enabled in Authentication > Sign-in method
- Check browser console for errors
- Ensure your Firebase config is correct

### Real-time updates not working
- Check that Firestore is in production mode (not test mode)
- Verify security rules allow read access
- Check browser console for errors

## Security Best Practices

1. **Never commit your Firebase config with real credentials to public repositories**
2. **Use environment variables** for sensitive data in production
3. **Regularly review your security rules**
4. **Enable Firebase App Check** for additional security
5. **Monitor your Firebase usage** in the console

## Next Steps

After setup, you can:
- Customize the security rules for your specific needs
- Add more authentication providers (Google, GitHub, etc.)
- Set up Firebase Hosting to deploy your app
- Configure Firebase Storage if you need file uploads













