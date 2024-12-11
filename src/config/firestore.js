// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const COLLECTION_BERKAS = "berkas";
const COLLECTION_PENDUDUK = "penduduk";
const COLLECTION_USER = "user";
const COLLECTION_DELETE = "delete";
const COLLECTION_BERITA = "berita";
const COLLECTION_PENGUMUMAN = "pengumuman";
const COLLECTION_KEUANGAN = "keuangan";
// Initialize Cloud Firestore and get a reference to the service
export { db, storage, COLLECTION_BERKAS, COLLECTION_PENDUDUK , COLLECTION_USER, COLLECTION_DELETE, COLLECTION_BERITA, COLLECTION_PENGUMUMAN, COLLECTION_KEUANGAN};

