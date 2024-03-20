import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Genres from "../util/Genres.json";
import BreadCrumb from "../components/BreadCrumb";
import { PlayArrow, Explore } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import TVShowType from "../util/types/TVShowTypes";

export default function TVStream() {
  const [td, setTD] = useState<TVShowType>();
  const [genres, setGenres] = useState<string[]>([]);
  const [isPlayed, setPlayStatus] = useState<boolean>(false);

  useEffect(() => {
    let tvShow = JSON.parse(localStorage.getItem("tvShow") as string);
    setTD(tvShow);
    const genreArray: string[] = [];
    if (tvShow.genre_ids) {
      tvShow.genre_ids.map((id: number) => {
        Genres.genres.map((genre) => {
          if (genre.id === id) {
            genreArray.push(genre.name);
          }
        });
      });
      setGenres(genreArray);
    }
  }, []);

  return (
    <>
      <BreadCrumb name="Streaming." movieName={td?.name} />
      <div className="flex flex-col md:flex-row justify-center hero min-h-screen bg-[#F2F1EB] rounded ">
        {!isPlayed ? (
          <>
            <motion.img
              src={`https://image.tmdb.org/t/p/w500` + td?.poster_path}
              alt=""
              className="max-w-sm rounded-lg shadow-2xl m-5"
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
              <div className="badge badge-error font-tilt">
                {td?.first_air_date}
              </div>
              <h1 className="text-5xl  font-tilt text-black m-1 mt-3">
                {td?.name}
                <sup className="m-1" style={{ fontSize: "1rem" }}>
                  ⭐{td?.vote_average}
                </sup>
              </h1>
              <p className="text-1xl  font-tilt text-black mt-2">
                {td?.overview}
              </p>
              <Button
                style={{
                  marginTop: "20px",
                  fontFamily: "Tilt Warp, sans-serif",
                }}
                variant="outlined"
                color="primary"
                className="w-20 font-tilt rounded bg-black"
                startIcon={<PlayArrow />}
                onClick={() => {
                  setPlayStatus(true);
                }}
              >
                Play.
              </Button>

              <div className="card-actions justify-end">
                {genres
                  ? genres.map((g, index) => {
                      return (
                        <div className="badge badge-ghist m-2" key={index}>
                          {g}
                        </div>
                      );
                    })
                  : null}
              </div>
              <div className="flex flex-row justify-start"></div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
              transition={{ delay: 0.1 }}
            >
              <iframe
                className="rounded-lg shadow-2xl m-5"
                style={{ width: "90vw", height: "50vh" }}
                src={import.meta.env.VITE_TV_SHOWS_STREAMING_URL + td?.id}
                allowFullScreen
              ></iframe>
              <Link to={"/explore"}>
                <Button
                  style={{ fontFamily: "Tilt Warp, sans-serif" }}
                  variant="contained"
                  color="success"
                  className="w-60 font-tilt rounded"
                  startIcon={<Explore />}
                >
                  Back to Explore.
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}
