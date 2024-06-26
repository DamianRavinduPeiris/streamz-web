import { useEffect, useState } from "react";
import { getAllusers } from "../util/commonfunctions/UserManager";
import UserType from "../util/types/UserTypes";
import { deleteUser } from "../util/commonfunctions/UserManager";
import showAlert from "../alerts/ShowAlert";
import { motion } from "framer-motion";
import alertTypes from "../util/types/AlertTypes";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";

export default function UserTable() {
  const [userData, setUserData] = useState<UserType[]>([]);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllusers()
      .then((res) => {
        setUserData(res);
      })
      .catch((er) => {
        console.log("An error occurred: " + er);
      });
  }, [userData]);

  return (
    <motion.div
      className="mt-10 relative"
      initial={{ scale: 0 }}
      animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{ delay: 0.1 }}
    >
      {updateStatus ? (
        <UserDetails />
      ) : (
        <>
          {userData.length === 0 ? (
            <div
              className="hero min-h-screen"
              style={{
                backgroundImage:
                  "url(https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/85d392b3-b53c-4682-89c2-d756c6d3ff7c/LK-en-20231225-popsignuptwoweeks-perspective_alpha_website_small.jpg)",
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">AW SNAP!</h1>
                  <p className="mb-5">No Users registered yet.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Back to home.
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="font-tilt text-2xl">Profile Pic</th>
                    <th className="font-tilt text-2xl">Name</th>
                    <th className="font-tilt text-2xl">Email</th>
                    <th className="font-tilt text-2xl">Update</th>
                    <th className="font-tilt text-2xl">Delete</th>
                    <th className="font-tilt text-2xl hidden md:table-cell">
                      Favourites
                    </th>
                    <th className="font-tilt text-2xl hidden md:table-cell">
                      Watch Later
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user: UserType) => (
                    <tr key={user.email}>
                      <td>
                        <div className="avatar">
                          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user.profilePic} alt="Profile" />
                          </div>
                        </div>
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-outline"
                          onClick={() => {
                            setUpdateStatus(true);
                            localStorage.setItem("user", JSON.stringify(user));
                          }}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-error"
                          onClick={() => {
                            deleteUser(user.email)
                              .then((res) => {
                                if (res.isDeleted) {
                                  showAlert(
                                    alertTypes.SUCCESS,
                                    "User Deleted Successfully",
                                    "🎊"
                                  );
                                } else {
                                  showAlert(
                                    alertTypes.ERROR,
                                    "User not found!",
                                    "🥴"
                                  );
                                }
                              })
                              .catch((er) => {
                                showAlert(
                                  alertTypes.ERROR,
                                  "An error occurred while deleting user " + er,
                                  "😢"
                                );
                              });
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      <td className="hidden md:table-cell">
                        {user.favouriteList.length === 0
                          ? "Empty"
                          : user.favouriteList.join(", ")}
                      </td>
                      <td className="hidden md:table-cell">
                        {user.watchLaterList.length === 0
                          ? "Empty"
                          : user.watchLaterList.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
