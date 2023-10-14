import React, { useContext, useEffect } from "react";
import { Context_Api } from "../../Context/Context";

export default function Movielist({ movie }) {
  return (
    <div>
      <UlList movie={movie} />
    </div>
  );
}

// ! Parent
function UlList({ movie }) {
  return (
    <ul className="mt-5  flex flex-col gap-5">
      {movie?.map((item) => {
        return (
          <>
            <RenderListItems item={item} key={item.imdbID} />
            <hr className="bg-slate-500 h-[2px] border-none" />
          </>
        );
      })}
    </ul>
  );
}

// ! Child
function RenderListItems({ item }) {
  const { imdbID, Poster: poster, Title: title, Year: year } = item;

  const { setSelectedId } = useContext(Context_Api);

  return (
    <li
      className="flex  mx-3 rounded-lg py-4 px-5 ml-5 items-center gap-4  hover:cursor-pointer hover:bg-slate-700 hover:scale-110  transition-all"
      onClick={() => setSelectedId(imdbID)}
    >
      <div className="h-[70px] aspect-[2/3]  ">
        <img className="w-full h-full object-cover" src={poster} alt={title} />
      </div>

      <div className="flex gap-2 flex-col">
        <h2 className=" text-white  font-medium">{title}</h2>

        <h2 className="text-white">
          <span>📅</span> {year}
        </h2>
      </div>
    </li>
  );
}
