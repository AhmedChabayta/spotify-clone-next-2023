import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    const accessToken = session?.user?.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token is missing" });
    }
    const likedSongsResponse = await axios.get(
      "https://api.spotify.com/v1/me/tracks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json(likedSongsResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default handler;
