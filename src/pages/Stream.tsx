import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Stream() {
  const [md, setMD] = useState({
    title: "",
    poster_path: "",
    overview: "",
    release_date: "",
    vote_average: 0,
  });
  useEffect(() => {
    let movie = JSON.parse(localStorage.getItem("movie") as string);
    setMD(movie);
  }, []);

  return <div className="flex flex-center justify-center m-5">

  <motion.img src={`https://image.tmdb.org/t/p/w500`+md.poster_path} alt="" className="max-w-sm rounded-lg shadow-2xl" style={{height :"500px"}}/>

  </div>;
}
