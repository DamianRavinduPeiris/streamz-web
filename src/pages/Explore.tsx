import React from "react";
import useTMDB from "../CustomHooks/useTMDB";
import { Skeleton } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';

export default function Explore() {
  interface movieType {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
  }
  const movieData: movieType[] = useTMDB(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  );
  console.log("movieData", movieData);
  return (
    <div>
      <LinearProgress color="secondary" />
      <div className="flex flex-center">
        <Skeleton className='m-10' variant="rounded" width={200} height={300} animation='wave' />

      </div>
    </div>
  );
}
