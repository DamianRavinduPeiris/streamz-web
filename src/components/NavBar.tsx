import { useState } from "react";
import { Explore,Home } from "@mui/icons-material";
import { Link } from "react-router-dom";



const NavBar = () => {
  const [username, setUsername] = useState<string>("Welcome!");
  return (
    <div>
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
                <img
                  src="https://www.svgrepo.com/show/156861/play-button.svg"
                  alt=""
                  className="h-20 w-20"
                />
                <span className="badge badge-accent mt-6">
                  <h1 className="font-tilt text-center">{username}</h1>
                </span>
                </div>
                <li className="mt-8">
                  <Link to={"/"}>
                  <a className="font-tilt"><Home/>Home.</a>
                  </Link>
                </li>
                <li className="mt-5">
                  <Link to={"/explore"}>
                  <a className="font-tilt"><Explore/> Explore.</a>
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
