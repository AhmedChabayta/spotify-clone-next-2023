import { useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(
  callback: () => void
): React.RefObject<T> => {
  const ref = useRef<T>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return ref;
};

export default useClickOutside;
