import { ClientWrapper } from "@src/components/ClientWrapper";
import { Flex } from "@src/components/Flex";
import { SidebarHandle } from "../SidebarHandle";
import { useSidebarContext } from "../SidebarProvider/SidebarProvder";
import { TopSidebar } from "../TopSidebar";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Library } from "../Library";
import { SidebarFilter } from "../SidebarFilter";
import { YourLibrary } from "../YourLibrary";

const Sidebar = () => {
  const { containerRef, expandWidth, containerWidth, isSidebarGrid } =
    useSidebarContext();
  const { data: session } = useSession();

  return (
    <ClientWrapper>
      <motion.div
        style={{
          maxWidth: expandWidth ? "50vw" : "500px",
        }}
        animate={{
          width: containerWidth,
        }}
        transition={{ type: "tween", duration: 0 }}
        className="relative flex h-[calc(100vh-20vh)] min-w-[75px] flex-col pr-1 text-gray-200 shadow-dark"
        ref={containerRef}
      >
        <TopSidebar />
        <SidebarHandle />
        {session?.user && (
          <Flex className="mt-2 h-full flex-col rounded-md bg-dark">
            <YourLibrary />
            <SidebarFilter />
            <div
              className={`h-full w-full ${
                isSidebarGrid ? "grid grid-cols-3" : "flex flex-col"
              }  space-y-2 overflow-x-hidden overflow-y-scroll scrollbar-hide`}
            >
              <Library />
            </div>
          </Flex>
        )}
      </motion.div>
    </ClientWrapper>
  );
};
export default Sidebar;
