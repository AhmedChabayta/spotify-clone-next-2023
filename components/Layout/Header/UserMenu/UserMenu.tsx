import { UserMenu } from "./UserMenu.types";
import { USER_MENU_CONSTS } from "./UserMenu.constants";
import { useClickOutside } from "@src/hooks";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

const UserMenuComponent = (props: UserMenu) => {
  const { showUserMenu, setShowUserMenu } = props;
  return (
    <>
      {showUserMenu && (
        <div className="absolute right-0 top-[100%] mt-2 flex w-52 flex-col space-y-2 rounded bg-neutral-900 p-1 text-gray-300">
          {USER_MENU_CONSTS.map(({ title, Icon }) => (
            <div
              onClick={title === "Logout" ? () => signOut() : () => {}}
              key={title}
              className="flex items-center justify-between p-2 last:border-t last:border-gray-500 hover:bg-neutral-700"
            >
              <p>{title}</p>
              {Icon && <Icon className="w-4" />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserMenuComponent;
