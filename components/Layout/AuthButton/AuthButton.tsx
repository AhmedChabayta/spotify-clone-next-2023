import {
  ClientSafeProvider,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const AuthButton = () => {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    fetchProviders();
  }, []);

  return (
    <>
      {/* <Image className="w-52 mb-5" src={LOGIN_CONSTANTS.logo} alt="" /> */}
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider?.id}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="rounded-full bg-black p-2 text-white"
            >
              <UserIcon className="w-7" />
            </button>
          </div>
        ))}
    </>
  );
};
export default AuthButton;
