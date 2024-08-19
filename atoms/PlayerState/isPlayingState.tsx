import { atom } from "recoil";
import { PlaybackStateResponse } from "./PlayerState.types";

const isPlayingState = atom({
  key: "isPlaying",
  default: false,
});

export default isPlayingState;
