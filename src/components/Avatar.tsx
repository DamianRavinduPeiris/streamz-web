import React from "react";

export default function Avatar() {
  let user = JSON.parse(localStorage.getItem("user") as string);
  return (
    <div>
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user.photoURL} />
        </div>
      </div>
    </div>
  );
}
