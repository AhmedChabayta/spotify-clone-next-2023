export type SidebarContext = {
  containerWidth: number;
  containerRef?: React.RefObject<HTMLDivElement> | null;
  expandWidth: boolean;
  handleMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  setExpandWidth: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery?: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isScrolled?: boolean;
  scrollY?: number;
  isSidebarGrid: boolean;
  setIsSidebarGrid: React.Dispatch<React.SetStateAction<boolean>>;
  filterType: string | null;
  setFilterType: React.Dispatch<React.SetStateAction<string | null>>;
};
