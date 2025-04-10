-- Проверяем существование типа user_role и создаем если нет
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin');
    END IF;
END $$;

-- Добавляем колонку role, если её нет
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'role'
    ) THEN
        ALTER TABLE users ADD COLUMN role text DEFAULT 'user';
        -- Сначала добавляем как text, потом сконвертируем
        ALTER TABLE users ALTER COLUMN role TYPE user_role USING role::user_role;
    END IF;
END $$;

-- Назначаем роль админа
UPDATE users 
SET role = 'admin' 
WHERE email = 'arhey575@gmail.com';

-- Проверяем результат
SELECT email, role FROM users WHERE email = 'arhey575@gmail.com'; 