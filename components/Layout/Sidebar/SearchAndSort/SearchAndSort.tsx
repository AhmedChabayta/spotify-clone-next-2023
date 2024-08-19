import {
  CheckIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Flex } from "@src/components/Flex";
import { useClickOutside } from "@src/hooks";
import { useState } from "react";
import { useSidebarContext } from "../SidebarProvider/SidebarProvder";
import { useSetRecoilState } from "recoil";
import { currentUserLibraryState } from "@src/atoms/CurrentUsersLibrary";

const SORT_LIST = ["Recents", "Recently Added", "Alphabetical", "Creator"];

const SearchAndSort = () => {
  const [displaySortMenu, setDisplaySortMenu] = useState(false);
  const { setSearchQuery, searchQuery } = useSidebarContext();
  const [criteria, setCriteria] = useState<string>("Recents");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Added state for sorting order
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const setUserLibrary = useSetRecoilState(currentUserLibraryState);

  const menuRef = useClickOutside<HTMLDivElement>(() => {
    setDisplaySortMenu(false);
  });

  const inputRef = useClickOutside<HTMLDivElement>(() => {
    setShowSearch(false);
  });

  const handleSort = () => {
    setUserLibrary((prevLibrary) => {
      const sortedPlaylists = [...prevLibrary].sort((a, b) => {
        if (criteria === "Alphabetical") {
          const result = a.name.localeCompare(b.name);
          return sortOrder === "asc" ? result : -result;
        } else if (criteria === "Recently Added") {
          const result = (a.tracks?.total || 0) - (b.tracks?.total || 0);
          return sortOrder === "asc" ? result : -result;
        } else if (criteria === "Recents") {
          const dateA = a.snapshot_id ? new Date(a.snapshot_id) : null;
          const dateB = b.snapshot_id ? new Date(b.snapshot_id) : null;

          if (dateA && dateB) {
            const result = dateB.getTime() - dateA.getTime();
            return sortOrder === "asc" ? result : -result;
          } else if (dateA) {
            return -1;
          } else if (dateB) {
            return 1;
          }

          return 0;
        } else if (criteria === "Creator") {
          const result = (a.owner?.display_name || "").localeCompare(
            b.owner?.display_name || ""
          );
          return sortOrder === "asc" ? result : -result;
        }
        return 0;
      });

      return sortedPlaylists;
    });

    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc")); // Toggle the sort order
  };

  return (
    <div className="my-1 flex justify-between">
      <div
        ref={inputRef}
        className={`${
          showSearch ? "bg-neutral-700" : ""
        }  relative mx-2 flex items-center rounded p-1 px-3`}
      >
        <button>
          <MagnifyingGlassIcon
            onClick={() => setShowSearch((prev) => !prev)}
            className="w-5"
          />
        </button>
        <input
          type="text"
          className={`${
            showSearch ? "w-full" : "w-0"
          } mx-2 bg-transparent text-gray-500 outline-none transition-[all] duration-150 ease-linear placeholder:text-xs`}
          placeholder="Search in Your Library"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Flex ref={menuRef} className="relative">
        <button
          className="flex items-center justify-center space-x-2"
          onClick={() => setDisplaySortMenu((prev) => !prev)}
        >
          <p className="text-sm text-dimmed">{criteria}</p>
          <ChevronDownIcon className="w-7 pr-2" />
        </button>
        {displaySortMenu && (
          <div className="absolute right-0 top-[100%] w-44 space-y-2 rounded bg-menus p-2 text-sm shadow-md">
            <p className="h-full w-full p-2 text-gray-500">Sort By</p>
            {SORT_LIST.map((sort) => (
              <button
                className={`flex h-full w-full items-center p-4 hover:bg-neutral-900 ${
                  criteria === sort ? "text-lime-500" : ""
                }`}
                key={sort}
                onClick={() => {
                  setCriteria(sort);
                  handleSort();
                }}
              >
                <p className="w-full text-left">{sort}</p>
                {criteria === sort && <CheckIcon className="w-5" />}
              </button>
            ))}
          </div>
        )}
      </Flex>
    </div>
  );
};

export default SearchAndSort;
