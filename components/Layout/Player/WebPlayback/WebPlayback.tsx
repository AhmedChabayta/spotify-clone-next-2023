import {
  UriIndexState,
  isPlayingState,
  playerStates,
} from "@src/atoms/PlayerState";
import { useSpotify } from "@src/hooks";
import { useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useRecoilState } from "recoil";

const WebPlayback = ({
  token,
  uri,
}: {
  token: string;
  uri: string | string[];
}) => {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentIndex, setCurrentIndex] = useRecoilState(UriIndexState);
  const [playerState, setPlayerState] = useRecoilState(playerStates);

  const handlePlayerUpdate = (state: any) => {
    // Logic to play the next track in the playlist
    if (currentIndex !== null) {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < (uri?.length || 0) ? nextIndex : prevIndex;
      });
    }
  };

  const spotifyApi = useSpotify();
  useEffect(() => {
    console.log("running currentplaybackstate ");
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((res) => setPlayerState(res.body));
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    setIsPlaying(true);
  }, [uri]);

  if (!token) return null;
  return (
    <SpotifyPlayer
      styles={{
        activeColor: "#fff",
        bgColor: "black",
        color: "#fff",
        loaderColor: "none",
        sliderColor: "#1cb954",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
      }}
      play={isPlaying}
      persistDeviceSelection
      token={token}
      uris={uri ? uri : []}
      callback={handlePlayerUpdate}
    />
  );
};

export default WebPlayback;
