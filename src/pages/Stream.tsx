import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Genres from "../util/Genres.json";
import BreadCrumb from "../components/BreadCrumb";
import { PlayArrow, Explore } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Hearticon from "../icons/Hearticon";
import WatchLater from "../icons/WatchLaterIcon";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { auth } from "../headers/Headers";
import { fetchUser, updateUser } from "../util/commonfunctions/UserManager";
import showAlert from "../alerts/ShowAlert";
import alertTypes from "../util/types/AlertTypes";



export default function Stream() {
  const userFromStore = useSelector((state: any) => state.user);

  const [md, setMD] = useState({
    id: 0,
    title: "",
    poster_path: "",
    overview: "",
    release_date: "",
    vote_average: 0,
    genre_ids: [],
  });
  const [genres, setGenres] = useState<string[]>([]);
  const [isPlayed, setPlayStatus] = useState<boolean>(false);

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
        {!isPlayed ? (
          <>
            <motion.img
              src={`https://image.tmdb.org/t/p/w500` + md.poster_path}
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
                {md.release_date}
              </div>
              <h1 className="text-5xl  font-tilt text-black m-1 mt-3">
                {md.title}
                <sup className="m-1" style={{ fontSize: "1rem" }}>
                  ⭐{md.vote_average}
                </sup>
              </h1>
              <p className="text-1xl  font-tilt text-black mt-2">
                {md.overview}
              </p>
              <Button
                style={{
                  marginTop: "20px",
                  fontFamily: "Tilt Warp, sans-serif",
                }}
                variant="contained"
                color="info"
                className="w-20 font-tilt rounded bg-black"
                startIcon={<PlayArrow />}
                onClick={() => {
                  setPlayStatus(true);
                }}
              >
                Play.
              </Button>

              <div className="card-actions justify-end">
                {genres.map((g, index) => {
                  return (
                    <div className="badge badge-ghist m-2" key={index}>
                      {g}
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-row justify-start">
                <div
                  onClick={async () => {
                    let user = await fetchUser(userFromStore.email);
                    console.log("received user", user);
                    let favouriteList = user.favouriteList;
                    let array: number[] = [];
                    if (favouriteList.includes(md.id)) {
                      array = user.favouriteList.filter((id: number) => {
                        return id !== md.id;
                      });
                      console.log("array", array);
                      user.favouriteList = array;
                      let res = await updateUser(user);
                      console.log("res", res)
                      if (res.isUpdated) {
                       showAlert(alertTypes.SUCCESS, "Favorites Updated!", "💖");
                      } else {
                        showAlert(alertTypes.ERROR, "An error occurred while updating favourites!" + res.data.msg, "💔");
                      }
                    } else {
                      console.log("else");
                      user.favouriteList.push(md.id);
                      let res = await updateUser(user);
                      console.log("res", res)
                      if (res.isUpdated) {
                        showAlert(alertTypes.SUCCESS, "Favorites Updated!", "💖");
                      } else {
                        showAlert(alertTypes.ERROR, "An error occurred while updating favourites!" + res.data.msg, "💔");
                      }
                    }
                  }}
                >
                  <Hearticon />
                </div>
                <div onClick={() => {}}>
                  <WatchLater />
                </div>
              </div>
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
                src={import.meta.env.VITE_STREAMING_URL + md.id}
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
