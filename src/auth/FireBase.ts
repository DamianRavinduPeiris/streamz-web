import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import UserType from "../util/types/UserTypes";
import axios from "axios";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const sigInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((res) => {
      const user: UserType = {
        name: res.user.displayName ?? "",
        email: res.user.email ?? "",
        favouriteList: [],
        historyList: [],
      };
      saveUser(user);

      localStorage.setItem("user", JSON.stringify(res.user));
      console.log(res.user);
    })
    .catch((err) => {
      console.log("An Error occurred while authenticating : " + err);
    });
};

function saveUser(user: UserType): void {
  axios
    .post("http://localhost:3000/user/saveUser", user)
    .then((res) => {
      if (res.data.isSaved) {
        return console.log("User saved successfully!");
      }
      console.log("User not saved!");
    })
    .catch((err) => {
      console.log("An error occurred while saving user : " + err);
    });
}
