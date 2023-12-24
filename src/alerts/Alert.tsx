import React from "react";
interface propsType {
  type: string;
  message: string;
}

export default function Alert(props: propsType) {
  return (
    <div>
      <div role="alert" className={`alert ${props.type}`} style={{position:"relative",left : "50%",transform:"translateX(-50%)",margin:"2rem",width:"50vw"}} >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{props.message}</span>
      </div>
    </div>
  );
}
