import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { JackInTheBox } from "react-awesome-reveal";
import TVShowType from "../util/types/TVShowTypes";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import NotLoggedIn from "./NotLoggedIn";
import { useSelector } from "react-redux";
import useTMDBTVShows from "../customHooks/useTMDBTVShows";

export default function TVShows() {
  const [td, setTD] = useState<TVShowType[]>([]);
  const [page, setPageNumber] = useState<number>(1);
  const [refetch, setRefetchStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const userFromStore = useSelector((state: any) => state.user);
  const tvShowData: TVShowType[] = useTMDBTVShows(
    import.meta.env.VITE_POPULAR_TV_SHOWS_URL + page
  );
  console.log("rendering");
  console.log("useEffect", userFromStore);
  useEffect(() => {
    if (userFromStore != null) {
      setLoginStatus(true);
    }

    setTD(tvShowData);
    setRefetchStatus(false);
  }, [tvShowData, page]);

  return (
    <div>
      {loginStatus ? (
        <>
          {td.length <= 0 ? <LinearProgress color="info" /> : null}
          <BreadCrumb name="TV Shows." movieName={null} />

          <div className="flex flex-center justify-center align-center flex-wrap m-5">
            {td.length > 0
              ? tvShowData.map((tvShow, elementNumber) => {
                  return (
                    <JackInTheBox>
                      <div className="flex flex-col justify-center items-center">
                        <Link to="/tvStream">
                          <motion.img
                            src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                            alt={tvShow.name}
                            className="m-10 rounded-lg shadow-2xl "
                            style={{ width: "200px", height: "300px" }}
                            key={elementNumber}
                            initial={{ scale: 0 }}
                            animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => {
                              localStorage.setItem(
                                "tvShow",
                                JSON.stringify(tvShow)
                              );
                              console.log(tvShow.id);
                            }}
                          />
                        </Link>
                        <h1
                          className="font-tilt"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {tvShow.name}
                        </h1>
                        <h1
                          className="font-tilt mt-2"
                          style={{ fontSize: "0.8rem" }}
                        >
                          ⭐{tvShow.vote_average}
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
                    setTD([]);
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
