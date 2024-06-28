import { Link } from "react-router-dom";

interface propTypes {
  name: string;
  movieName: string | null | undefined;
}

export default function BreadCrumb({ name, movieName }: propTypes) {
  return (
    <div>
      <div className="text-md breadcrumbs m-5 font-tilt">
        <ul>
          <li>
            {movieName ? (
              <Link to={"/explore"}>
                <a>Explore.</a>
              </Link>
            ) : (
              <Link to={"/"}>
                <a>Home.</a>
              </Link>
            )}
          </li>
          <li>{movieName != null ? <li>Streaming.</li> : <>{name}</>}</li>
          {movieName != null ? <li>{movieName}</li> : null}
        </ul>
      </div>
    </div>
  );
}
