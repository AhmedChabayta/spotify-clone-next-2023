import { GetServerSideProps } from "next";
import { Provider } from "next-auth/providers";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import { LOGIN_CONSTANTS } from "@src/assets/login.constants";

const Login = ({ providers }: { providers: Provider | Provider[] }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image className="mb-5 w-52" src={LOGIN_CONSTANTS.logo} alt="" />
      {Object.values(providers).map((provider) => (
        <div key={provider?.id}>
          <button className="rounded bg-black px-5 py-2 text-2xl font-semibold text-white">
            {provider?.name}
          </button>
        </div>
      ))}
    </div>
  );
};
export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
