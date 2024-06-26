/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const movie = JSON.parse(localStorage.getItem("movie") as string);
    setMD(movie);
    const genreArray: string[] = [];
    if (movie.genre_ids) {
      movie.genre_ids.map((id: number) => {
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
      <BreadCrumb name="Streaming." movieName={md.title} />
      <div className="flex flex-col md:flex-row justify-center hero min-h-screen bg-[#F2F1EB] rounded ">
        {!isPlayed ? (
          <>
            <motion.img
              src={`https://image.tmdb.org/t/p/w500` + md.poster_path}
              alt=""
              className="max-w-sm rounded-lg shadow-2xl m-5"
              style={{ height: "400px" }}
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
              <h1 className="text-3xl md:text-5xl font-tilt text-black m-1 mt-3 md:text:3xl">
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
                variant="outlined"
                color="primary"
                className="w-20 font-tilt rounded bg-black"
                startIcon={<PlayArrow />}
                onClick={() => {
                  // setPlayStatus(true);
                  window.location.href = import.meta.env.VITE_STREAMING_URL+ md.id;
                }}
              >
                Play.
              </Button>

              <div className="card-actions justify-end ">
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
              <div className="flex flex-row justify-start">
                <div
                  onClick={async () => {
                    const user = await fetchUser(userFromStore.email);
                    console.log("received user", user);
                    const favouriteList = user.favouriteList;
                    let array: number[] = [];
                    if (favouriteList.includes(md.id)) {
                      array = user.favouriteList.filter((id: number) => {
                        return id !== md.id;
                      });
                      console.log("array", array);
                      user.favouriteList = array;
                      const res = await updateUser(user);
                      console.log("res", res);
                      if (res.isUpdated) {
                        showAlert(
                          alertTypes.SUCCESS,
                          "Favorites Updated!",
                          "💖"
                        );
                      } else {
                        showAlert(
                          alertTypes.ERROR,
                          "An error occurred while updating favourites!" +
                            res.data.msg,
                          "💔"
                        );
                      }
                    } else {
                      console.log("else");
                      user.favouriteList.push(md.id);
                      console.log("updated fl", user);
                      const res = await updateUser(user);
                      console.log("res", res);
                      if (res.isUpdated) {
                        showAlert(
                          alertTypes.SUCCESS,
                          "Favorites Updated!",
                          "💖"
                        );
                      } else {
                        showAlert(
                          alertTypes.ERROR,
                          "An error occurred while updating favourites!" +
                            res.data.msg,
                          "💔"
                        );
                      }
                    }
                  }}
                >
                  <Hearticon />
                </div>
                <div
                  onClick={async () => {
                  const user = await fetchUser(userFromStore.email);
                    console.log("received user", user);
                    const watchList = user.watchLaterList;
                    let array: number[] = [];
                    if (watchList.includes(md.id)) {
                      array = user.watchLaterList.filter((id: number) => {
                        return id !== md.id;
                      });
                      console.log("array", array);
                      user.watchLaterList = array;
                     const res = await updateUser(user);
                      console.log("res", res);
                      if (res.isUpdated) {
                        showAlert(
                          alertTypes.SUCCESS,
                          "Watch Later list Updated!",
                          "💖"
                        );
                      } else {
                        showAlert(
                          alertTypes.ERROR,
                          "An error occurred while updating watch list!" +
                            res.data.msg,
                          "💔"
                        );
                      }
                    } else {
                      console.log("else");
                      user.watchLaterList.push(md.id);
                      console.log("updated wl", user);
                     const res = await updateUser(user);
                      console.log("res", res);
                      if (res.isUpdated) {
                        showAlert(
                          alertTypes.SUCCESS,
                          "Watch Later list Updated!",
                          "💖"
                        );
                      } else {
                        showAlert(
                          alertTypes.ERROR,
                          "An error occurred while updating watch list!" +
                            res.data.msg,
                          "💔"
                        );
                      }
                    }
                  }}
                >
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
