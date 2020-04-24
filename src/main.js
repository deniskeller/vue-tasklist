import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import {
  firestorePlugin
} from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyC6hl_ceLWUv5pLeAMSy7h1DGOdQdTc4Lc",
  authDomain: "kt-team-test-keller.firebaseapp.com",
  databaseURL: "https://kt-team-test-keller.firebaseio.com",
  projectId: "kt-team-test-keller",
  storageBucket: "kt-team-test-keller.appspot.com",
  messagingSenderId: "194895677003",
  appId: "1:194895677003:web:8704bdd449267d52c2efce",
  measurementId: "G-PY062DBJD0",
});

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");