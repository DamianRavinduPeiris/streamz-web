import React, { useEffect, useState } from "react";
import useTMDB from "../CustomHooks/useTMDB";
import { Skeleton } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { JackInTheBox } from "react-awesome-reveal";

export default function Explore() {
  interface movieType {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
  }
  const [pageNumber, setPageNumeber] = useState(0);
  const [md, setMD] = useState<movieType[]>([]);

  let movieData: movieType[] = useTMDB(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  );

  console.log("movieData", movieData);
  return (
    <div>
      {movieData.length <= 0 ? <LinearProgress color="secondary" /> : null}

      <div className="flex flex-center justify-center align-center flex-wrap m-5">
        {movieData.length > 0
          ? movieData.map((movie, elementNumber) => {
              return (
                <JackInTheBox>
                  <motion.img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="m-10 rounded-lg"
                    style={{ width: "200px", height: "300px" }}
                    key={elementNumber}
                    initial={{ scale: 0 }}
                    animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 }}
                  />
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
      <div className="flex flex-center justify-center align-center">
        <Stack spacing={2}>
          <Pagination
            count={10}
            onChange={(event, page) => {
              setPageNumeber(page);
            }}
          />
        </Stack>
      </div>
    </div>
  );
}
