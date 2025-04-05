import { useState } from 'react';

export default function MessagesPage() {
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/messages?query=${search}`);
    const data = await response.json();
    setMessages(data);
  };

  return (
    <div>
      <h1>Личные сообщения</h1>
      <input
        type="text"
        placeholder="Поиск по ID или никнейму"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Искать</button>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}