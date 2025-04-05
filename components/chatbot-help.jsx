"use client"

import { useState } from "react"
import { Bot, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Простые ответы для демонстрации
const botResponses = {
  привет: "Привет! Я бот-помощник по RP. Чем могу помочь?",
  "как начать":
    "Чтобы начать играть в RP, выберите проект, зарегистрируйтесь на сервере и изучите основные правила. Рекомендую прочитать наши гайды для новичков!",
  "что такое rp":
    "RP (RolePlay) - это отыгрыш роли персонажа в виртуальном мире. Вы создаете персонажа и живете его жизнью, взаимодействуя с другими игроками.",
  "как заработать":
    "Новичкам доступны простые работы: таксист, курьер, грузчик. С опытом вы сможете открыть бизнес или вступить во фракцию с высокой зарплатой.",
  правила:
    "Основные правила RP: отыгрывайте роль реалистично, не нарушайте игровой процесс других игроков, следуйте указаниям администрации и соблюдайте правила сервера.",
}

export function ChatbotHelp() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Привет! Я бот-помощник по RP. Задайте мне вопрос, например: 'Как начать?', 'Что такое RP?', 'Как заработать?'",
    },
  ])

  const handleSend = () => {
    if (!message.trim()) return

    // Добавляем сообщение пользователя
    setChat((prev) => [...prev, { sender: "user", text: message }])

    // Ищем ответ
    const userMsg = message.toLowerCase()
    let botReply =
      "Извините, я не знаю ответа на этот вопрос. Попробуйте спросить о том, как начать играть, что такое RP или как заработать."

    // Проверяем ключевые слова
    for (const [key, response] of Object.entries(botResponses)) {
      if (userMsg.includes(key)) {
        botReply = response
        break
      }
    }

    // Добавляем ответ бота с небольшой задержкой
    setTimeout(() => {
      setChat((prev) => [...prev, { sender: "bot", text: botReply }])
    }, 500)

    setMessage("")
  }

  return (
    <div className="relative">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)} className="w-full flex items-center gap-2">
          <Bot className="h-4 w-4" />
          <span>Задать вопрос боту</span>
        </Button>
      ) : (
        <div className="bg-card rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary p-3 flex justify-between items-center">
            <div className="flex items-center gap-2 text-primary-foreground">
              <Bot className="h-5 w-5" />
              <span className="font-medium">RP Помощник</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-3">
            {chat.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Задайте вопрос..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

