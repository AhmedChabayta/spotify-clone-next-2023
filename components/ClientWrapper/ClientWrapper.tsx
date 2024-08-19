import dynamic from "next/dynamic";

const ClientWrapper = dynamic(() => import("./Wrapper"), {
  ssr: false,
});

export default ClientWrapper;
