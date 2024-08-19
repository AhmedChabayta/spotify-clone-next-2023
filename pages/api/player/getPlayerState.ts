import { PlaybackStateResponse } from "@src/atoms/PlayerState/PlayerState.types";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";



const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<PlaybackStateResponse | { error: string }>
) => {
  try {
    const session = await getSession({ req });
    const accessToken = session?.user?.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token is missing" });
    }

    const playbackStateResponse = await axios.get(
      "https://api.spotify.com/v1/me/player",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const playbackState = playbackStateResponse.data;

    res.status(200).json(playbackState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default handler;
