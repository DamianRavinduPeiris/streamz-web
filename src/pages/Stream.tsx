import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Genres from "../util/Genres.json";
import BreadCrumb from "../components/BreadCrumb";

export default function Stream() {
  const [md, setMD] = useState({
    title: "",
    poster_path: "",
    overview: "",
    release_date: "",
    vote_average: 0,
    genre_ids: [],
  });
  const [genres, setGenres] = useState<string[]>([]);
  useEffect(() => {
    let movie = JSON.parse(localStorage.getItem("movie") as string);
    setMD(movie);
    const genreArray: string[] = [];
    movie.genre_ids.map((id: number) => {
      Genres.genres.map((genre) => {
        if (genre.id === id) {
          genreArray.push(genre.name);
        }
      });
    });
    setGenres(genreArray);
  }, []);

  return (
    <>
      <BreadCrumb name="Streaming." movieName={md.title} />
      <div className="flex flex-center justify-center hero min-h-screen bg-[#F2F1EB] rounded ">
        <motion.img
          src={`https://image.tmdb.org/t/p/w500` + md.poster_path}
          alt=""
          className="max-w-sm rounded-lg shadow-2xl m-10"
          style={{ height: "500px" }}
          initial={{ scale: 0 }}
          animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 0.1 }}
        />
        <motion.div
          className="flex flex-col justify-center m-5"
          initial={{ scale: 0 }}
          animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="badge badge-error font-tilt">{md.release_date}</div>
          <h1 className="text-5xl  font-tilt text-black m-1 mt-3">
            {md.title}
          </h1>
          <p className="text-1xl  font-tilt text-black mt-2">{md.overview}</p>
          <div className="card-actions justify-end">
            {genres.map((g) => {
              return <div className="badge badge-ghist m-2">{g}</div>;
            })}
          </div>
        </motion.div>
      </div>
    </>
  );
}
