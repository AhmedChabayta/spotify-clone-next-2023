import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../css/globals.css";
import { RecoilRoot } from "recoil";
import { Layout } from "@src/components";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </SessionProvider>
  );
};

export default App;
