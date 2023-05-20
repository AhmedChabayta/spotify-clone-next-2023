import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSidebarContext } from "../SidebarProvider/SidebarProvder";
import { SIDEBAR_FILTERS_CONSTANTS } from "./SidebarFilter.constants";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { SearchAndSort } from "../SearchAndSort";
import { Flex } from "@src/components/Flex";
import { useRecoilState } from "recoil";
import { currentUserLibraryState } from "@src/atoms/CurrentUsersLibrary";

const SidebarFilter = () => {
  const [selectedOwner, setSelectedOwner] = useState<string | null>();
  const [originalPlaylists, setOriginalPlaylists] = useState<any>();
  const { containerWidth, filterType, setFilterType } = useSidebarContext();
  const { data: session } = useSession();
  const [userLibrary, setUserLibrary] = useRecoilState(currentUserLibraryState);

  const handleFilter = (type: string) => {
    if (!originalPlaylists) {
      setOriginalPlaylists([...userLibrary]);
    }
    setFilterType(type.toLowerCase());
    setSelectedOwner("");

    let filteredData = [...userLibrary];

    if (type) {
      filteredData = filteredData.filter((item) => item.type === type);
    }

    setUserLibrary([...filteredData]);
  };

  const handleOwnerFilter = (owner?: string) => {
    let filteredData = userLibrary;

    if (owner) {
      if (session?.user?.name) {
        const ownerName = session.user.name;

        if (filterType === "playlist") {
          if (owner === ownerName.toLowerCase()) {
            filteredData = filteredData.filter(
              (item) =>
                item?.owner?.display_name.toLowerCase() ===
                ownerName.toLowerCase()
            );
          } else if (owner === "spotify") {
            filteredData = filteredData.filter(
              (item) => item?.owner?.display_name.toLowerCase() === "spotify"
            );
          }
        }
      }
    }

    setUserLibrary(filteredData);
  };

  const resetFilters = () => {
    setFilterType(null);
    setSelectedOwner(null);
    setUserLibrary([...originalPlaylists]);
  };

  const ownerFilterButtons = ["By you", "By Spotify"];
  return (
    <Flex
      className={`mt-4 ${
        containerWidth >= 400 ? "flex-row items-center" : "flex-col space-y-4"
      } justify-center scrollbar-hide`}
    >
      <div
        className={`${
          containerWidth < 130 ? "hidden" : "flex"
        }  space-x-4 overflow-x-scroll scrollbar-hide `}
        style={{ width: "100%" }}
      >
        {filterType && (
          <button
            onClick={resetFilters}
            className="ml-3 flex shrink-0 rounded-full bg-stone-800 p-1 text-white"
          >
            <XMarkIcon className="w-6" />
          </button>
        )}
        {/* Default Filters */}
        {SIDEBAR_FILTERS_CONSTANTS.map(
          (filter) =>
            (filterType === filter.toLowerCase() || !filterType) && (
              <button
                key={filter}
                onClick={() => handleFilter(filter.toLowerCase())}
                className={`flex shrink-0 rounded-2xl bg-highlights px-3 py-1 text-sm font-light text-lightText ${
                  filterType === filter.toLowerCase() ? "bg-green-500" : ""
                }`}
              >
                <p>{filter}</p>
              </button>
            )
        )}

        {filterType === "playlist" && (
          <>
            {ownerFilterButtons.map((owner) => {
              const ownerValue =
                owner === "By you"
                  ? session?.user?.name.toLowerCase()
                  : owner === "By Spotify"
                  ? "spotify"
                  : undefined;

              const isSelected = selectedOwner === ownerValue;

              return (
                (isSelected || !selectedOwner) && (
                  <button
                    key={owner}
                    onClick={() => {
                      setSelectedOwner(ownerValue);
                      handleOwnerFilter(ownerValue);
                    }}
                    className={`flex shrink-0 rounded-2xl px-3 py-1 text-white ${
                      isSelected ? "bg-green-500" : ""
                    }`}
                  >
                    {owner}
                  </button>
                )
              );
            })}
          </>
        )}
      </div>
      {containerWidth > 130 && <SearchAndSort />}
    </Flex>
  );
};

export default SidebarFilter;
