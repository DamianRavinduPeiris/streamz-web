import { motion } from "framer-motion";

export default function Login() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center justify-center flex-col mt-10">
        <h1 className="text-3xl font-extrabold text-center mt-">
          Let's log you in!
        </h1>
        <input
          type="text"
          placeholder="username"
          className="input input-ghost w-full max-w-xs mt-10 border-2 border-gray-200"
        />
        <input
          type="password"
          placeholder="password"
          className="input input-ghost w-full max-w-xs mt-10 border-2 border-gray-200"
        />
        <button
          className="btn btn-success hover:bg-green-500 mt-10 font-tilt"
          style={{ width: "310px" }}
        >
          Login.
        </button>
        <a
          href="/forgot"
          className="text-black-200 mt-5 font-poppins hover:underline"
        >
          Forgot password?
        </a>

        <a
          href="/register"
          className="text-black-200 mt-5 font-poppins hover:underline"
        >
          Don't have an account? Register here.
        </a>
      </div>
    </motion.div>
  );
}
