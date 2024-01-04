// Importa las funciones necesarias de tus SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbMricbGC8eLx0C7moHmvVIVQssJCgaGQ",
  authDomain: "viviendaasistida-e8d8f.firebaseapp.com",
  projectId: "viviendaasistida-e8d8f",
  storageBucket: "viviendaasistida-e8d8f.appspot.com",
  messagingSenderId: "594703769176",
  appId: "1:594703769176:web:fd2287e6708a4812b1b42d"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const firebase_auth = getAuth(app);

export { firestore, firebase_auth };