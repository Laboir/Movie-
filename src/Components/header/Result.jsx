import { useContext } from "react";
import { Context_Api } from "../Context/Context";
export default function Result() {
  const { movie } = useContext(Context_Api);
  return (
    <div>
      <p className="uppercase text-lg font-semibold">
        found <strong> {movie.length} </strong>result
      </p>
    </div>
  );
}
