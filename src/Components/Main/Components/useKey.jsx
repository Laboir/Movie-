import { useEffect } from "react";

export default function useKey(key, action) {
  useEffect(() => {
    function callBack(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action?.();
      }
    }
    document.addEventListener("keydown", callBack);
    return () => document.addEventListener("keydown", callBack);
  }, [action]);
}
