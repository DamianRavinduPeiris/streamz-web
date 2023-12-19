import { GitHub } from "@mui/icons-material";
export default function Header() {
  return (
    <div className="mt-10">
      <section className="bg-gradient-to-r from-pink-500 to-orange-500 dark:from-pink-700 dark:to-orange-700 ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mt-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Your ultimate streaming companion.
          </h1>
          <p className="mt-10 font-thin text-lg text-white lg:text-xl sm:px-16 xl:px-48 ">
          Streamz is a free and open-source streaming platform that allows you to watch movies and TV shows for free. 🎉
          </p>
          <div className="mt-10 flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-xs rounded-full text-white px-4 py-1.5 mr-3">
              <GitHub />
            </span>{" "}
            <span className="text-sm font-medium">We're on Github!</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          </div>
        </div>
      </section>
    </div>
  );
}
