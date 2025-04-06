import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "User1", content: "Привет! Как дела?" },
    { id: 2, sender: "User2", content: "Все отлично, спасибо! А у тебя?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "Вы", content: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Сообщения</h1>
      <div className="space-y-4">
        <div className="h-64 overflow-y-auto border rounded p-4 bg-muted">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <p className="font-bold text-sm">{msg.sender}:</p>
              <p className="text-sm">{msg.content}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Введите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage}>Отправить</Button>
        </div>
      </div>
    </div>
  );
}