import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NotLoggedIn from "./NotLoggedIn";
import { fetchUser } from "../util/commonfunctions/UserManager";
import UserType from "../util/types/UserTypes";
import axios from "axios";
import { options } from "../util/options/Options";
import movieType from "../util/types/MovieTypes";
import { JackInTheBox } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const userFromStore = useSelector((state: any) => state.user);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [md, setMD] = useState<movieType[]>([]);
  const navigate = useNavigate();
  async function getUser() {
    let userData: UserType = await fetchUser(userFromStore.email);
    console.log("userData", userData.favouriteList);
    setUser(userData);
  }
  async function fetchMovies() {
    let movieData: Promise<any>[] = (user?.favouriteList ?? []).map(
      async (mid: number) => {
        try {
          return await axios.get(
            import.meta.env.VITE_SEARCH_BY_ID_URL + mid,
            options
          );
        } catch (error: any) {
          console.log(
            "An error occurred while fetching favourites :",
            error.message
          );
        }
      }
    );
    let resolvedData = await Promise.all(movieData || []);
    let finalData = resolvedData.map((movie) => {
      return movie?.data;
    });
    console.log("finalData", finalData);
    setMD(finalData);
  }
  useEffect(() => {
    if (userFromStore != null) {
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
            Favourites.
          </motion.div>
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
                      onClick={(e) => {
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
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
}
