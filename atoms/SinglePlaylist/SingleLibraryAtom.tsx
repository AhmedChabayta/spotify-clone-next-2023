import { atom } from "recoil";

const singlePlaylistAtom = atom<SpotifyApi.SinglePlaylistResponse>({
  key: "singlePlaylistState",
  default: undefined,
});

export default singlePlaylistAtom;
