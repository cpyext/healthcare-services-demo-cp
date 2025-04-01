import { useEffect, useState } from "react";
import { ChatHeadlessProvider } from "@yext/chat-headless-react";
import { ChatPopUp } from "@yext/chat-ui-react";
import { chatConfig } from "./search/config";
import "@yext/chat-ui-react/bundle.css";

const ChatWidget = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (
    !isClient ||
    !import.meta.env.YEXT_PUBLIC_CHAT_APIKEY ||
    !import.meta.env.YEXT_PUBLIC_CHAT_BOTID
  ) {
    return null;
  }

  return (
    <ChatHeadlessProvider config={chatConfig}>
      <ChatPopUp
        title="Support"
        showFeedbackButtons={true}
        showTimestamp={true}
        stream={false}
        customCssClasses={{
          buttonIcon: "text-secondary",
          button: "!bg-none !bg-secondary",
          panelCssClasses: {
            messageBubbleCssClasses: {
              bubble__user: "!bg-none !bg-primary border ",
              bubble__bot: "!bg-none !bg-secondary",
              text__user: "!text-secondary",
              text__bot: "!text-primary",
            },
            container: "!bg-none bg-accent",
            inputCssClasses: {
              sendButton: "!bg-none disabled:!bg-secondary !bg-secondary",
              textArea:
                "!text-secondary focus-visible:outline focus-visible:outline-secondary",
            },
          },
          headerCssClasses: {
            container: "!bg-none !bg-secondary",
            title: "overflow-hidden !text-primary",
          },
        }}
      />
    </ChatHeadlessProvider>
  );
};

export default ChatWidget;
