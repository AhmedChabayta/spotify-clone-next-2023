import {
  ArtistItems,
  FollowedArtists,
} from "@src/atoms/CurrentUsersFollowedArtists/CurrentUsersFollowedArtists.types";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<FollowedArtists | { error: string }>
) => {
  try {
    const session = await getSession({ req });
    const accessToken = session?.user?.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token is missing" });
    }

    const playlistsResponse = await axios.get<FollowedArtists>(
      "https://api.spotify.com/v1/me/following?type=artist",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const currentUsersFollowedPlaylists: FollowedArtists =
      playlistsResponse.data;

    res.status(200).json(currentUsersFollowedPlaylists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default handler;
