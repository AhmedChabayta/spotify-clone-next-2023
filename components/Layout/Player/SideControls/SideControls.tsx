import { Flex } from "@src/components/Flex";
import {
  MicrophoneIcon,
  QueueListIcon,
  DevicePhoneMobileIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";

const SideControls = () => {
  return (
    <Flex className="h-full flex-col items-center space-x-2 md:flex-row">
      <MicrophoneIcon className="w-5 text-dimmed" />
      <QueueListIcon className="w-5 text-dimmed" />
      <DevicePhoneMobileIcon className="w-5 text-dimmed" />

      <ArrowsPointingOutIcon className="w-5 text-dimmed" />
    </Flex>
  );
};
export default SideControls;
