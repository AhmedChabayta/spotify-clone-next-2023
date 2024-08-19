import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type AccessTokenState = string | undefined;

const acessTokenState = atom<AccessTokenState>({
  key: "accestoken",
  default: "",
  effects_UNSTABLE: [persistAtom], // Apply persistence effect
});
export default acessTokenState;
