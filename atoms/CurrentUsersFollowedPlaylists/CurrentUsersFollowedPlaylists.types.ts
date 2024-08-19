export type CurrentUsersFollowedPlaylists = {
  href: string;
  items: Array<{
    collaborative: boolean;
    description: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Array<{
      height?: number;
      url: string;
      width?: number;
    }>;
    name: string;
    owner: {
      display_name: string;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    primary_color: any;
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string;
      total: number;
    };
    type: string;
    uri: string;
  }>;
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
};
