import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { sigInWithGoogle } from "../auth/FireBase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const userFromStore = useSelector((state: any) => state.user);

  function handleSignIn() {
    sigInWithGoogle(dispatch, userFromStore);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (userFromStore != null) {
      navigate("/explore");
    }
  }, [userFromStore]);

  return (
    <motion.div
      className="mt-10 relative"
      initial={{ scale: 0 }}
      animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{ delay: 0.1 }}
    >
      <section className="relative bg-main-image bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 relative">
          <motion.div
            className="mt-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            initial={{ scale: 0 }}
            animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your ultimate streaming companion.
          </motion.div>
          <motion.div
            className="mt-10 font-tilt text-lg lg:text-xl text-white text-opacity-80 sm:px-16 xl:px-48 "
            initial={{ scale: 0 }}
            animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 }}
          >
            Streamz is a free and open-source streaming platform that allows you
            to watch movies and TV shows.
          </motion.div>
          <motion.div
            className="mt-10 flex flex-col items-center lg:items-start mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
            initial={{ scale: 0 }}
            animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              className="flex items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-700"
              onClick={handleSignIn}
            >
              <img
                className="w-6 h-6 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google logo"
              />
              <span className="text-white font-tilt">
                Continue with Google.
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
