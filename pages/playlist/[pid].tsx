//playlistId -- pid

import { singlePlaylistAtom } from "@src/atoms";
import acessTokenState from "@src/atoms/AccessToken/accessTokenState";
import { Flex, Layout, PlaylistTable } from "@src/components";
import { useSpotify } from "@src/hooks";
import formatTotalDuration from "@src/lib/formatTotalDuration";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const PlaylistPage = () => {
  const [playlist, setPlaylist] = useRecoilState(singlePlaylistAtom);
  const { data: session } = useSession();
  const accessToken = useRecoilValue(acessTokenState);
  const spotifyApi = useSpotify();
  const { query } = useRouter();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken!);
    console.log("called from pid");
    const fetchPlaylist = async () => {
      if (!accessToken || !query.pid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        if (query.pid) {
          spotifyApi
            .getPlaylist(query?.pid?.toString()!)
            .then((res) => setPlaylist(res?.body));
        }
      } catch (error) {
        if (error) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [query.pid]);

  const totalDuration = playlist?.tracks.items.reduce((accumulator, item) => {
    if (item?.track?.duration_ms) {
      return accumulator + item.track.duration_ms;
    }
    return accumulator;
  }, 0);
  if (loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  console.log(playlist?.owner);
  return (
    <Flex className="flex-col scrollbar-hide ">
      <Flex className="bg-gradient-to-b from-purple-800 px-12 py-20">
        <Flex className="h-56 w-56 object-contain">
          {playlist?.images?.[0]?.url && (
            <Image
              draggable={false}
              className="w-full object-contain"
              alt={playlist?.name!}
              width={100}
              height={100}
              src={playlist?.images?.[0]?.url}
            />
          )}
        </Flex>
        <Flex className="flex-col justify-center pl-2 text-gray-100">
          <p className="font-semibold capitalize">
            {playlist?.public
              ? `public ${playlist?.type}`
              : `private ${playlist?.type}`}
          </p>
          <h1 className="text-3xl font-black">{playlist?.name}</h1>
          <p className="mt-4 max-w-xl text-xs text-lightText">
            {playlist?.description}
          </p>
          <Flex className="">
            {playlist?.owner?.images?.[0].url && (
              <Image
                width={50}
                height={50}
                className="h-10 w-10"
                alt={playlist?.owner?.display_name!}
                src={playlist?.owner?.images?.[0].url}
              />
            )}{" "}
            <p className="flex flex-wrap items-center space-x-1">
              <span className=" text-sm font-semibold">
                {" "}
                {playlist?.owner?.display_name}{" "}
              </span>
              <span className="text-sm font-light">
                {" "}
                {playlist?.followers.total.toLocaleString()} .
              </span>
              <span className="text-xs font-semibold">
                {playlist?.tracks.total.toLocaleString()} songs,{" "}
              </span>
              <span className="text-xs font-light text-dimmed">
                {" "}
                {formatTotalDuration(totalDuration!)}
              </span>
            </p>
          </Flex>
        </Flex>
      </Flex>
      {/* here */}

      <PlaylistTable playlist={playlist} />
      {/* here */}
    </Flex>
  );
};

export default PlaylistPage;
