<h1>WhatsApp Clone Chat App 🚀</h1>

A minimal real-time chat application built with React, Redux Toolkit, Firebase (Auth + Firestore), React Router v6, and Bootstrap, inspired by WhatsApp UI. Users can sign up, log in, view other users, and chat in real-time.

<h2>🔹 Features</h2>
Authentication <br>

Sign Up: Name, email, password (profile picture optional).<br>

Sign In: Email + password authentication.<br>

Prevent duplicate sign-ups.<br>

Only registered users can log in.<br>

Chat Functionality<br>

Home Page: List of all users (except current user), last message, and timestamp.<br>

Chat Page: Real-time chat with messages stored in Firestore:<br>

chats/{chatId}/messages/{messageId}<br>


chatId = sorted combination of user UIDs<br>

Message fields: senderId, text, timestamp<br>

Send & receive messages in real-time.<br>

<h3>Redux Toolkit Slices</h3>

authSlice → Handles authentication (login/signup/logout).<br>

usersSlice → Fetches all registered users from Firestore.<br>

chatSlice → Manages current chat state and selected user.

<r2>UI / Styling

Bootstrap only: Minimal, clean, responsive design.<br>

Navbar with logout button on Home and Chat pages.<br>

Forms styled with form-control and btn.<br>

Inspired by Figma Chat UI Reference
<h2>🔹 Firebase Setup</h2>

Create a Firebase project in Firebase Console
.<br>

Enable Authentication → Email/Password.<br>

Create Firestore Database (in test mode).<br>

Copy the Firebase config into firebase.js.
.
<h2>🔹 Usage</h2>

Navigate to /signup to create a new account.<br>

Navigate to /signin to log in.<br>

After login, you will see the Home Page with all users.<br>

Click on any user to open the Chat Page.<br>

Send and receive messages in real-time.

🔹 Technologies Used

React 18<br>

Redux Toolkit<br>

Firebase Authentication & Firestore<br>

Bootstrap 5<br>

React Router v6

<h2>🔹 Future Improvements</h2>

Add profile pictures for users.<br>

Add message read receipts.<br>

Add typing indicators.<br>

Improve mobile responsiveness.<br>

Add push notifications.
