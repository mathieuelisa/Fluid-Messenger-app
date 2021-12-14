import "./styles.css";
import {
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { useCookies } from "react-cookie";
import ListingOfUsers from "../ListingofUsers/ListingOfUsers.js";

function MessagesContainer({ users }) {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const logout = () => {
    removeCookie("name", cookies.username);
    removeCookie("hashPassword", cookies.hashPassword);
    removeCookie("userId", cookies.userId);
    removeCookie("authtoken", cookies.token);

    window.location.reload();
  };

  return (
    <>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
        <button className="button-logout" onClick={logout}>
          Logout
        </button>
        <ListingOfUsers users={users} />
      </Window>
      <Thread />
    </>
  );
}

export default MessagesContainer;
