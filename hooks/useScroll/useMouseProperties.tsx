import { useEffect, useRef, useState } from "react";

interface MouseProperties {
  scrollY: number;
}

const useMouseProperties = (
  ref: React.RefObject<HTMLElement>
): MouseProperties => {
  const [mouseProperties, setMouseProperties] = useState<MouseProperties>({
    scrollY: 0,
  });

  useEffect(() => {
    const handleScroll = (): void => {
      if (ref.current) {
        const { scrollTop } = ref.current;
        setMouseProperties((prevProperties) => ({
          ...prevProperties,
          scrollY: scrollTop,
        }));
      }
    };

    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref]);

  return mouseProperties;
};

export default useMouseProperties;
