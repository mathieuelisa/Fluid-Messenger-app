import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

const channel = client.channel("aming", {
  name: "Create a Messaging for gamers",
  members: ["dave-matthews", "trey-anastasio"],
});

client.connect(
  {
    id: "dave-matthews",
    name: "Dave Matthews",
  },
  process.env.REACT_APP_USER_TOKEN
);

function App() {
  return (
    <div className="app__container">
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default App;
