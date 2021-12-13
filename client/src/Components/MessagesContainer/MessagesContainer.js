import "./styles.css";
import {
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { useCookies } from "react-cookie";

function MessagesContainer() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const logout = () => {
    removeCookie("name", cookies.username);
    removeCookie("hashPassword", cookies.hashPassword);
    removeCookie("userId", cookies.userId);
    removeCookie("authtoken", cookies.myTokenId);

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
      </Window>
      <Thread />
    </>
  );
}

export default MessagesContainer;
