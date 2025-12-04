# Task Management Application

A modern, real-time task management application built with React, Firebase, and JavaScript. Features include real-time updates, team collaboration, and beautiful animations.

## Features

- ✅ **Real-time Task Management**: Tasks update instantly across all devices using Firebase Firestore
- 🔐 **Authentication**: Secure user authentication with Firebase Auth
- 👥 **Team Collaboration**: Create teams, invite members, and assign tasks
- 📊 **Task Statistics**: View task counts by status (Pending, In Progress, Completed)
- 🔍 **Search & Filter**: Search tasks and filter by status
- 🎨 **Beautiful UI**: Modern design with animated background and smooth transitions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React** - UI framework
- **Firebase** - Backend (Authentication & Firestore)
- **JavaScript** - Programming language
- **React Icons** - Icon library
- **CSS3** - Styling with animations and transitions

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
4. Create a Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon
   - Copy the Firebase configuration object

### 3. Configure Firebase

Open `src/firebase/config.js` and replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Firestore Security Rules

Set up your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Tasks collection
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.uid == resource.data.assignedTo ||
         request.auth.uid == request.resource.data.userId ||
         request.auth.uid == request.resource.data.assignedTo);
    }
    
    // Teams collection
    match /teams/{teamId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.members;
    }
  }
}
```

### 5. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
Task_Management/
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx    # Animated particle background
│   │   ├── Auth.jsx                   # Authentication component
│   │   ├── TaskList.jsx               # Main task list component
│   │   ├── TaskCard.jsx               # Individual task card
│   │   ├── TaskForm.jsx               # Task creation form
│   │   └── TeamManagement.jsx         # Team collaboration features
│   ├── firebase/
│   │   └── config.js                  # Firebase configuration
│   ├── App.jsx                        # Main app component
│   ├── App.css                        # App styles
│   ├── index.css                      # Global styles
│   └── main.jsx                       # Entry point
├── package.json
└── README.md
```

## Features in Detail

### Real-time Updates
- Tasks automatically sync across all devices
- Changes appear instantly without page refresh
- Uses Firebase Firestore real-time listeners

### Team Collaboration
- Create teams and invite members
- Assign tasks to team members
- View tasks assigned to you or created by you
- Team management interface

### Task Management
- Create, edit, and delete tasks
- Update task status (Pending, In Progress, Completed)
- Add descriptions, priorities, and due dates
- Search and filter tasks

### UI/UX Features
- Animated particle background
- Smooth transitions and animations
- Glassmorphism design
- Responsive layout
- Loading states
- Error handling

## Usage

1. **Sign Up/Login**: Create an account or sign in
2. **Create Tasks**: Click "Add Task" to create a new task
3. **Manage Tasks**: Click on task cards to edit or change status
4. **Team Collaboration**: Click the team icon to manage teams and assign tasks
5. **Filter & Search**: Use the filter buttons and search bar to find tasks

## Future Enhancements

- [ ] Task comments and discussions
- [ ] File attachments
- [ ] Task due date reminders
- [ ] Email notifications
- [ ] Task templates
- [ ] Project/workspace organization
- [ ] Activity timeline
- [ ] Dark/light theme toggle

## License

This project is open source and available under the MIT License.
