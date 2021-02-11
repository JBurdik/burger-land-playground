import { createApp } from "vue";
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from "./App.vue";
// import firebase from "firebase/app";
import "./index.css";
import store from "./store";

// var firebaseConfig = {
//   apiKey: "AIzaSyDe1K-6al_hbyK8e1-V426W7TMoa-Di_ro",
//   authDomain: "fir-c23dc.firebaseapp.com",
//   projectId: "fir-c23dc",
//   storageBucket: "fir-c23dc.appspot.com",
//   messagingSenderId: "498795264804",
//   appId: "1:498795264804:web:c2587cc6ef66a3190c91b1",
//   measurementId: "G-MN0TZL9RDR"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const app = Vue.createApp(App);

// app.provide($toastr, toastr);
// app.use(store);
// app.mount("#app");

createApp(App).use(store).mount("#app");
