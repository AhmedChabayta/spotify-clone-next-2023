import { useScrollOpacity } from "@src/hooks";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useRef } from "react";
import { Header } from "../Header";
import { Player } from "../Player";
import { Sidebar } from "../Sidebar/Sidebar";
import { SidebarProvider } from "../Sidebar/SidebarProvider";
import { Layout } from "./Layout.types";
import { Flex } from "@src/components/Flex";

const Layout = React.memo((props: Layout) => {
  const { children, title, headerTitle, showPlay } = props;

  const { data: session } = useSession();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const opacity = useScrollOpacity(scrollContainerRef);

  return (
    <>
      <Head>
        <title>{title || "Spotify Clone"}</title>
      </Head>
      <div className="flex h-screen overflow-hidden bg-black p-2">
        <SidebarProvider>
          <Sidebar />
        </SidebarProvider>

        <div
          ref={scrollContainerRef}
          className="relative h-[90vh] flex-1 overflow-x-hidden overflow-y-scroll rounded-md bg-dark"
        >
          <Header headerTitle={headerTitle} opacity={opacity} />

          <div>{children}</div>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 w-full">
        {session?.user?.accessToken ? (
          <Player />
        ) : (
          <Flex className="w-full items-center justify-center">
            Please login with your Spotify Account
          </Flex>
        )}
      </div>
    </>
  );
});
Layout.displayName = "Layout";
export default React.memo(Layout);
