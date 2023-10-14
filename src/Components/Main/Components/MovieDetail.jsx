import React, { useContext, useEffect, useState } from "react";
import { Context_Api } from "../../Context/Context";
import useKey from "./useKey";
const key = "5105a7d0";
export default function MovieDetail() {
  return (
    <div>
      <Moviedetail />
    </div>
  );
}

function Loader() {
  return <p className="mt-10 text-2xl text-white text-center"> Loading... </p>;
}

function Moviedetail() {
  // > Custom Hook
  const { movie, isLoading, setMovie } = useEffectCompo();
  const { selectedId, setWatchdata, setSelectedId } = useContext(Context_Api);

  const {
    Poster: poster,
    Title: title,
    Actors,
    Year,
    imdbRating,
    Plot,
    Director,
    Genre,
    Released,
    Runtime,
  } = movie;

  // !Add;
  function addWatchList(movie) {
    setWatchdata((watch) => [...watch, movie]);
    setSelectedId(null);
  }

  function handleAdd() {
    const newAddMovie = {
      imdbID: selectedId,
      title,
      Year,
      poster,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ").at(0)),
    };

    addWatchList(newAddMovie);
  }

  useKey("Escape", setSelectedId);

  // useEffect(() => {
  //   document.addEventListener("keydown", function (e) {
  //     if (e.code === "Escape") {
  //       setSelectedId(null);
  //     }
  //   });
  // }, []);

  ChangeTitle(title);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <DetailHeader
            poster={poster}
            title={title}
            Released={Released}
            Runtime={Runtime}
            Genre={Genre}
            imdbRating={imdbRating}
            setMovie={setMovie}
          />

          <MovieDetailBody
            plot={Plot}
            actors={Actors}
            director={Director}
            handleAdd={handleAdd}
          />
        </div>
      )}
    </>
  );
}

// ! Change-Title
function ChangeTitle(title) {
  useEffect(() => {
    document.title = `Movie | ${title}`;
    return function () {
      document.title = "ApniMovie";
    };
  }, [title]);
}

// ! Render Detail
function useEffectCompo() {
  const { selectedId } = useContext(Context_Api);
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
    
      setIsLoading(false);
    }
    fetchMovieDetails();
  }, [selectedId]);

  return { movie, isLoading, setMovie };
}

// ! FetchMovie Detils
function DetailHeader({ poster, title, Released, Genre, Runtime, imdbRating }) {
  return (
    <header className="flex h-fit gap-7 bg-slate-500  text-white">
      <ButtonImg poster={poster} title={title} />

      <Article
        title={title}
        Released={Released}
        Runtime={Runtime}
        Genre={Genre}
        imdbRating={imdbRating}
      />
    </header>
  );
}

// *Header Items-1
function ButtonImg({ poster, title }) {
  const { setSelectedId } = useContext(Context_Api);

  function handlerReset() {
    setSelectedId(null);
  }
  return (
    <>
      <button
        className=" flex justify-center items-center rounded-full absolute left-2 top-2 bg-white text-black p-3 h-7 w-7"
        onClick={() => handlerReset()}
      >
        &larr;
      </button>

      <img
        className="h-[240px] aspect-[2/3] object-cover "
        src={poster}
        alt={title}
      />
    </>
  );
}

//!  Article
// *Header Items-2
//
function Article({ title, Released, Runtime, Genre, imdbRating }) {
  return (
    <article className="flex flex-col gap-2 mt-6 mr-1">
      <p className="text-lg font-bold">{title} </p>

      <div className="flex gap-1 items-center justify-start   ">
        <p>{Released} &bull; </p>
        <p>{Runtime}</p>
      </div>
      <p>{Genre}</p>
      <p>
        <span>🌟</span> {imdbRating} IMDb ratings
      </p>
    </article>
  );
}

//* Movie_DetailBody
function MovieDetailBody({ plot, actors, director, handleAdd }) {
  return (
    <section className=" flex flex-col gap-3 px-8 mt-8">
      <p className="text-white text-justify ">
        <span className=" text-sky-300"> Summery </span>: <em> {plot}</em>
      </p>

      <p className="text-white text-justify">
        <span className="text-sky-300"> Actors </span> : {actors}
      </p>
      <p className="text-white text-justify">
        <span className="text-sky-300"> Director </span> : {director}
      </p>

      <AddButton handleAdd={handleAdd} />
    </section>
  );
}

//* Add-Button
function AddButton({ handleAdd }) {
  return (
    <>
      <button
        className=" w-25 rounded-full mt-5 text-white 
      p-1 text-xl bg-violet-600"
        onClick={handleAdd}
      >
        +Add
      </button>
    </>
  );
}
