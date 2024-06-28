import { useEffect, useState } from "react";
import useTMDBMovies from "../customHooks/useTMDBMovies";
import { Skeleton } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { JackInTheBox } from "react-awesome-reveal";
import movieType from "../util/types/MovieTypes";

import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import NotLoggedIn from "./NotLoggedIn";
import { useSelector } from "react-redux";

export default function Explore() {
  const [md, setMD] = useState<movieType[]>([]);
  const [page, setPageNumber] = useState<number>(1);
  const [refetch, setRefetchStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const userFromStore = useSelector((state: any) => state.user);
  const movieData: movieType[] = useTMDBMovies(
    import.meta.env.VITE_POPULAR_MOVIES_URL + page
  );

  console.log("rendering");
  console.log("useEffect", userFromStore);
  useEffect(() => {
    if (userFromStore != null) {
      setLoginStatus(true);
    }

    setMD(movieData);
    setRefetchStatus(false);

    console.log("movieData", movieData);
  }, [movieData, page]);

  return (
    <div>
      {loginStatus ? (
        <>
          {md.length <= 0 ? <LinearProgress color="info" /> : null}
          <BreadCrumb name="Movies." movieName={null} />

          <div className="flex flex-center justify-center align-center flex-wrap m-5">
            {md.length > 0
              ? movieData.map((movie, elementNumber) => {
                  return (
                    <JackInTheBox>
                      <div className="flex flex-col justify-center items-center">
                        <Link to="/stream">
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
                              console.log(e);
                              localStorage.setItem(
                                "movie",
                                JSON.stringify(movie)
                              );
                              console.log(movie.id);
                            }}
                          />
                        </Link>
                        <h1
                          className="font-tilt"
                          style={{ fontSize: "0.8rem" }}
                        >
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
                })
              : Array.from({ length: 20 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="m-10"
                    variant="rounded"
                    width={200}
                    height={300}
                    animation="wave"
                  />
                ))}
          </div>
          <JackInTheBox>
            {refetch ? (
              <>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-tilt" style={{ fontSize: "2rem" }}>
                    Fetching...
                  </h1>
                  <span className="loading loading-spinner loading-lg text-black m-5"></span>
                </div>
              </>
            ) : null}
            <div className="flex flex-center justify-center align-center">
              <Stack spacing={2}>
                <Pagination
                  count={100}
                  onChange={(event, page) => {
                    console.log(event);
                    setPageNumber(page);
                    setMD([]);
                    setRefetchStatus(true);
                  }}
                />
              </Stack>
            </div>
          </JackInTheBox>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
}
