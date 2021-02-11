import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDe1K-6al_hbyK8e1-V426W7TMoa-Di_ro",
  authDomain: "fir-c23dc.firebaseapp.com",
  projectId: "fir-c23dc",
  storageBucket: "fir-c23dc.appspot.com",
  messagingSenderId: "498795264804",
  appId: "1:498795264804:web:c2587cc6ef66a3190c91b1",
  measurementId: "G-MN0TZL9RDR"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

var fprovider = new firebase.auth.GoogleAuthProvider();
fprovider.addScope("https://www.googleapis.com/auth/contacts.readonly");
fprovider.setCustomParameters({
  login_hint: "user@example.com"
});
export const provider = fprovider;
export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
