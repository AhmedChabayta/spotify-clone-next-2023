import { HTMLAttributes } from "react";

export interface FlexInterface extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}
