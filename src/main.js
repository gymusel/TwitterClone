import Vue from "vue"
import App from "./App.vue"
import router from "./router"

import firebase from "firebase/app";
import "firebase/firestore";

Vue.config.productionTip = false

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIv0mpBQTDfsqm3DYuuDK1akV9MktPjww",
  authDomain: "sample-app-fff1f.firebaseapp.com",
  projectId: "sample-app-fff1f",
  storageBucket: "sample-app-fff1f.appspot.com",
  messagingSenderId: "418025184701",
  appId: "1:418025184701:web:39d2774ae73a31d682c6d4",
  measurementId: "G-DP09644DDN"
};

firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
