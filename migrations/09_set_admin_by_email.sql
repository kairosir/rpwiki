-- Назначаем роль админа по email
UPDATE users SET role = 'admin' WHERE email = 'arhey575@gmail.com';

-- Проверяем, что роль назначена
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'arhey575@gmail.com' AND role = 'admin') THEN
        RAISE EXCEPTION 'Не удалось назначить роль админа';
    END IF;
END $$; 