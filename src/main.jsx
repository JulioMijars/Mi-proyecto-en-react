import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyCdbFqCBG9MZlSlZVukXx5uKYamgJijRpY",
  authDomain: "tecnomar-64cce.firebaseapp.com",
  projectId: "tecnomar-64cce",
  storageBucket: "tecnomar-64cce.appspot.com",
  messagingSenderId: "354990325565",
  appId: "1:354990325565:web:e54904128e4d6a25838f54"
};

initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

