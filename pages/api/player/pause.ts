import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    console.log(accessToken);
    if (!accessToken) {
      return res.status(401).json({ error: "Access token is missing" });
    }

    const requestBody = {
      device_id: req.body.deviceId, // Include the device ID in the request payload
    };

    const pauseResponse = await axios.put(
      "https://api.spotify.com/v1/me/player/pause",
      requestBody,
      {
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(pauseResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default handler;
