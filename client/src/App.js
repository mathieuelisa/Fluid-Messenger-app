import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelList } from "stream-chat-react";
import "stream-chat-css/dist/css/index.css";
import "./app.css";
import Auth from "./Components/Authentification/Authentification";
import MessagesContainer from "./Components/MessagesContainer/MessagesContainer";

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

function App() {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    // Users
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: "dave-matthews",
            name: "Dave Matthews",
          },
          process.env.REACT_APP_USER_TOKEN
        );

        // Channel
        const channel = await client.channel("gaming", "gaming-chat", {
          name: "Fluid messaging for privates messages",
        });
        setChannel(channel);

        setClientReady(true);
      } catch (error) {
        console.log(error);
      }
    };

    setupClient();
  }, []);

  if (!clientReady) return null;

  let auth = true;
  return (
    <>
      {!auth ? (
        <Auth />
      ) : (
        <Chat client={client} darkMode={true}>
          <ChannelList filters={filters} sort={sort} options={options} />
          <Channel channel={channel}>
            <MessagesContainer />
          </Channel>
        </Chat>
      )}
    </>
  );
}

export default App;
