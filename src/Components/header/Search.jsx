import { useContext, useRef } from "react";
import { Context_Api } from "../Context/Context";
import useKey from "../Main/Components/useKey";

export default function Search() {
  const { search, setSearch } = useContext(Context_Api);
  const InputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === InputEl.current) return;
    InputEl.current.focus();
    setSearch("");
  });

  // useEffect(() => {
  //   const callBack = function (e) {
  //     console.log(e);
  //     if (e.key === "Enter") {
  //       if (document.activeElement === InputEl.current) return;
  //       InputEl.current.focus();
  //       setSearch("");
  //     }
  //   };

  //   document.addEventListener("keydown", callBack);

  //   return function () {
  //     document.addEventListener("keydown", callBack);
  //   };
  // }, [setSearch]);

  return (
    <input
      className=" bg-violet-500 outline-none h-8  w-64 text-stone-200  font-semibold px-4 text-lg rounded-md"
      type="text"
      value={search}
      placeholder="Search..."
      onChange={(e) => setSearch(e.target.value)}
      ref={InputEl}
    />
  );
}
