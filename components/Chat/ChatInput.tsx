import { Message } from "@/types";
import { IconArrowUp,IconMicrophone } from "@tabler/icons-react";
import { FC, KeyboardEvent, useRef, useState } from "react";

interface Props {
  onSend: (message: Message) => void;
}

export const ChatInput: FC<Props> = ({ onSend }) => {
  const [content, setContent] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSend = () => {
    if (!content.trim()) return;
    onSend({ role: "user", content });
    setContent("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Speech-to-Text Input
  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
      setContent(event.results[0][0].transcript);
    };
    recognition.start();
  };

  return (
    <div className="relative flex items-center rounded-lg border border-gray-300 p-2 bg-white">
      <textarea
        ref={textareaRef}
        className="flex-1 min-h-[44px] pl-4 pr-12 py-2 w-full focus:outline-none focus:ring-1 focus:ring-neutral-300 border-none"
        style={{ resize: "none" }}
        placeholder="Type a message..."
        value={content}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button onClick={startListening} className="ml-2 bg-gray-500 text-white p-2 rounded-full">
        <IconMicrophone className="h-6 w-6" />
      </button>

      <button onClick={handleSend} className="ml-2 bg-blue-500 text-white p-2 rounded-full">
        <IconArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};
