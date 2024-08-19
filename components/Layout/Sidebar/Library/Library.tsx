import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { currentUsersFollowedArtistsState } from "@src/atoms/CurrentUsersFollowedArtists";
import { currentUserFollowedPlaylistsState } from "@src/atoms/CurrentUsersFollowedPlaylists";
import { currentUserLibraryState } from "@src/atoms/CurrentUsersLibrary";
import { ArtistsPlaylist } from "@src/atoms/CurrentUsersLibrary/CurrentUsersLibrary.types";
import { currentURIState } from "@src/atoms/PlayerState";
import { Flex } from "@src/components/Flex";
import { useSpotify } from "@src/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useSidebarContext } from "../SidebarProvider/SidebarProvder";
import { LIKED_AND_EPISODES } from "./Library.constants";
import { highlightSearchQuery } from "@src/lib/highlightSearchQuery";

const Library = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const { containerWidth, searchQuery } = useSidebarContext();

  const setCurrentUsersFollowedPlaylist = useSetRecoilState(
    currentUserFollowedPlaylistsState
  );
  const setCurrentUsersFollowedArtists = useSetRecoilState(
    currentUsersFollowedArtistsState
  );
  const [userLibrary, setUserLibrary] = useRecoilState(currentUserLibraryState);
  const setCurrentUri = useSetRecoilState(currentURIState);

  const fetchLibrary = async () => {
    try {
      const [followedPlaylists, followedArtists] = await Promise.all([
        spotifyApi.getUserPlaylists(),
        spotifyApi.getFollowedArtists(),
      ]);

      setCurrentUsersFollowedPlaylist(followedPlaylists.body);
      setCurrentUsersFollowedArtists(followedArtists.body);

      setUserLibrary([
        ...followedPlaylists.body.items,
        ...followedArtists.body.artists.items,
      ] as ArtistsPlaylist[]);

      // Additional processing or state updates
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  useEffect(() => {
    console.log("API CALLED");
    fetchLibrary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.accessToken]);

  const hideText =
    containerWidth <= 130 ? "hidden" : containerWidth > 130 ? "flex" : "";

  return (
    <>
      {LIKED_AND_EPISODES.map(({ title, Icon }) => (
        <Flex
          key={title}
          className={`${
            containerWidth <= 130
              ? "items-center justify-center"
              : "items-center space-x-3"
          } cursor-pointer rounded p-2 hover:bg-highlights`}
        >
          <Flex className="h-16 w-16 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[rgb(72,18,243)] via-[rgb(136,131,228)] to-white">
            <Icon className="h-10 w-10 object-contain" />
          </Flex>
          <Flex>
            <p className={`${hideText}`}>{title}</p>
          </Flex>
        </Flex>
      ))}

      {userLibrary?.map((playlist) => (
        <Link
          legacyBehavior
          href={`/${playlist.type}/${playlist.id}`}
          key={playlist.id}
        >
          <button
            onDoubleClick={() => {
              setCurrentUri(userLibrary.map((item) => item.uri));
            }}
            className={`flex w-full items-center rounded-md ${
              containerWidth <= 130
                ? "justify-center"
                : containerWidth > 130
                ? "justify-start"
                : ""
            }  hover:bg-stone-800 `}
          >
            <Flex className="h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md p-2">
              {playlist.images?.[0]?.url ? (
                <Image
                  draggable={false}
                  className={`h-16 w-16 shrink-0 object-contain ${
                    playlist.type === "playlist" ? "" : "rounded-full"
                  }`}
                  width={90}
                  height={90}
                  alt=""
                  src={playlist?.images?.[0]?.url}
                />
              ) : (
                <MusicalNoteIcon
                  className={`w-10 shrink-0 object-contain ${
                    playlist.type === "playlist" ? "" : "rounded-full"
                  }`}
                />
              )}
            </Flex>
            {Boolean(hideText) && (
              <span className="flex flex-col items-start">
                <p
                  className={`${hideText} max-w-[150px] truncate whitespace-nowrap`}
                >
                  {highlightSearchQuery(playlist.name, searchQuery)}
                </p>
                <p
                  className={`${hideText} space-x-2 text-xs capitalize text-gray-400`}
                >
                  <span className="whitespace-nowrap">
                    {highlightSearchQuery(playlist.type, searchQuery)}
                  </span>{" "}
                  .
                  {playlist?.owner?.display_name && (
                    <span className="whitespace-nowrap">
                      {" "}
                      {highlightSearchQuery(
                        playlist?.owner?.display_name,
                        searchQuery
                      )}
                    </span>
                  )}{" "}
                  .{" "}
                  {playlist?.tracks?.total && (
                    <span className="whitespace-nowrap">
                      {" "}
                      {`${playlist?.tracks?.total} Tracks`}
                    </span>
                  )}
                </p>
              </span>
            )}
          </button>
        </Link>
      ))}
    </>
  );
};
export default Library;
