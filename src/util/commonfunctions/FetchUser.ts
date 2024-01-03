import axios from "axios";
import UserType from "../types/UserTypes";

export default async function fetchUser(email: string) {
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
