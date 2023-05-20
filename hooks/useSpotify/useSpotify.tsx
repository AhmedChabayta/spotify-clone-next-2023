import { accessTokenState } from "@src/atoms/AccessToken";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
  const { data: session, status } = useSession();
  const setAccessToken = useSetRecoilState(accessTokenState);
  useEffect(() => {
    if (session?.user) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session?.user?.accessToken);
      setAccessToken(session?.user?.accessToken);
    }
  }, [session]);

  return spotifyApi;
};
export default useSpotify;
