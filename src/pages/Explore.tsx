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
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1");
  console.log("movieData", movieData);
  return (
    <div>
      
      {
        movieData.length<0 ?<LinearProgress color="secondary" /> :null
      }
      
      <div className="flex flex-center justify-center align-center flex-wrap m-5">
        {
           
            movieData.length>0 ?movieData.map((movie,elementNumber)=>{
              return (
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='m-10 rounded-lg' style={{width:"200px",height:"300px"}} key={elementNumber} />

              )


            }):Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} className='m-10' variant="rounded" width={200} height={300} animation='wave' />
            ))
          
        }
       
        

      </div>
    </div>
  );
}
