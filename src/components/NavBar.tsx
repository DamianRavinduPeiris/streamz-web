import { useState, useEffect } from "react";
import {
  Explore,
  Home,
  WatchLater,
  Favorite,
  TvRounded,
  Movie,
} from "@mui/icons-material";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ProfilePic from "../components/ProfilePic";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const userFromStore = useSelector((state: any) => state.user);

  useEffect(() => {
    if (userFromStore != null) {
      setLoginStatus(true);
    }
  }, [userFromStore]);

  return (
    <div>
      {/* Toaster. */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="navbar bg-base-100">
        <div className="flex-none">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="drawer-side " style={{ zIndex: "1" }}>
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <div className="flex flex-col items-center justify-center">
                  {loginStatus ? (
                    <>
                      <ProfilePic />
                      <h1 className="font-tilt text-center badge badge-accent mt-6">
                        Welcome!
                      </h1>

                      <h1 className="font-tilt text-center badge badge-outline mt-6">
                        {userFromStore.name}
                      </h1>
                    </>
                  ) : (
                    <>
                      <img
                        src="https://www.svgrepo.com/show/156861/play-button.svg"
                        alt=""
                        className="h-20 w-20"
                      />
                      <h1 className="font-tilt text-center badge badge-accent mt-6">
                        Welcome!
                      </h1>
                    </>
                  )}
                </div>
                <li className="mt-8">
                  <Link to={"/"}>
                    <a className="font-tilt">
                      <Home style={{ margin: "0.2rem" }} /> Home.
                    </a>
                  </Link>
                </li>
                <li className="mt-5">
                  <Link
                    to={"/explore"}
                    onClick={() => {
                      Cookie.set("status", "movies");
                    }}
                  >
                    <a className="font-tilt">
                      <Movie style={{ margin: "0.2rem" }} /> Explore Movies.
                    </a>
                  </Link>
                </li>
                <li className="mt-5">
                  <Link
                    to={"/tvshows"}
                    onClick={() => {
                      Cookie.set("status", "tv");
                    }}
                  >
                    <a className="font-tilt">
                      <TvRounded style={{ margin: "0.2rem" }} /> Explore TV
                      shows.
                    </a>
                  </Link>
                </li>
                <li className="mt-5">
                  <Link to={"/favourites"}>
                    <a className="font-tilt">
                      <Favorite style={{ margin: "0.2rem" }} /> Favourites.
                    </a>
                  </Link>
                </li>
                <li className="mt-5">
                  <Link to={"/watchlater"}>
                    <a className="font-tilt">
                      <WatchLater style={{ margin: "0.2rem" }} /> Watch Later.
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Link to={"/"}>
            <a className="btn btn-ghost text-xl font-tilt">Streamz.</a>
          </Link>
        </div>
        <div className="flex-none"></div>
      </div>
    </div>
  );
};

export default NavBar;
