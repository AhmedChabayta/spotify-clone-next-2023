import { atom } from "recoil";

const currentURIState = atom<string | string[]>({
  key: "currentURI",
  default: "",
});

export default currentURIState;
