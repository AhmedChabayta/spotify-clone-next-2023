import {
  ArrowDownCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PauseIcon,
  PlayCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import {
  UriIndexState,
  currentURIState,
  isPlayingState,
  playerStates,
} from "@src/atoms/PlayerState";
import { Flex } from "@src/components/Flex";
import { SearchAndSortPlaylist } from "@src/components/SearchAndSortPlaylist";
import createCircularArray from "@src/lib/createCircularArray";
import formatDate from "@src/lib/formatDate";
import formatDuration from "@src/lib/formatDuration";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Column, Row, useSortBy, useTable } from "react-table";
import { useRecoilState } from "recoil";

interface PlaylistTrack {
  index?: number;
  title?: string;
  album: {
    name?: string;
  };
  artist?: {
    name_1?: string;
    name_2?: string;
    id?: string;
    image?: string;
  };
  addedAt?: string;
  track: {
    uri: string;
    duration_ms: number;
    id?: string;
  };
}

interface PlaylistTableProps {
  playlist?: SpotifyApi.SinglePlaylistResponse;
}

const PlaylistTable: React.FC<PlaylistTableProps> = ({ playlist }) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [uris, setUri] = useRecoilState(currentURIState);
  const [currentIndex, setCurrentIndex] = useRecoilState(UriIndexState);
  const [playingState, setIsPlayingState] = useRecoilState(isPlayingState);
  const [playerState, setPlayerState] = useRecoilState(playerStates);

  const handlePause = () => {
    if (playingState) {
      setIsPlayingState(false);
    } else return;
  };

  const handleDoubleClickPlay = (i: number) => {
    if (!i) return;
    const preMappedUris = playlist?.tracks.items.map(
      (item) => item?.track!.uri
    );
    const mappedUris = createCircularArray(i, preMappedUris);
    setUri(mappedUris!);
    setIsPlayingState(true);
  };

  const data: PlaylistTrack[] = React.useMemo(
    () =>
      (playlist?.tracks.items || []).map((item, index) => ({
        index: index + 1,
        title: item?.track?.name || "",
        album: {
          name: item?.track?.album?.name || "",
        },
        artist: {
          name_1: item?.track?.artists[0]?.name || "",
          name_2: item?.track?.artists?.[1]?.name || "",
          id: item?.track?.artists[0]?.id || "",
          image: item?.track?.album?.images?.[0]?.url || "",
        },
        addedAt: formatDate(item.added_at || ""),
        track: {
          uri: item?.track?.uri || "",
          duration_ms: item?.track?.duration_ms || 0,
          id: item?.track?.id || "",
        },
      })),
    [playlist]
  );
  interface RowData {
    original: {
      index: number;
      title: string;
      album: {
        name: string;
      };
      artist: {
        name_1: string;
        name_2: string;
        id: string;
        image: string;
      };
      addedAt: string;
      track: {
        duration_ms: number;
        uri: string;
        id: string;
      };
    };
  }

  const columns: Column<any>[] = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "index",
        disableSortBy: true,
        Cell: ({ value, row }: { value: number; row: any }) => {
          return (
            <div className="flex items-center">
              {hoveredRow === (value - 1).toString() ? (
                <>
                  {playerState?.item?.uri === row?.original.track.uri ? (
                    <button onClick={handlePause}>
                      <PauseIcon className="w-5 object-contain transition-opacity duration-300" />
                    </button>
                  ) : (
                    <button onClick={() => handleDoubleClickPlay(row.index)}>
                      <PlayIcon className="w-5 object-contain transition-opacity duration-300" />
                    </button>
                  )}
                </>
              ) : (
                <span>{value}</span>
              )}
            </div>
          );
        },
      },
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ value, row }: { value: string; row: any }) => (
          <Flex>
            <Image
              draggable={false}
              className="mx-2 object-contain"
              alt=""
              width={50}
              height={50}
              src={row?.original?.artist?.image}
            />
            <div className="flex flex-col">
              <span>{value}</span>
              <Flex className="items-center space-x-2">
                <Link href="/">
                  <span className="hover:underline">
                    {row.original.artist.name_1}
                  </span>
                </Link>
                ,{" "}
                <Link href="/">
                  <span className="hover:underline">
                    {row.original.artist.name_2}
                  </span>
                </Link>
              </Flex>
            </div>
          </Flex>
        ),
      },
      {
        Header: "Album",
        accessor: "album",
        Cell: ({ value }: { value: any }) => (
          <div className="flex flex-col">
            <Link href="/" className="hover:underline">
              {value.name}
            </Link>
          </div>
        ),
      },
      {
        Header: "Date added",
        accessor: "addedAt",
        Cell: ({ value }: { value: string }) => (
          <span className="whitespace-nowrap text-sm">{value}</span>
        ),
      },
      {
        Header: "Duration",
        accessor: "track.duration_ms",
        Cell: ({ value }: { value: number }) => (
          <span className="text-sm">{formatDuration(value)}</span>
        ),
      },
    ],
    [hoveredRow]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable({ columns, data }, useSortBy);
  const playlistUri =
    playlist?.tracks.items &&
    (playlist.tracks.items.map((item) => item.track?.uri) as string | string[]);

  if (!playlist) {
    return <>loading</>;
  }
  return (
    <div className="mb-[95px] min-w-full !select-none bg-gradient-to-b from-dark/70">
      <Flex className="items-center justify-between px-3">
        <Flex className="items-center py-6">
          <button type="button" onClick={() => setUri(playlistUri!)}>
            <PlayCircleIcon className="w-20 cursor-pointer text-spotify" />
          </button>
          <ArrowDownCircleIcon className="w-10 text-spotify" />
        </Flex>
        <SearchAndSortPlaylist />
      </Flex>
      <table className="w-full" {...getTableProps()}>
        <thead className="sticky left-0 top-14 z-50 bg-dark/70">
          {headerGroups.map((headerGroup, i) => (
            <tr className="" {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  className="cursor-pointer py-6 pl-6 text-left text-sm text-gray-300"
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.render("Header")}</span>
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDownIcon className="w-5 text-green-500" />
                        ) : (
                          <ChevronUpIcon className="w-5 text-green-500" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="overflow-y-scroll py-20" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { uri } = row.original?.track || {};
            return (
              <tr
                onDoubleClick={() => handleDoubleClickPlay(row.index)}
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
                {...row.getRowProps()}
                key={row.id}
                className="cursor-pointer rounded-md text-gray-300 hover:bg-neutral-600"
              >
                {row.cells.map((cell: any, index: number) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="p-4 text-left"
                  >
                    {index === 0 ? (
                      <div className="group relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {cell.render("Cell")}
                        </div>
                      </div>
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistTable;
