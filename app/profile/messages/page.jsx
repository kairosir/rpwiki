"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagesPage() {
  const [dialogs, setDialogs] = useState([
    { id: 1, avatar: "/placeholder.svg", name: "User1", lastMessage: "Привет! Как дела?", date: "10:30", unread: 2 },
    { id: 2, avatar: "/placeholder.svg", name: "User2", lastMessage: "Спасибо за помощь!", date: "Вчера", unread: 0 },
    { id: 3, avatar: "/placeholder.svg", name: "User3", lastMessage: "Когда будет готово?", date: "Понедельник", unread: 5 },
  ]);
  const [messages, setMessages] = useState([]);
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "Вы", content: newMessage, date: "Сейчас", type: "user" },
      ]);
      setNewMessage("");
    }
  };

  const handleSelectDialog = (dialog) => {
    setSelectedDialog(dialog);
    setMessages([]); // Очистка сообщений при переключении чата
    setDialogs((prev) =>
      prev.map((d) =>
        d.id === dialog.id ? { ...d, unread: 0 } : d // Сброс количества пропущенных сообщений
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Левая колонка со списком диалогов */}
      <div className="col-span-1 border rounded p-4 bg-muted">
        <h2 className="text-xl font-bold mb-4">Диалоги</h2>
        <ul className="space-y-2">
          {dialogs.map((dialog) => (
            <li
              key={dialog.id}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                selectedDialog?.id === dialog.id ? "bg-primary text-white" : "hover:bg-accent"
              }`}
              onClick={() => handleSelectDialog(dialog)}
            >
              <img src={dialog.avatar} alt={dialog.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <p className="font-medium truncate">{dialog.name}</p>
                <p className="text-sm text-muted-foreground truncate">{dialog.lastMessage}</p>
              </div>
              {dialog.unread > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {dialog.unread}
                </span>
              )}
              <span className="text-xs text-muted-foreground">{dialog.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Центральная часть с историей переписки */}
      <div className="col-span-2 border rounded p-4 bg-muted flex flex-col">
        <h2 className="text-xl font-bold mb-4">
          {selectedDialog ? `Чат с ${selectedDialog.name}` : "Выберите диалог"}
        </h2>
        <div className="flex-1 overflow-y-auto border rounded p-4 bg-muted mb-4">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="mb-4">
                <p className={`font-bold text-sm ${msg.type === "support" ? "text-blue-600" : "text-green-600"}`}>
                  {msg.sender} <span className="text-xs text-muted-foreground">{msg.date}</span>
                </p>
                <p className="text-sm">{msg.content}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Нет сообщений</p>
          )}
        </div>

        {/* Панель ввода нового сообщения */}
        <div className="flex gap-2">
          <Input
            placeholder="Введите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!selectedDialog}
          />
          <Button onClick={handleSendMessage} disabled={!selectedDialog}>
            Отправить
          </Button>
        </div>
      </div>

      {/* Правая колонка с информацией о пользователе */}
      <div className="col-span-1 border rounded p-4 bg-muted">
        <h2 className="text-xl font-bold mb-4">Информация</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Дата регистрации:</p>
            <p className="font-medium">15.05.2022</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Статус:</p>
            <p className="font-medium text-green-600">Онлайн</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Значки:</p>
            <div className="flex gap-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">VIP</span>
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">Новичок</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}