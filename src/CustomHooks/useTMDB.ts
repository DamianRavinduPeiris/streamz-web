import axios from "axios";
import { useEffect, useState } from "react";

interface movieType {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average : number
}

export default function useTMDB(url: string): movieType[] {
  const [movieData, setMovieData] = useState(<movieType[]>[]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + import.meta.env.VITE_TMDB_AUTH_TOKEN,
    },
  };
  async function fetchData() {
    let movieArray: movieType[] = [];
    let res = await axios.get(url, options);
    res.data.results.map((movie: movieType) => {
      let movieDataObject: movieType = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average 
      };

      movieArray.push(movieDataObject);
    });
    setTimeout(() => setMovieData(movieArray), 100);
  }
  useEffect(() => {
    fetchData();
  }, [url]);

  return movieData;
}
