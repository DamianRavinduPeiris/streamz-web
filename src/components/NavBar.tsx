import { Link } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "lodash";
import { useState, useEffect } from "react";
import useTMDB from "../customHooks/useTMDB";
import { TextField } from "@mui/material";
import Alert from "../alerts/Alert";
import Login from "../pages/Login";
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import AutoCompleteSearchBar from "./AutoCompleteSearchBar";


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
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="drawer-side " style={{ zIndex: "1" }}>
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <span className="badge badge-accent mt-6">
                  <h1>heheh</h1>
                </span>
                <li style={{ marginTop: "2rem" }}>
                  <a>Account.</a>
                </li>
                <li>
                  <a>Log Out.</a>
                </li>
                <li>
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Streamz.</a>
        </div>
        <div className="flex-none"></div>
      </div>
    </div>
  );
};

export default NavBar;
