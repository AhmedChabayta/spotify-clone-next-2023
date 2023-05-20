import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Flex } from "@src/components/Flex";
import { useClickOutside } from "@src/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import AuthButton from "../AuthButton/AuthButton";
import { UserMenu } from "./UserMenu";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { isPlayingState } from "@src/atoms/PlayerState";
import { AnimatePresence, motion } from "framer-motion";

const Header = ({
  opacity,
  headerTitle,
}: {
  opacity: number;
  headerTitle?: string;
}) => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [historyList, setHistoryList] = useState<string[]>([]);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const router = useRouter();
  const { data: session } = useSession();

  const handleRouteChange = () => {
    const currentRoute = router.asPath;
    const previousRoute = sessionStorage.getItem("previousRoute");

    if (previousRoute) {
      setCanGoBack(previousRoute !== currentRoute);
    } else {
      setCanGoBack(false);
    }

    sessionStorage.setItem("previousRoute", currentRoute);

    const index = historyList.findIndex((item) => item === currentRoute);
    setCanGoForward(index !== -1 && index < historyList.length - 1);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoForward = () => {
    router.push(router.asPath);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setHistoryList((prevHistoryList) => [...prevHistoryList, router.asPath]);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    handleRouteChange(); // Call handleRouteChange on initial render to set initial values
  }, []); // Empty dependency array to run it only once on mount

  const menuRef = useClickOutside<HTMLButtonElement>(() => {
    setShowUserMenu(false);
  });

  const handlePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <AnimatePresence>
      <motion.div
        transition={{
          duration: 0.4,
        }}
        animate={{
          backgroundColor: `rgba(18,18,18,${opacity})`,
          position: opacity * 100 > 40 ? "sticky" : "absolute",
        }}
        className="absolute inset-x-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-dark px-4"
      >
        <Flex className="w-fit items-center justify-between space-x-2 ">
          <button
            disabled={!canGoBack}
            className={`${
              canGoBack ? "bg-black" : "bg-neutral-950"
            } flex h-7 w-7 items-center justify-center rounded-full p-1`}
            onClick={handleGoBack}
          >
            <ChevronLeftIcon className="w-full border-white stroke-white" />
          </button>
          <button
            disabled={!canGoForward}
            className={`${
              canGoForward ? "bg-black" : "bg-neutral-950"
            } flex h-7 w-7 items-center justify-center rounded-full p-1`}
            onClick={handleGoForward}
          >
            <ChevronRightIcon className="w-full border-white stroke-white" />
          </button>

          <>
            <button onClick={handlePlay} className="flex">
              {isPlaying ? (
                <PauseCircleIcon className="h-10 w-10 object-contain text-lime-500" />
              ) : (
                <PlayCircleIcon className="h-10 w-10 object-contain text-lime-500" />
              )}
            </button>
            <p className="text-base text-white">{headerTitle}</p>
          </>
        </Flex>

        {session ? (
          <>
            <button
              ref={menuRef}
              className="group flex items-center justify-center rounded-full border-4 border-gray-900 bg-black hover:border-black "
              onClick={() => setShowUserMenu((prev) => !prev)}
            >
              {session.user?.image && (
                <Image
                  draggable={false}
                  className="h-7 w-7 rounded-full object-cover group-hover:border group-hover:border-black"
                  alt="Sign Out"
                  height={50}
                  width={50}
                  src={session?.user?.image}
                />
              )}
              <UserMenu
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
              />
            </button>
          </>
        ) : (
          <div className="absolute right-4 top-2">
            <AuthButton />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Header;
// {
//   session ? (
//     <>
//       <button
//         ref={menuRef}
//         className="group absolute right-4 top-2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-gray-900 bg-black hover:border-black "
//         onClick={() => setShowUserMenu((prev) => !prev)}
//       >
//         {session.user?.image && (
//           <Image
//             className="h-10 w-10 rounded-full object-cover group-hover:border group-hover:border-black"
//             alt="Sign Out"
//             height={50}
//             width={50}
//             src={session?.user?.image}
//           />
//         )}
//         <UserMenu
//           showUserMenu={showUserMenu}
//           setShowUserMenu={setShowUserMenu}
//         />
//       </button>
//     </>
//   ) : (
//     <div className="absolute right-4 top-2">
//       <AuthButton />
//     </div>
//   );
// }
