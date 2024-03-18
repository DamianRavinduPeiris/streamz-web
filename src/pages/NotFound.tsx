import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
    >
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="flex flex-center justify-center ">
            <img
              className="h-40 w-40 mr-2"
              src="https://www.svgrepo.com/show/156861/play-button.svg"
              alt=""
            ></img>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found - 404
          </h1>

          <p className="mt-6 font-tilt">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home.
              </a>
            </Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
