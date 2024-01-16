export const adminAuth = {
    Authorization:
      "Bearer " + JSON.parse(localStorage.getItem("adminToken") as string),
  };
  