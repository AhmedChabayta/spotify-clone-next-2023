import { useSidebarContext } from "../SidebarProvider/SidebarProvder";
import { SidebarLink } from "./SidebarLink.types";

const SidebarLink = (props: SidebarLink) => {
  const { Icon, title } = props;
  const { containerWidth } = useSidebarContext();
  return (
    <button className="flex items-center space-x-4 text-[rgb(179,179,179)]">
      <Icon className="w-6 text-dimmed" />
      {containerWidth > 130 && (
        <p className="whitespace-nowrap text-[14px] font-bold">{title}</p>
      )}
    </button>
  );
};
export default SidebarLink;
// 35 137 69 green
//  18 18 18 bg sidebar
// 33 33 33 highlights
// 167 167 167 text
// 239 239 240 fontsize pages names
