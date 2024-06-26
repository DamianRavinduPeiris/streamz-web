import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NotLoggedIn from "./NotLoggedIn";
import { fetchUser } from "../util/commonfunctions/UserManager";
import movieType from "../util/types/MovieTypes";
import UserType from "../util/types/UserTypes";
import axios from "axios";
import { options } from "../util/options/Options";
import { JackInTheBox } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import Empty from "./Empty";

export default function WatchLater() {
  const userFromStore = useSelector((state: any) => state.user);
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [md, setMD] = useState<movieType[]>([]);
  const navigate = useNavigate();
  async function getUser() {
    const userData = await fetchUser(userFromStore.email);
    setUser(userData);
  }

  async function fetchMovies() {
    if (user) {
      const movieData: Promise<any>[] = user.watchLaterList.map(async (mID) => {
        try {
          return axios.get(
            import.meta.env.VITE_SEARCH_BY_ID_URL + mID,
            options
          );
        } catch (error: any) {
          console.log(
            "An error occurred while fetching favourites :",
            error.message
          );
        }
      });
      const resolvedData = await Promise.all(movieData);
      const finalData = resolvedData.map((movie) => {
        return movie.data;
      });
      setMD(finalData);
    }
  }

  useEffect(() => {
    if (userFromStore != null && user === null) {
      setLoginStatus(true);
      getUser();
    }
  }, []);
  useEffect(() => {
    if (user != null) {
      fetchMovies();
    }
  }, [user]);
  return (
    <div>
      {loginStatus ? (
        <>
          <motion.div
            className="text-center text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black"
            initial={{ scale: 0 }}
            animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
          >
            Watch Later.
          </motion.div>
          {md.length === 0 ? (
            <Empty
              topic="Oh Snap!"
              msg="You haven't added any movies to your watch later list yet."
            ></Empty>
          ) : (
            <div className="flex flex-center justify-center align-center flex-wrap m-5">
              {md.map((movie, elementNumber) => {
                return (
                  <JackInTheBox>
                    <div className="flex flex-col justify-center items-center">
                      <motion.img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="m-10 rounded-lg shadow-2xl "
                        style={{ width: "200px", height: "300px" }}
                        key={elementNumber}
                        initial={{ scale: 0 }}
                        animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => {
                          localStorage.setItem("movie", JSON.stringify(movie));
                          console.log(movie.id);
                          navigate("/stream");
                        }}
                      />

                      <h1 className="font-tilt" style={{ fontSize: "0.8rem" }}>
                        {movie.title}
                      </h1>
                      <h1
                        className="font-tilt mt-2"
                        style={{ fontSize: "0.8rem" }}
                      >
                        ⭐{movie.vote_average}
                      </h1>
                    </div>
                  </JackInTheBox>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
}
