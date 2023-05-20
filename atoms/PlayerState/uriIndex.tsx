import { atom } from "recoil";
import { PlaybackStateResponse } from "./PlayerState.types";

const UriIndexState = atom<number>({
  key: "currentIndexState",
  default: 0,
});

export default UriIndexState;
