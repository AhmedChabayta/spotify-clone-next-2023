import { atom } from "recoil";
import { CurrentUsersFollowedPlaylists } from "../CurrentUsersFollowedPlaylists/CurrentUsersFollowedPlaylists.types";
import { ArtistItems } from "../CurrentUsersFollowedArtists/CurrentUsersFollowedArtists.types";
import { ArtistsPlaylist, LibraryResponse } from "./CurrentUsersLibrary.types";

const currentUserLibraryState = atom<ArtistsPlaylist[]>({
  key: "CurrentUserLibrary",
  default: [],
});

export default currentUserLibraryState;
