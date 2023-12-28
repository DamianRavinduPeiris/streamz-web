import { Link } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "lodash";
import { useState, useEffect } from "react";
import useTMDB from "../customHooks/useTMDB";
import { TextField } from "@mui/material";
import Alert from "../alerts/Alert";
import Login from "../pages/Login";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const [movieName, setMovieName] = useState<string>("");
  const [movieNames, setMovieNames] = useState<string[]>([]);
  const [movieIds, setMovieIds] = useState<number[]>([]);
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const debouncedSearchMovie = debounce((newInputValue: string) => {
    setMovieName(newInputValue);
    setSearchStatus(true);
  }, 2000);
  const movieData = useTMDB(import.meta.env.VITE_SEARCH_URL + "" + movieName);
  useEffect(() => {
    movieData.forEach((movie) => {
      setMovieNames((prevMovieNames) => [...prevMovieNames, movie.title]);
    });
    movieData.forEach((movie) => {
      setMovieIds((prevMovieIds) => [...prevMovieIds, movie.id]);
    });
  }, [searchStatus, movieData]);

  return (
    <div>
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/"}>
                  <a style={{ fontWeight: "bold" }}>Home</a>
                </Link>
              </li>
              <li>
                <Link to={"/explore"}>
                  <a style={{ fontWeight: "bold" }}>Explore</a>
                </Link>
              </li>
              <li>
                <a style={{ fontWeight: "bold" }}>Signup</a>
              </li>
              <li>
                <Link to={"/login"}>
                  <a style={{ fontWeight: "bold" }}>Login</a>
                </Link>
              </li>
              <li>
                <a style={{ fontWeight: "bold" }}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <img
            className="h-12 w-12 mr-5"
            src="https://www.svgrepo.com/show/156861/play-button.svg"
            alt=""
          ></img>
          <Link to={"/"}>
            <h1 className=" font-bold tracking-tight text-gray-900 sm:text-4xl">
              S T R E A M Z
            </h1>
          </Link>
        </div>

        <div className="navbar-end">
          {location.pathname === "/explore" ? (
            <Autocomplete
              className="border-2 border-gray-300 rounded-lg"
              disableClearable={true}
              style={{ width: "20vw", margin: "1rem" }}
              options={movieNames}
              onChange={(event, value) => {
                if (value) {
                  setMovieName(value);
                  setSearchStatus(false);
                  localStorage.setItem(
                    "movie",
                    JSON.stringify(movieData[movieNames.indexOf(value)])
                  );

                  window.location.href = "/stream";
                }
              }}
              onInputChange={(event, newInputValue) => {
                debouncedSearchMovie(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a movie!"
                  variant="outlined"
                />
              )}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
