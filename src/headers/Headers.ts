export const auth = {
  Authorization:
    "Bearer " + JSON.parse(localStorage.getItem("token") as string),
};
