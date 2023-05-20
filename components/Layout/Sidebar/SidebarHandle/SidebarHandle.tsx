import { useContext } from "react";
import { useSidebarContext } from "../SidebarProvider/SidebarProvder";

const SidebarHandle = () => {
  const { handleMouseDown } = useSidebarContext();
  return (
    <div className="group">
      <div
        className="absolute -right-0 z-[1000000] h-full w-1 cursor-e-resize select-none bg-gray-100/0 group-hover:bg-gray-500"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};
export default SidebarHandle;
