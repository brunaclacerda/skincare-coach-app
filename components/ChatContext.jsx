import { useContext, createContext, useState } from "react";

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export function ChatProvider({ children }) {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        selectChat: (chat) => {
          setSelectedChat(chat);
        },
        closeChat: () => {
          setSelectedChat(null);
        },
        selectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
