-- Создаем enum для ролей
CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin');

-- Добавляем колонку role в таблицу users
ALTER TABLE users ADD COLUMN role user_role NOT NULL DEFAULT 'user';

-- Создаем индекс для быстрого поиска по ролям
CREATE INDEX idx_users_role ON users(role);

-- Добавляем базовые права для ролей
CREATE TABLE role_permissions (
    id SERIAL PRIMARY KEY,
    role user_role NOT NULL,
    permission VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(role, permission)
);

-- Вставляем базовые права для каждой роли
INSERT INTO role_permissions (role, permission) VALUES
    -- Пользователь
    ('user', 'view_content'),
    ('user', 'create_account'),
    ('user', 'leave_comments'),
    ('user', 'like_content'),
    
    -- Модератор
    ('moderator', 'view_content'),
    ('moderator', 'create_account'),
    ('moderator', 'leave_comments'),
    ('moderator', 'like_content'),
    ('moderator', 'manage_content'),
    ('moderator', 'upload_images'),
    
    -- Админ
    ('admin', 'view_content'),
    ('admin', 'create_account'),
    ('admin', 'leave_comments'),
    ('admin', 'like_content'),
    ('admin', 'manage_content'),
    ('admin', 'upload_images'),
    ('admin', 'manage_users'),
    ('admin', 'manage_roles'),
    ('admin', 'manage_ads'); 