# ToDo System Project

This repository contains a full-stack **To-Do System** with:
-  A **Flutter User App** (Mobile/Web)
-  A **React Admin Panel** (Next.js + Firebase)

Both apps are connected to a shared Firebase backend for real-time task management.

---

## Project Structure


todo_system_project/

│

  ├── flutter_todo_app/ # User-facing Flutter application
  
  │ ├── lib/
  
  │ ├── pubspec.yaml
  
  │ └── ...
  
  │

├── todo-admin-panel/ # Admin Panel built with React/Next.js

  │ ├── pages/
  
  │ ├── app/
  
  │ ├── package.json
  
  │ └── ...
  
  │

└── README.md

---

## Features

### Flutter User App
- Add, view, and mark tasks as completed
- Modern, responsive UI with animations
- Confirmation dialogs and hover effects (web)

### React Admin Panel
- Full CRUD on tasks
- Animated UI with light theme
- Realtime updates via Firebase Firestore

---

## Setup Instructions

### Prerequisites
- Node.js + npm for admin panel
- Flutter SDK for user app

---

### Firebase Setup (Shared)

Both apps use the same Firebase project:
- Firestore database (collection: `todos`)
- No authentication is enforced (for demo purposes)

> **Firebase Config Exposure**
>
> This project includes the `firebaseConfig` object in both apps. This is **safe** for frontend-only apps using Firebase, because:
>
> - It **does not expose sensitive credentials** like private keys.
> - Firebase projects use **security rules** to control access — that’s where you define who can read/write.
>
> Even if someone has your `firebaseConfig`, they cannot access your database unless your [Firestore Rules](https://firebase.google.com/docs/firestore/security/get-started) allow it.

Still, in production, it is **recommended** to:
- Use authentication (Firebase Auth or custom auth)
- Harden Firestore security rules

---

## Running the Apps

### Flutter App

```bash
cd flutter_todo_app
flutter pub get
flutter run
```
React Admin Panel

```bash
cd todo-admin-panel
npm install
npm run dev
Then visit: http://localhost:3000
```

🛡️ Security Notes
This is a demo project, so:

No authentication

Rules are relaxed for read/write

### Author
Munjwok James Alala

