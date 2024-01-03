import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { MdOutlineWatchLater } from "react-icons/md";

export default function WatchLater() {
  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
        className="text-blue-600 flex flex-center justify-center align-center"
        style={{ fontSize: "1.5rem" }}
      >
        <div className="tooltip m-2" data-tip="Add to Watch Later!">
          <MdOutlineWatchLater
            onClick={() => {
              toast.success("Added to Watch Later!", {
                icon: "👀",
                style: {
                  fontFamily: "Tilt Warp, Sans-Serif",
                },
              });
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
