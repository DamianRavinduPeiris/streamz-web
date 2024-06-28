import { useEffect, useState } from "react";
import UserType from "../util/types/UserTypes";
import { updateUser } from "../util/commonfunctions/UserManager";
import showAlert from "../alerts/ShowAlert";
import alertTypes from "../util/types/AlertTypes";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const [user, setUser] = useState<UserType>();
  const [name, setName] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    setUser(
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null
    );
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-center">User Details</h1>
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-base-100 w-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={user?.profilePic}
              alt="User."
              className="rounded-lg w-40 h-40"
            />
          </figure>
          <div className="card-body items-center text-center">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder={user?.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Profile Pic."
                onChange={(e) => {
                  setProfilePic(e.target.value);
                }}
              />
            </label>
            <div className="card-actions mt-3">
              <button
                className="btn btn-primary"
                onClick={() => {
                  const ud: UserType = {
                    name: name,
                    email: user?.email || "",
                    profilePic:
                      profilePic ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWKcuEQaieI_OrYZoI5b8u2vxu9KZkthFPdA&s",
                    favouriteList: user?.favouriteList || [],
                    historyList: user?.historyList || [],
                    watchLaterList: user?.watchLaterList || [],
                  };
                  updateUser(ud)
                    .then((res: any) => {
                      if (res.isUpdated) {
                        showAlert(
                          alertTypes.SUCCESS,
                          "User Updated Successfully",
                          "🎊"
                        );
                      } else {
                        showAlert(alertTypes.ERROR, "User not Updated", "🥴");
                      }
                    })
                    .catch((error: any) => {
                      showAlert(
                        alertTypes.ERROR,
                        "An error occurred while updating user " + error,
                        "😢"
                      );
                      console.log(error);
                    });
                }}
              >
                Update
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back.
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
