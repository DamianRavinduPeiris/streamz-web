import axios from "axios";
import { useEffect, useState } from "react";
import { options } from "../util/options/Options";

interface movieType {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export default function useTMDB(url: string): movieType[] {
  const [movieData, setMovieData] = useState(<movieType[]>[]);
  async function fetchData() {
    let movieArray: movieType[] = [];
    let res = await axios.get(url, options);
    console.log(res);
    res.data.results.map((movie: movieType) => {
      let movieDataObject: movieType = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        genre_ids: movie.genre_ids,
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
