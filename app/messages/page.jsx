"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagesPage() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "User1" },
    { id: 2, name: "User2" },
    { id: 3, name: "User3" },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, sender: "User1", content: "Привет! Как дела?" },
    { id: 2, sender: "Вы", content: "Все отлично, спасибо!" },
  ]);
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Список контактов */}
        <div className="col-span-1 border rounded p-4 bg-muted">
          <h2 className="text-xl font-bold mb-4">Контакты</h2>
          <ul className="space-y-2">
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className={`p-2 rounded cursor-pointer ${
                  selectedContact.id === contact.id ? "bg-primary text-white" : "hover:bg-accent"
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                {contact.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Чат */}
        <div className="col-span-2 border rounded p-4 bg-muted">
          <h2 className="text-xl font-bold mb-4">Чат с {selectedContact.name}</h2>
          <div className="h-64 overflow-y-auto border rounded p-4 bg-white mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
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

      {/* Дополнительный контент */}
      <div className="mt-8 bg-muted/30 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Советы по общению</h2>
        <ul className="list-disc pl-6 text-muted-foreground">
          <li>Будьте вежливы и уважайте собеседника.</li>
          <li>Избегайте спама и оскорблений.</li>
          <li>Используйте чат для конструктивного общения.</li>
        </ul>
      </div>
    </div>
  );
}