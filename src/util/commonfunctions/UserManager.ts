import axios from "axios";
import UserType from "../types/UserTypes";
import { auth } from "../../headers/Headers";

export async function fetchUser(email: string) {
  console.log("fetching ", email);
  try {
    let userData = await axios.get(
      "http://localhost:3000/user/search?email=" + email
    );
    console.log("result ", userData.data);
    return userData.data.data[0];
  } catch (error) {
    console.log("An Error occurred while fetching the user :", error);
  }
  return null;
}
export async function updateUser(user: UserType) {
  console.log("token ", auth);
  try {
    let res = await axios.put("http://localhost:3000/user/update", user, {headers: auth,});
    
    return res.data;
  } catch (error) {
    console.log("An Error occurred while updating the user :", error);
  }
}

