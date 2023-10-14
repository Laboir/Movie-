import React from "react";
import Result from "./Result";
import Logo from "./Logo";
import Search from "./Search";

export default function Header({ movie }) {
  return (
    <header className="bg-violet-600 z-10  relative">
      <div className=" flex px-5 items-center justify-between  text-stone-200 h-14  ">
        <Logo />
        <Search />
        <Result movie={movie} />
      </div>
    </header>
  );
}
