import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js';

const firebaseConfig =
{
  apiKey: "AIzaSyBDz4iOz98Us7RaNgOTAZ6PGsemBFW7k_A",
  authDomain: "xetuteauth.firebaseapp.com",
  projectId: "xetuteauth",
  storageBucket: "xetuteauth.firebasestorage.app",
  messagingSenderId: "500556520913",
  appId: "1:500556520913:web:381dc486949b1ae84694f0",
  measurementId: "G-VJFMP5F975"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

document.getElementById('Sign-Up-Btn').addEventListener('click',
  async => 
  {
    const email = document.getElementById('Sign-Up-Email').value;
    const password = [ document.getElementById('Sign-Up-Password0').value, document.getElementById('Sign-Up-Password1').value ];
    if (password[0] !== password[1])
    {
      document.getElementById('error').textContent = 'Passwords don\'t match';
    }

    createUserWithEmailAndPassword(auth, email, password[0])
    .then((creds) => { window.location.href = document.getElementById('Auth-Refer').textContent; } )
    .catch((error) => { document.getElementById('error').textContent = error.message; })
  }
);

document.getElementById('Sign-In-Btn').addEventListener('click',
  async =>
  {
    const email = document.getElementById('Sign-In-Email').value;
    const password = document.getElementById('Sign-In-Password').value;
    signInWithEmailAndPassword(auth, email, password)
    .then((creds) => { window.location.href = document.getElementById('Auth-Refer').textContent; })
    .catch((error) => { document.getElementById('error').textContent = error.message; })
  }
)