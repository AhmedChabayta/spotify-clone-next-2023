import { atom } from "recoil";
import { ArtistItems } from "./CurrentUsersFollowedArtists.types";

const currentUsersFollowedArtistsState =
  atom<SpotifyApi.UsersFollowedArtistsResponse>({
    key: "CurrentUsersFollowedArtists",
    default: undefined,
  });

export default currentUsersFollowedArtistsState;
