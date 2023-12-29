import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import UserType from "../util/types/UserTypes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
        profilePic: res.user.photoURL ?? "",
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

async function isExists(email: string) {
  try {
    let result = await axios.get(
      "http://localhost:3000/user/search?email=" + email
    );
    console.log("result heheh", result.data);

    if (result.data.isExists) {
      return true;
    }
  } catch (error) {
    console.log("An error occurred while checking user email : " + error);
  }

  return false;
}

async function saveUser(user: UserType): Promise<void> {
  let result = await isExists(user.email);
  console.log("result", result);
  if (result) {
    toast.success("Welcome Back!", {
      icon: "🍾",
     style : {
        fontFamily: "Tilt Warp, Sans-Serif",
     }
    });
  } else {
    try {
      let status = await axios.post(
        "http://localhost:3000/user/saveUser",
        user
      );
      if (status.data.isSaved) {
        toast.success("Successfully registered!", {
          icon: "🎇",
          
        });
      } else {
        toast.error("An error occurred while registering!", {
          icon: "😢",
          style : {
            fontFamily: "Tilt Warp, Sans-Serif",
         }
         
        });
      }
    } catch (error) {
      console.log("An error occurred while registering : " + error);
    }
  }
}
