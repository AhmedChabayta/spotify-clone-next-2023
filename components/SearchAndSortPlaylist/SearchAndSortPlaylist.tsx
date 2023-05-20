import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useClickOutside } from "@src/hooks";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const SearchAndSortPlaylist = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const buttonRef = useClickOutside<HTMLButtonElement>(() => {
    setShowSearch(false);
  });

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="group relative flex rounded-md bg-[rgb(53,47,75)]">
      <button
        className={`${
          showSearch
            ? "flex"
            : "absolute right-0 top-1/2 translate-y-[-50%] group-hover:bg-[rgb(53_47_75)]"
        }   rounded-full p-2 `}
        ref={buttonRef}
      >
        <MagnifyingGlassIcon
          onClick={() => setShowSearch(true)}
          className="w-5 text-dimmed"
        />
      </button>
      <motion.div
        animate={{
          backgroundColor: showSearch ? "rgb(53,47,75)" : "red",
          x: showSearch ? 0 : 100,
          opacity: showSearch ? 1 : 0,
        }}
        style={{
          transformOrigin: "right center",
        }}
        transition={{
          duration: 0.3,
        }}
        className={`${
          showSearch ? "flex-row-reverse rounded-md p-1 pl-2" : "flex-row"
        } group items-center justify-center  `}
      >
        <>
          {showSearch && (
            <motion.input
              placeholder="Search in playlist"
              onClick={handleInputClick}
              className={`h-8 bg-transparent text-xs  text-dimmed placeholder:text-sm placeholder:text-gray-300 focus:outline-none`}
              type="text"
            />
          )}
        </>
      </motion.div>
    </div>
  );
};

export default SearchAndSortPlaylist;
