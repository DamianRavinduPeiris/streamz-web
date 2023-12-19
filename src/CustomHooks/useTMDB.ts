import axios from "axios";
import { useEffect, useState } from "react";

interface movieType {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export default function useTMDB(url: string): movieType[] {
  const [movieData, setMovieData] = useState(<movieType[]>[]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer  " + import.meta.env.TMDB_AUTH_TOKEN,
    },
  };
  useEffect(() => {
    axios
      .get(url, options)
      .then((res) => {
        let movies: movieType[] = [];
        res.data.results.map((movie: movieType) => {
          const md: movieType = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
            release_date: movie.release_date,
          };
          movies.push(md);
        });
        setTimeout(()=>{
          setMovieData(movies);
        },100)
        
      })
      .catch((er) => {
        console.log("error", er);
      });
  }, [url]);
  
  return movieData;
}
