import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface PlayTrackResponse {
  // Define the response type here if needed
}

interface PlayStateResponse {
  // Define the response type here if needed
}

const usePausePlay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playState, setPlayState] = useState<PlayTrackResponse | null>(null);

  const { data: session } = useSession();

  const playTrack = async (contextUri: string) => {
    const requestBody = {
      context_uri: contextUri,
      offset: { position: 5 },
      position_ms: 0,
    };

    try {
      const response = await axios.post(
        "https://api.spotify.com/v1/me/player/play",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response
// Log or process the response data as needed
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  const pauseTrack = async (deviceId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = session?.user?.accessToken;

      await axios.post<PlayStateResponse>(
        "https://api.spotify.com/v1/me/player/pause",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the request headers
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setError("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    playTrack,
    pauseTrack,
    isLoading,
    error,
    playState,
  };
};

export default usePausePlay;
