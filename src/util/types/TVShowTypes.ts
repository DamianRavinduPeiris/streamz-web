export default interface TVShowType{
    id : number,
    name :string,
    poster_path : string,
    overview : string,
    first_air_date : string,
    vote_average: number;
    genre_ids: number[];
}