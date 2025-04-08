# Инструкция по настройке Strapi для GTARP Wiki

## 1. Установка и настройка Strapi

### 1.1 Установка Strapi
```bash
# Создаем новый проект Strapi
npx create-strapi-app@latest strapi-cms --quickstart

# Переходим в директорию проекта
cd strapi-cms
```

### 1.2 Настройка базы данных
1. Откройте файл `config/database.js`
2. Настройте подключение к вашей базе данных Supabase:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'your-supabase-host'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'postgres'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'your-supabase-password'),
      ssl: env.bool('DATABASE_SSL', true),
    },
  },
});
```

3. Создайте файл `.env` в корне проекта Strapi:
```
DATABASE_HOST=your-supabase-host
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-supabase-password
DATABASE_SSL=true
```

## 2. Создание структуры контента

### 2.1 Создание коллекций
1. Войдите в админ-панель Strapi (http://localhost:1337/admin)
2. Создайте следующие коллекции:

#### Vehicles (Транспорт)
- name (Text)
- description (Text)
- image (Media)
- price (Number)
- type (Enum: car, bike, truck, boat, plane)
- speed (Number)
- acceleration (Number)
- handling (Number)
- braking (Number)
- traction (Number)

#### Realty (Недвижимость)
- name (Text)
- description (Text)
- image (Media)
- price (Number)
- location (Text)
- type (Enum: apartment, house, business)
- rooms (Number)
- area (Number)

#### Businesses (Бизнесы)
- name (Text)
- description (Text)
- image (Media)
- price (Number)
- type (Enum: small, medium, large)
- income (Number)
- requirements (Text)

#### Jobs (Работы)
- name (Text)
- description (Text)
- image (Media)
- salary (Number)
- requirements (Text)
- type (Enum: legal, illegal)

#### Factions (Фракции)
- name (Text)
- description (Text)
- image (Media)
- type (Enum: legal, illegal)
- requirements (Text)
- benefits (Text)

### 2.2 Настройка прав доступа
1. В админ-панели перейдите в Settings > Users & Permissions Plugin
2. Настройте роли и разрешения:
   - Public: разрешить чтение для всех коллекций
   - Authenticated: разрешить чтение и создание для определенных коллекций
   - Admin: полный доступ ко всем коллекциям

## 3. Интеграция с Next.js

### 3.1 Установка зависимостей
```bash
# В вашем Next.js проекте
npm install @strapi/strapi
```

### 3.2 Создание API клиента
Создайте файл `lib/strapi.js`:

```javascript
import { createClient } from '@strapi/strapi';

const strapi = createClient({
  url: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337',
  prefix: '/api',
  store: {
    key: 'strapi_jwt',
    useLocalStorage: false,
    cookieOptions: { path: '/' },
  },
  axiosOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

export default strapi;
```

### 3.3 Обновление компонентов
Пример обновления компонента для отображения транспорта:

```javascript
// components/vehicles-list.jsx
import { useEffect, useState } from 'react';
import strapi from '@/lib/strapi';

export default function VehiclesList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await strapi.find('vehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="bg-card rounded-lg overflow-hidden shadow-md">
          <img 
            src={vehicle.image.url} 
            alt={vehicle.name} 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg">{vehicle.name}</h3>
            <p className="text-muted-foreground">{vehicle.description}</p>
            <p className="mt-2 font-semibold">${vehicle.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 4. Развертывание на сервере

### 4.1 Подготовка к деплою
1. Создайте файл `config/server.js`:
```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ['your-key-1', 'your-key-2']),
  },
});
```

2. Обновите `.env` для продакшена:
```
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
DATABASE_HOST=your-production-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-db-user
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=true
```

### 4.2 Деплой на сервер
1. Соберите проект:
```bash
npm run build
```

2. Запустите в продакшн режиме:
```bash
npm run start
```

### 4.3 Настройка CI/CD (опционально)
1. Создайте GitHub Actions workflow для автоматического деплоя
2. Настройте автоматическое обновление базы данных
3. Настройте резервное копирование данных

## 5. Резервное копирование данных

### 5.1 Автоматическое резервное копирование
1. Настройте регулярное резервное копирование базы данных
2. Сохраняйте медиафайлы в облачном хранилище (например, AWS S3)

### 5.2 Ручное резервное копирование
```bash
# Экспорт данных
strapi export

# Импорт данных
strapi import
```

## 6. Мониторинг и поддержка

### 6.1 Мониторинг
1. Настройте логирование
2. Настройте уведомления об ошибках
3. Мониторинг производительности

### 6.2 Обновление
1. Регулярно обновляйте Strapi до последней версии
2. Проверяйте совместимость с вашими плагинами
3. Тестируйте обновления в тестовой среде перед применением в продакшене

## 7. Безопасность

### 7.1 Настройка безопасности
1. Настройте CORS
2. Настройте rate limiting
3. Настройте SSL/TLS
4. Регулярно обновляйте зависимости

### 7.2 Аутентификация
1. Настройте JWT
2. Настройте OAuth (опционально)
3. Настройте двухфакторную аутентификацию

## 8. Оптимизация

### 8.1 Кэширование
1. Настройте кэширование API
2. Настройте кэширование медиафайлов
3. Используйте CDN для статических файлов

### 8.2 Производительность
1. Оптимизируйте запросы к базе данных
2. Используйте пагинацию
3. Оптимизируйте изображения 

cd /Users/kairslamov/Desktop/strapi-cms
npm run develop 