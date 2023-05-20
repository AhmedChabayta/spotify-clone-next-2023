import { CurrentUsersFollowedPlaylists } from "@src/atoms/CurrentUsersFollowedPlaylists/CurrentUsersFollowedPlaylists.types";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CurrentUsersFollowedPlaylists | { error: string }>
) => {
  try {
    const session = await getSession({ req });
    const accessToken = session?.user?.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token is missing" });
    }

    const playlistsResponse = await axios.get<CurrentUsersFollowedPlaylists>(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const currentUsersFollowedPlaylists = playlistsResponse.data;

    res.status(200).json(currentUsersFollowedPlaylists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default handler;
