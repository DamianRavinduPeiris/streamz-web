import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotLoggedIn from "./NotLoggedIn";
import { fetchUser } from "../util/commonfunctions/UserManager";
import movieType from "../util/types/MovieTypes";
import useTMDB from "../customHooks/useTMDB";
import UserType from "../util/types/UserTypes";
import axios from "axios";
import { options } from "../util/options/Options";


export default function WatchLater() {

  const userFromStore = useSelector((state: any) => state.user);
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [md, setMD] = useState<movieType[]>([]);
  async function getUser() {
    let userData = await fetchUser(userFromStore.email);
    setUser(userData);
    console.log("WL : ", userData.watchLaterList);
    console.log(
      "URL ",
      import.meta.env.VITE_SEARCH_BY_ID_URL + userData.watchLaterList[0]
    );
  }
  function fetchMovies() {
    if (user) {
      user.watchLaterList.map(async (mID: number) => {
      let res =   await axios.get(import.meta.env.VITE_SEARCH_BY_ID_URL + mID, options)
      console.log(res.data);
      setMD((previousMovie)=>{
        return [...previousMovie,res.data]
      })
      });
    }
  };

  useEffect(() => {
    if (userFromStore != null) {
      setLoginStatus(true);
      getUser();
    }
  }, []);
  useEffect(() => {
    if (user) {
      fetchMovies();
    }
  }, [user]);
  return (
    <div>
      {loginStatus ? (
        <motion.div
          className="text-center text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black"
          initial={{ scale: 0 }}
          animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2 }}
        >
          Watch Later.
        </motion.div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
}
