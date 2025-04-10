-- Сначала получаем текущее максимальное значение ID
SELECT setval('users_id_seq', 1, false);

-- Обновляем существующие ID, чтобы они шли по порядку
WITH RECURSIVE cte AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as new_id
  FROM users
)
UPDATE users
SET id = cte.new_id
FROM cte
WHERE users.id = cte.id;

-- Сбрасываем последовательность на следующее доступное значение
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users)); 