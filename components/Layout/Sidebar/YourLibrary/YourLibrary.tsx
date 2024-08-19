import {
  ChevronRightIcon,
  HomeModernIcon,
  ListBulletIcon,
  PlusSmallIcon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";
import { Flex } from "@src/components/Flex";
import { SidebarLink } from "../SidebarLink";
import { useSidebarContext } from "../SidebarProvider/SidebarProvder";

const YourLibrary = () => {
  const {
    containerWidth,
    setExpandWidth,
    expandWidth,
    setIsSidebarGrid,
    isSidebarGrid,
  } = useSidebarContext();
  return (
    <Flex
      className={`mx-auto mt-2 w-full px-4 shadow-2xl ${
        containerWidth < 130 ? "items-center justify-center" : "justify-between"
      }`}
    >
      <SidebarLink title="Your Library" Icon={HomeModernIcon} />

      {containerWidth > 130 ? (
        <Flex className="w-1/4 items-center justify-between">
          <button>
            <PlusSmallIcon className="w-5 text-dimmed" />
          </button>
          <button onClick={() => setIsSidebarGrid((prev) => !prev)}>
            {isSidebarGrid ? (
              <ListBulletIcon className="w-5 text-dimmed" />
            ) : (
              <Squares2X2Icon className="w-5 text-dimmed" />
            )}
          </button>

          {containerWidth > 130 && (
            <button
              type="button"
              onClick={() => setExpandWidth((prev) => !prev)}
            >
              <ChevronRightIcon
                className={`w-5 stroke-2 text-dimmed ${
                  expandWidth ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
};
export default YourLibrary;
