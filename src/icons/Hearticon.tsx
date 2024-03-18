import { CiHeart } from "react-icons/ci";
import { motion } from "framer-motion";

export default function Hearticon() {
  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
        className="text-red-600 flex flex-center justify-center align-center"
        style={{ fontSize: "1.5rem" }}
      >
        <div className="tooltip m-2 " data-tip="Add to Favourites!">
          <CiHeart />
        </div>
      </motion.div>
    </div>
  );
}
