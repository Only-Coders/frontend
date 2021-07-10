import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MSG_SENDER_ID,
  appId: process.env.VUE_APP_ID
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
export const google = new firebase.auth.GoogleAuthProvider();
export const gitHub = new firebase.auth.GithubAuthProvider();
export const storage = firebaseApp.storage();
export const database = firebaseApp.database();

export const getServerDate = () => {
  return firebase.database.ServerValue.TIMESTAMP;
};
