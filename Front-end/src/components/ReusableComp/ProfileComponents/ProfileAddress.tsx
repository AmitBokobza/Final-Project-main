import { FunctionComponent } from "react";
import User from "../../../interfaces/User";

interface ProfileAddressProps {
  loggedUser?: User;
}

const ProfileAddress: FunctionComponent<ProfileAddressProps> = ({
  loggedUser
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Street</div>
          <div className="font-medium">
            {loggedUser?.address.street}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">City</div>
          <div className="font-medium">
            {loggedUser?.address.city}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Country
          </div>
          <div className="font-medium">
            {loggedUser?.address.country}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileAddress;
