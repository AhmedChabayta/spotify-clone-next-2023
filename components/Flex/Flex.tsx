import React from "react";
import { FlexInterface } from "./Flex.types";

const Flex = React.forwardRef<HTMLDivElement, FlexInterface>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div ref={ref} className={`flex ${className}`} {...rest}>
      {children}
    </div>
  );
});
Flex.displayName = "Flex";
export default Flex;
