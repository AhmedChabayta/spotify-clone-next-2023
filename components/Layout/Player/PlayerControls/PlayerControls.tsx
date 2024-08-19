import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import { isPlayingState, playerStates } from "@src/atoms/PlayerState";
import { Flex } from "@src/components/Flex";
import { useSpotify } from "@src/hooks";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { useRecoilState } from "recoil";

const PlayerControls = () => {
  const [playerState, setPlayerState] = useRecoilState(playerStates);
  const [playingState, setPlayingState] = useRecoilState(isPlayingState);
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setPlayingState(false);
      } else {
        spotifyApi.play();
        setPlayingState(true);
      }
    });
  };

  return (
    <Flex className="flex-1 space-x-8">
      <ArrowUturnLeftIcon className="w-7" />
      <BackwardIcon className="w-7" />
      <button>
        {playingState ? (
          <PauseCircleIcon onClick={() => handlePlayPause()} className="w-10" />
        ) : (
          <PlayCircleIcon onClick={() => handlePlayPause()} className="w-10" />
        )}
      </button>
      <ForwardIcon className="w-7" />
      <ArrowPathIcon className="w-7" />
    </Flex>
  );
};
export default PlayerControls;
