import { Flex } from "@src/components/Flex";

const PlayerBar = () => {
  return (
    <Flex className="w-1/2 items-center space-x-2">
      <p className="font-mono text-xs">00:00</p>
      <input type="range" className="flex w-full flex-1" />
      <p className="font-mono text-xs">00:00</p>
    </Flex>
  );
};
export default PlayerBar;
