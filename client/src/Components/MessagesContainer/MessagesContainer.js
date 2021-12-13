import {
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

function MessagesContainer() {
  const logout = () => {
    console.log("you're logout");
  };

  return (
    <>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
        <button onClick={logout}>Logout</button>
      </Window>
      <Thread />
    </>
  );
}

export default MessagesContainer;
