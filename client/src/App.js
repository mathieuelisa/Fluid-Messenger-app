import "./app.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
// Stream dependencies
import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelList } from "stream-chat-react";
import "stream-chat-css/dist/css/index.css";

import Authentification from "./Components/Authentification/Authentification";
import MessagesContainer from "./Components/MessagesContainer/MessagesContainer";

const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [channel, setChannel] = useState(null);

  // Users
  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.userId,
          name: cookies.name,
          hashPassword: cookies.hashPassword,
        },
        cookies.authtoken
      );

      // Channel
      const channel = await client.channel("gaming", "gaming-chat", {
        name: "Fluid messaging for privates messages",
      });
      setChannel(channel);
    } catch (error) {
      console.log(error);
    }
  };

  if (cookies.authtoken) setupClient();

  const auth = cookies.authtoken;
  return (
    <>
      {!auth && <Authentification />}

      {auth && (
        <Chat client={client} darkMode={true}>
          <ChannelList />
          <Channel channel={channel}>
            <MessagesContainer />
          </Channel>
        </Chat>
      )}
    </>
  );
}

export default App;
