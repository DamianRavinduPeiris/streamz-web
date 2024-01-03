import { calcLength, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { sigInWithGoogle } from "../auth/FireBase";
import { LoginStatusContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";


export default function Header() {
  const dispatch = useDispatch();
  const userFromStore = useSelector((state: any) => state.user);
  function handleSignIn() {
    sigInWithGoogle(dispatch, userFromStore);
  }
  console.log("userFromStore-header", userFromStore);
  const navigate = useNavigate();
  navigate("/explore");

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
            className="mt-10 font-tilt text-lg text-white text-opacity-80 lg:text-xl sm:px-16 xl:px-48 "
            initial={{ scale: 0 }}
            animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 }}
          >
            Streamz is a free and open-source streaming platform that allows you
            to watch movies and TV shows.
          </motion.div>
          <motion.div
            className="mt-10 flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
            initial={{ scale: 0 }}
            animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4 }}
          >
            {" "}
            <button
              className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
              onClick={handleSignIn}
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Continue with Google.</span>
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
