import {
  currentURIState
} from "@src/atoms/PlayerState";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import WebPlayback from "./WebPlayback/WebPlayback";

const Player = () => {
  const { data: session } = useSession();

  const [uri, setUri] = useRecoilState(currentURIState);

  return <WebPlayback uri={uri} token={session?.user?.accessToken!} />;
};
export default Player;
