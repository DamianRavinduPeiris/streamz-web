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
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTg5NzZiMzBjOGQ0OTQ5NDRhNzdiMTMyZWE1ZDgyYSIsInN1YiI6IjY0ZDA4ZTE0ODUwOTBmMDEyNWJkNGZmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fRYvaT5dx90rtf3fODWbWSD76n8dbs9HWovJ8xEvu8M" 
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
