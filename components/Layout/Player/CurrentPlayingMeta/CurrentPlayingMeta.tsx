import { HeartIcon } from "@heroicons/react/24/solid";
import { playerStates } from "@src/atoms/PlayerState";
import { Flex } from "@src/components/Flex";
import Image from "next/image";
import { useRecoilState } from "recoil";

const CurrentPlayingMeta = () => {
  const [playerState, setPlayerState] = useRecoilState(playerStates);

  return (
    <Flex className="ml-2 hidden w-fit items-center justify-between space-x-4 md:flex">
      <Flex className="m-2 h-16 w-16">
        {playerState?.item?.album?.images?.[0]?.url && (
          <Image
            className="h-16 w-16 object-contain"
            height={50}
            width={50}
            alt={playerState?.item?.album?.name}
            src={playerState?.item?.album?.images?.[0]?.url}
          />
        )}
      </Flex>
      <Flex className="ml-2 flex-col text-dimmed">
        <p className="whitespace-nowrap text-base text-gray-100">
          {playerState?.item?.name}
        </p>
        <p className="text-xs">{playerState?.item?.artists?.[0].name}</p>
      </Flex>
      <HeartIcon className="w-5 text-lime-500" />
    </Flex>
  );
};
export default CurrentPlayingMeta;
