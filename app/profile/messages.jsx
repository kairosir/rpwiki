import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };

    const fetchMessages = async () => {
      const { data, error } = await supabase.from("messages").select("*").eq("receiver_id", userId);
      if (!error) {
        setMessages(data);
      }
    };

    if (!userId) {
      fetchUserId();
    } else {
      fetchMessages();
    }
  }, [userId, supabase]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("messages").insert({
      content: newMessage,
      receiver_id: userId,
    });

    if (!error) {
      setMessages((prev) => [...prev, { content: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <h1>Сообщения</h1>
      <div className="space-y-4">
        <div className="h-64 overflow-y-auto border rounded p-4 bg-muted">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
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