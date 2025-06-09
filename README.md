EmprendeU
EmprendeU is a web platform for managing coupons, products, and university-based stores, built with React and Firebase.

Main Features
User registration and login.
Product and store management.
Acces de whatsapp api to talk to sellers.
"Scratch and Win" game to obtain daily coupons.
Coupon validation and visualization.
Admin panel and personalized profiles.

Prerequisites
Node.js version 16 or higher.
npm or yarn.
A Firebase account (Firestore and Authentication enabled).

Installation
Clone this repository:
git clone https://github.com/your-username/EmprendeU.git
cd EmprendeU

Install dependencies:
npm install or yarn install

Configure Firebase:
Create a project in Firebase Console.
Enable Firestore and Authentication (Email/Password).
Copy your Firebase credentials into a .env file at the root of the project with the following variables:

env
Copiar
Editar
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID

Running Locally
To run the application locally:
npm run build or yarn build
The app will be available at http://localhost:3000.

Running wit host
Deploy the branch using your preferred hosting service (Firebase Hosting, Vercel, Netlify, etc.).

Main Dependencies
React — Main library for building the UI.
Firebase — Backend (Firestore, Authentication).
Material UI (MUI) — UI components library.
React Router — Routing and navigation.

Project Structure
/src/components    # Reusable components (Navbar, Sidebar, etc.)
/src/pages         # Main pages of the app (Dashboard, Game, Coupons, etc.)
/src/services      # Firebase configuration and other services
/src/resources     # Static images and resources
Support
To report bugs or request support, open an issue in this repository or contact the development team.
