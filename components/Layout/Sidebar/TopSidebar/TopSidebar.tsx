import { Flex } from "@src/components/Flex";
import Link from "next/link";
import { SidebarLink } from "../SidebarLink";
import { useSidebarContext } from "../SidebarProvider/SidebarProvder";
import { _links } from "./TopSidebar.constants";

const TopSidebar = () => {
  const { containerWidth } = useSidebarContext();
  return (
    <Flex
      className={`${
        containerWidth < 130
          ? "items-center justify-center"
          : "items-center justify-start md:items-start md:justify-center md:pl-4"
      } h-[calc(100vh-90vh)] cursor-pointer flex-col space-y-4 rounded-md bg-dark p-2`}
    >
      {_links.map(({ title, Icon }) => (
        <Link key={title} href="/">
          <SidebarLink title={title} Icon={Icon} />
        </Link>
      ))}
    </Flex>
  );
};
export default TopSidebar;
