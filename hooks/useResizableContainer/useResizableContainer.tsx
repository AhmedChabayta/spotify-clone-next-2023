import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

const useResizableContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialX = useRef<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(140);

  const breakpoints = useMemo(
    () => ({
      min: 120,
      max: 150,
      snap: 100,
      large: 800,
      largeSnap: 1000,
    }),
    []
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      initialX.current = event.clientX;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    []
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (containerRef.current && initialX.current) {
        const widthDiff = event.clientX - initialX.current;
        const containerWidth = containerRef.current.offsetWidth;
        const newWidth = containerWidth + widthDiff;

        if (newWidth >= breakpoints.min && newWidth <= breakpoints.max) {
          setContainerWidth(breakpoints.snap);
        } else if (newWidth > breakpoints.large) {
          setContainerWidth(breakpoints.largeSnap);
        } else {
          setContainerWidth(newWidth);
        }
      }
    },
    [containerRef, initialX, breakpoints]
  );

  const handleMouseUp = useCallback(() => {
    initialX.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    containerRef,
    handleMouseDown,
    containerWidth,
    setContainerWidth,
  };
};

export default useResizableContainer;
