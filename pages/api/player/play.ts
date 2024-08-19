import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const accessToken = req.headers.authorization?.replace("Bearer ", "");

      if (!accessToken) {
        return res.status(401).json({ error: "Access token is missing" });
      }

      const requestBody = {
        context_uri: req.body.context_uri,
        offset: { position: 0 },
        position_ms: 0,
        device_id: req.body.device_id, // Include the device ID in the request payload
      };

      const playResponse = await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      res.status(200).json(playResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
};

export default handler;
