-- Сначала сделаем вас админом
UPDATE users SET role = 'admin' WHERE id = 49;

-- Создаем временную последовательность
CREATE SEQUENCE temp_user_id_seq START WITH 0;

-- Создаем временную таблицу с новыми ID
CREATE TABLE temp_users AS
SELECT 
    nextval('temp_user_id_seq') as new_id,
    id as old_id,
    email,
    username,
    password,
    role,
    created_at,
    updated_at,
    last_login
FROM users
ORDER BY created_at;

-- Обновляем все связанные таблицы
UPDATE content SET created_by = t.new_id
FROM temp_users t
WHERE content.created_by = t.old_id;

UPDATE ads SET created_by = t.new_id
FROM temp_users t
WHERE ads.created_by = t.old_id;

-- Удаляем старую таблицу и переименовываем новую
DROP TABLE users;
ALTER TABLE temp_users RENAME TO users;

-- Пересоздаем sequence для users
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq START WITH 0;
ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq');
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users)); 