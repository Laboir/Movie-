/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { useState } from "react";
import { createContext } from "react";


export const Context_Api = createContext();

function Context({ children }) {
  const [movie, setMovie] = useState([]);
  const [watchdata, setWatchdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [search, setSearch] = useState("superman");
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <Context_Api.Provider
        value={{
          movie,
          setMovie,
          search,
          setSearch,
          isLoading,
          setIsLoading,
          isError,
          setError,
          isLoader,
          setIsLoader,
          selectedId,
          setSelectedId,
          watchdata,
          setWatchdata,
        }}
      >
        {children}
      </Context_Api.Provider>
    </div>
  );
}

export default Context;
