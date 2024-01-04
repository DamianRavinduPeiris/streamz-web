import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotLoggedIn from "./NotLoggedIn";

export default function Favorites() {
  const userFromStore = useSelector((state: any) => state.user);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  useEffect(() => {
    if (userFromStore != null) {
      setLoginStatus(true);
    }
  }, []);
  return (
    <div>
      {loginStatus ? (
        <motion.div
          className="text-center text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black"
          initial={{ scale: 0 }}
          animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2 }}
        >
          Favourites.
        </motion.div>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
}
