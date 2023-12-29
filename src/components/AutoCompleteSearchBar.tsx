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

export default function AutoCompleteSearchBar() {
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
        <Autocomplete
                    className="border-2 border-gray-300 rounded-lg"
                    disableClearable={true}
                    style={{ width: 300 }}
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
                        
                        
                      />
                    )}
                  />
      
    </div>
  )
}