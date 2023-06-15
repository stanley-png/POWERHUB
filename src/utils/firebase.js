import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/performance";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
// import { getPerformance } from "firebase/performance";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC_rgNJYR2pTNcCBi2Xr2HuV8Jt03qnLO4",
  authDomain: "powerhub-4ef8a.firebaseapp.com",
  projectId: "powerhub-4ef8a",
  storageBucket: "powerhub-4ef8a.appspot.com",
  messagingSenderId: "798779970238",
  appId: "1:798779970238:web:abae2544661d93be8c44ef",
  measurementId: "G-L4JTNMNVJQ",
});

const analytics = getAnalytics(firebaseApp);
logEvent(analytics, "click", {
  name: "Page_Clicked",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
const gitProvider = new firebase.auth.GithubAuthProvider();
const perf = getPerformance(firebaseApp);

export { analytics, perf, db, storage, auth, provider, gitProvider };
