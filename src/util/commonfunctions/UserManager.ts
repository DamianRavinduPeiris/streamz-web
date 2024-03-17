import axios from "axios";
import UserType from "../types/UserTypes";
import { auth } from "../../headers/Headers";
import { adminAuth } from "../../headers/AdminHeader";

export async function fetchUser(email: string) {
  console.log("fetching ", email);
  try {
    let userData = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/search?email=` + email
    );
    console.log("result ", userData.data);
    return userData.data.data[0];
  } catch (error) {
    console.log("An Error occurred while fetching the user :", error);
  }
  return null;
}
export async function updateUser(user: UserType) {
  try {
    let res = await axios.put(`${import.meta.env.VITE_BASE_URL}/user/update`, user, {
      headers: adminAuth,
    });

    return res.data;
  } catch (error) {
    console.log("An Error occurred while updating the user :", error);
  }
}
export async function deleteUser(email: string) {
  try {
    let res = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/user/delete?email=` + email,
      {
        headers: adminAuth,
      }
    );

    return res.data;
  } catch (error) {
    console.log("An Error occurred while deleting the user :", error);
  }
}

export async function getAllusers() {
  try {
    let res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getAllL`, {
      headers: adminAuth,
    });
    return res.data.data;
  } catch (error: any) {
    console.log("An Error occurred while fetching users :", error.message);
  }
}
