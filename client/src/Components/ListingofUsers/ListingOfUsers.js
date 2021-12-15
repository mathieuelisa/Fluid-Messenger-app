import { useEffect, useState } from "react";
import "./styles.css";
import { GiAndroidMask } from "react-icons/gi";

const ListingOfUsers = ({ users }) => {
  const [userVisibility, setUserVisibility] = useState(true);
  const numberOfUser = users.length;

  console.log(numberOfUser);

  const handleVisibility = () => {
    console.log("clicked");
    setUserVisibility((userVisibility) => !userVisibility);
  };
  return (
    <div>
      <h3 onClick={handleVisibility} className="user-title">
        {`(${numberOfUser}) counts created`}
      </h3>
      {userVisibility &&
        users?.map((user) => (
          <div className="users__container">
            <div className="users-wrapper">
              <GiAndroidMask style={{ color: "green", size: "50px" }} />
              <p key={user.id} className="users">
                {user.name}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListingOfUsers;
