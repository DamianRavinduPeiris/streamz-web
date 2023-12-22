import { motion } from "framer-motion";
export default function Header() {
  return (
    <motion.div
      className="mt-10"
      initial={{ scale: 0 }}
      animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{ delay: 0.1 }}
    >
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 dark:from-pink-700 dark:to-orange-700 ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
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
            <button className="btn btn-outline">Get Started!</button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
