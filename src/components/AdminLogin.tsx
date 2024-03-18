import { useEffect, useState } from "react";

import showAlert from "../alerts/ShowAlert";
import alertTypes from "../util/types/AlertTypes";
import AuthType from "../util/types/AuthType";
import axios from "axios";
import { adminAuth } from "../headers/AdminHeader";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthType>({ email: "", password: "" });
  useEffect(() => {
    localStorage.setItem(
      "adminToken",
      JSON.stringify(import.meta.env.VITE_ADMIN_JWT)
    );
  }, []);
  return (
    <div>
      <section>
        <div className="px-4 py-20 mx-auto max-w-7xl">
          <span className="sr-only">Administrator.</span>

          <div className="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-lg md:bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5">
            <h1 className="font-tilt text-center text-3xl font-extrabold text-gray-900 sm:text-4xl m-10 ">
              Administrator Login.
            </h1>
            <form className="pb-1 space-y-4">
              <label className="block">
                <input
                  type="text"
                  placeholder="Email."
                  className="input ,t-2 input-ghost w-full max-w-xs border-2 border-gray-200"
                  onChange={(e) => {
                    setAuth({
                      ...auth,
                      email: e.target.value,
                    });
                  }}
                />
              </label>
              <label className="block">
                <input
                  type="password"
                  placeholder="Password."
                  className="input ,t-2 input-ghost w-full max-w-xs border-2 border-gray-200"
                  onChange={(e) => {
                    setAuth({
                      ...auth,
                      password: e.target.value,
                    });
                  }}
                />
              </label>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="block ml-2 text-xs font-medium text-gray-700 cursor-pointer">
                    Remember me.
                  </span>
                </label>
                <input
                  type="button"
                  className="btn btn-primary"
                  value="Login"
                  onClick={(e) => {
                    console.log(auth);
                    e.preventDefault();
                    axios
                      .post("http://localhost:3000/admin/login", auth, {
                        headers: adminAuth,
                      })
                      .then((res) => {
                        console.log(res.data);
                        if (res.data.isAuthorized === true) {
                          showAlert(
                            alertTypes.SUCCESS,
                            "Successfully logged in!",
                            "🍾"
                          );
                          setTimeout(() => {
                            navigate("/users");
                          }, 2000);
                        } else {
                          showAlert(alertTypes.ERROR, res.data.message, "🤦‍♂️");
                        }
                      })
                      .catch((er) => {
                        showAlert(alertTypes.ERROR, er.message, "😪");
                      });
                  }}
                />
              </div>
            </form>
          </div>
          <p className="mb-4 space-y-2 text-sm text-left text-gray-600 sm:text-center sm:space-y-0">
            <a
              href="#"
              className="w-full btn btn-sm btn-link sm:w-auto"
              onClick={() => {
                showAlert(
                  alertTypes.SUCCESS,
                  "Contact the System Administrator.",
                  "🔌"
                );
              }}
            >
              Forgot password!
            </a>
            <a
              href="#"
              className="w-full btn btn-sm btn-link sm:w-auto"
              onClick={() => {
                showAlert(
                  alertTypes.SUCCESS,
                  "Contact the System Administrator.",
                  "🔌"
                );
              }}
            >
              Create an account.
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
