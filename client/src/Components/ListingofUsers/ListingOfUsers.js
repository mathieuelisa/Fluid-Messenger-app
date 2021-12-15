import { useEffect, useState } from "react";
import "./styles.css";
import { GiAndroidMask } from "react-icons/gi";

const ListingOfUsers = ({ users }) => {
  const [userVisibility, setUserVisibility] = useState(true);

  const handleVisibility = () => {
    console.log("clicked");
    setUserVisibility((userVisibility) => !userVisibility);
  };
  return (
    <div>
      <h3 onClick={handleVisibility} className="user-title">
        Users connected and online
      </h3>
      {userVisibility &&
        users?.map((user) => (
          <div className="users-wrapper">
            <GiAndroidMask />
            <p key={user.id} className="users">
              {user.name}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ListingOfUsers;
