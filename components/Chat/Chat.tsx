import { FC, useEffect, useRef, useState } from "react";
import { Message } from "@/types";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ResetChat } from "./ResetChat";

const CHAT_HISTORY_KEY = "chat_history";

// get JSON response
const fetchReply = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch("/api/mockResponse.json");
    const data = await response.json();
    return data.reply || "I didn’t understand that.";
  } catch (error) {
    return "Oops! Something went wrong.";
  }
};

export const Chat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // load local chat history
  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // store chat history in localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (message: Message) => {
    setMessages((prev) => [...prev, message]);
    setLoading(true);

    const botReply = await fetchReply(message.content);
    setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    setLoading(false);
  };

  const handleReset = () => {
    setMessages([]);
    localStorage.removeItem(CHAT_HISTORY_KEY);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-8">
        <ResetChat onReset={handleReset} />
      </div>

      <div className="flex flex-col rounded-lg px-2 sm:p-4 sm:border border-neutral-300 h-[60vh] overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="my-1 sm:my-1.5">
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
        <ChatInput onSend={handleSend} />
      </div>
    </>
  );
};
