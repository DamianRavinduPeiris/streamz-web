import { motion } from "framer-motion";

export default function Login() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center justify-center flex-col mt-10">
        <h1 className="text-4xl font-extrabold text-center mt-3">
          Let's log you in!
        </h1>
        <input
          type="text"
          placeholder="username"
          className="input input-ghost w-full max-w-xs mt-10 border-2 border-gray-300"
        />
        <input
          type="password"
          placeholder="password"
          className="input input-ghost w-full max-w-xs mt-10 border-2 border-gray-300"
        />
        <button
          className="btn btn-success hover:bg-green-500 mt-10 font-tilt"
          style={{ width: "310px" }}
        >
          Login.
        </button>
      </div>
    </motion.div>
  );
}
