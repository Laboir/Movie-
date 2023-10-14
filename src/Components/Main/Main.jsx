import React, { useState } from "react";

import { useContext } from "react";
import { Context_Api } from "../Context/Context";
import FetchData from "./Components/FetchData";
import Movielist from "./Components/Renderlist";
import MovieDetail from "./Components/MovieDetail";

export default function Main() {
  const { isError, loader, search, selectedId } = useContext(Context_Api);

  return (
    <main className="h-[93.9vh] bg-slate-700 flex items-center justify-center ">
      {/* // !FetchData */}
      <FetchData />

      {/* //* Box */}
      <Box>
        {isError && <ErrorMessage />}
        {!loader && !isError && <RenderList />}
        {loader && <Loader />}

        {search === "" ? (
          <p className="text-xl text-white text-center mt-[8rem]">
            Search Your Favourite Movie...
          </p>
        ) : null}
      </Box>

      <Box>
        {selectedId ? (
          <MovieDetail />
        ) : (
          <>
            <WatchMovieFirst />
            <WatchedList  />
          </>
        )}
      </Box>
    </main>
  );
}

// ! Box-Cont
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-[87vh] bg-slate-600 aspect-[2/4]  overflow-x-auto relative rounded-xl mx-6 px-2">
      {/* //! Button */}
      <button
        className="text-black bg-white leading-1 absolute top-[10px] right-6 p-3 w-5 h-5 rounded-full font-semibold flex justify-center items-center z-10 "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "-" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

// > REnderList
function RenderList() {
  const { movie } = useContext(Context_Api);

  return (
    <>
      <Movielist movie={movie} />
    </>
  );
}

// !Loader
function Loader() {
  return <p className="text-center text-2xl text-yellow-50">Loading...</p>;
}

// !Error
function ErrorMessage() {
  const { isError } = useContext(Context_Api);

  return <p className="m-[100px]  text-yellow-50 text-xl">{isError}</p>;
}

// ! MovieDetails

//  > WAtchList Ul-list "Parent"
function WatchedList({ average }) {
  const { watchdata } = useContext(Context_Api);

  return (
    <ul>
      {watchdata?.map((items, i) => (
        <WatchedListItems items={items} key={i} />
      ))}
    </ul>
  );
}

// ! WatchList- ListItems "Child"
function WatchedListItems({ items }) {
  const {
    poster,
    Title: title,
    Year: year,
    imdbRating: rating,
    Runtime: watch,
  } = items;

  return (
    <>
      <li className="flex mt-7 ml-5 items-center gap-4 relative">
        {/* //!1 */}
        <div className="h-[70px] aspect-[2/3]  ">
          <img
            className="w-full h-full object-cover"
            src={poster}
            alt={title}
          />
        </div>
        {/* //!2 */}
        <div className="flex flex-col">
          <h1 className="text-white font-medium">{title}</h1>

          <div className="flex gap-3">
            <p className="text-white">
              {" "}
              <span>⭐</span> {rating}
            </p>
            <p className="text-white">{year}</p>
            <p className="text-white">
              <span>⌛</span> {watch}
            </p>
          </div>
        </div>

        <button className=" flex items-center justify-center bg-red-600 p-1 rounded-full w-5 h-5 outline-none border-0  scale-90  absolute right-10">
          X
        </button>
      </li>

      <hr className="bg-slate-500 h-[2px] border-none mt-5" />
    </>
  );
}

// ! Watch-Header
function WatchMovieFirst() {
  const { watchdata } = useContext(Context_Api);
  return (
    <div className="flex flex-col rounded-lg  p-5 bg-slate-500 gap-2">
      <h1 className="text-white text-lg font-medium">Movies You Watch</h1>

      <article className="flex gap-4">
        <p className="text-white ">
          <span>🎦</span> {watchdata.length} Movies
        </p>
        <p className="text-white ">
          <span>🌟</span> 8.65
        </p>
        <p className="text-white ">
          <span>⭐</span> 9
        </p>
        <p className="text-white ">
          <span>⌛</span> 147 min
        </p>
      </article>
    </div>
  );
}
