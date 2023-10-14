import React, { useContext, useEffect } from "react";
import { Context_Api } from "../../Context/Context";
const key = "5105a7d0";
function FetchData() {
  return (
    <div>
      <FetchDataAPi />
    </div>
  );
}

function FetchDataAPi() {
  const { setMovie, setError, setIsLoader, search } = useContext(Context_Api);

  useEffect(() => {
    const cleanUp = new AbortController();

    async function fetchMovieData() {
      try {
        setError("");
        setIsLoader(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${search}`,
          { signal: cleanUp.signal }
        );
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovie(data.Search);
        setIsLoader(false);
      } catch (error) {
        console.log(error.message);

        if (error.message === "Abort") {
          setError(error.message);
        }

        if (error.message === "Failed to fetch") setError(error.message);
      } finally {
      }

      if (search.length < 3) {
        setMovie([]);
        setError("");
        return;
      }
    }

    fetchMovieData();
    return function () {
      cleanUp.abort();
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
}

export default FetchData;
