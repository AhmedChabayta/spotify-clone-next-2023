import { useEffect, useRef, useState } from "react";

const useScrollOpacity = (
  containerRef: React.RefObject<HTMLElement>
): number => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) {
        return; // Return early if the container element is not found
      }

      const containerElement = containerRef.current;
      const containerHeight = containerElement.offsetHeight; // Get the height of the container
      const scrollTop = containerElement.scrollTop; // Get the current scroll position of the container

      // Calculate the opacity based on the scroll position and container height
      const newOpacity = Math.max(0, Math.min(1, scrollTop / containerHeight));

      setOpacity(newOpacity); // Update the opacity state value
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener on component unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef]);

  return opacity;
};
export default useScrollOpacity;
