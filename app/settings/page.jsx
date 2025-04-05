import React from 'react';

export default function SettingsPage() {
  return (
    <div>
      <h1>Настройки пользователя</h1>
      <form>
        <label>Сменить пароль:</label>
        <input type="password" placeholder="Новый пароль" />
        <button type="submit">Сохранить</button>
      </form>
      <form>
        <label>Сменить аватар:</label>
        <input type="file" />
        <button type="submit">Загрузить</button>
      </form>
    </div>
  );
}