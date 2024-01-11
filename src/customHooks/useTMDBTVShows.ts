import axios from "axios";
import { useEffect, useState } from "react";
import { options } from "../util/options/Options";
import TVShowType from "../util/types/TVShowTypes";

export default function useTMDBTVShows(url: string): TVShowType[] {
  const [tvShowData, setTVShowData] = useState(<TVShowType[]>[]);
  async function fetchData() {
    let tvShowArray: TVShowType[] = [];
    let res = await axios.get(url, options);
    console.log(res);
    res.data.results.map((tvShow: TVShowType) => {
      let tvShowDataObject: TVShowType = {
        id: tvShow.id,
        name: tvShow.name,
        poster_path: tvShow.poster_path,
        overview: tvShow.overview,
        first_air_date: tvShow.first_air_date,
        vote_average: tvShow.vote_average,
        genre_ids: tvShow.genre_ids,
      };

      tvShowArray.push(tvShowDataObject);
    });
    setTimeout(() => setTVShowData(tvShowArray), 100);
  }
  useEffect(() => {
    fetchData();
  }, [url]);

  return tvShowData;
}
