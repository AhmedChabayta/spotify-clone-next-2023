import { atom } from "recoil";


const currentUserFollowedPlaylistsState =
  atom<SpotifyApi.ListOfUsersPlaylistsResponse>({
    key: "CurrentUserFollowedPlaylists",
    default: undefined,
  });

export default currentUserFollowedPlaylistsState;
