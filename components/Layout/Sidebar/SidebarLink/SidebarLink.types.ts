import { IconType } from "react-icons";

export type SidebarLink = {
  title?: string;
  Icon:
    | IconType
    | React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref">
      >;
};
