import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: true });
      if (!error) {
        setMessages(data);
      }
    };

    fetchMessages();
  }, [supabase]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("messages").insert({ content: newMessage });
    if (!error) {
      setMessages((prev) => [...prev, { content: newMessage, created_at: new Date().toISOString() }]);
      setNewMessage("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Личные сообщения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto border rounded p-4 bg-muted">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
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
        </CardContent>
      </Card>
    </div>
  );
}