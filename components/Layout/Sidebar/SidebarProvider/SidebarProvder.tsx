import { useResizableContainer } from "@src/hooks";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SidebarContext } from "./SidebarProvider.types";

const SidebarContext = createContext<SidebarContext>({
  containerWidth: 140,
  expandWidth: false,
  setExpandWidth: () => {},
  searchQuery: "",
  setSearchQuery: () => "",
  isSidebarGrid: false,
  setIsSidebarGrid: () => {},
  filterType: null,
  setFilterType: () => null,
});

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};

interface ScrollData {
  isScrolled: boolean;
  scrollY: number;
}

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [filterType, setFilterType] = useState<string | null>(null);
  const [expandWidth, setExpandWidth] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scrollData, setScrollData] = useState<ScrollData>({
    isScrolled: false,
    scrollY: 0,
  });

  const { containerWidth, handleMouseDown, containerRef, setContainerWidth } =
    useResizableContainer();

  const [isSidebarGrid, setIsSidebarGrid] = useState<boolean>(false);

  useEffect(() => {
    if (containerWidth <= 170) {
      setExpandWidth(false);
      setContainerWidth(90);
    } else if (containerWidth > 600) {
      setExpandWidth(true);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        if (window.innerWidth < 700) {
          setExpandWidth(false);
        }
      });
    }
  }, [containerWidth]);

  const value: SidebarContext = useMemo(
    () => ({
      handleMouseDown,
      containerRef,
      expandWidth,
      setExpandWidth,
      containerWidth,
      searchQuery,
      setSearchQuery,
      scrollData,
      setScrollData,
      isSidebarGrid,
      setIsSidebarGrid,
      setFilterType,
      filterType,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleMouseDown, containerRef, expandWidth, containerWidth, searchQuery]
  );
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export default SidebarProvider;
export { useSidebarContext };
