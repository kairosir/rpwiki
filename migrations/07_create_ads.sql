-- Создаем enum для статусов рекламы
CREATE TYPE ad_status AS ENUM ('active', 'inactive');

-- Создаем таблицу рекламы
CREATE TABLE ads (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    image_url TEXT,
    status ad_status NOT NULL DEFAULT 'inactive',
    views INTEGER NOT NULL DEFAULT 0,
    clicks INTEGER NOT NULL DEFAULT 0,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE
);

-- Создаем индексы
CREATE INDEX idx_ads_status ON ads(status);
CREATE INDEX idx_ads_created_by ON ads(created_by);
CREATE INDEX idx_ads_dates ON ads(start_date, end_date);

-- Создаем функцию для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_ads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Создаем триггер для автоматического обновления updated_at
CREATE TRIGGER update_ads_updated_at
    BEFORE UPDATE ON ads
    FOR EACH ROW
    EXECUTE FUNCTION update_ads_updated_at(); 