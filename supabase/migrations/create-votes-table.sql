-- Создание таблицы для лайков/дизлайков
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('like', 'dislike')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Уникальный индекс для предотвращения дублирования голосов
  UNIQUE(user_id, content_id, content_type)
);

-- Добавление политик безопасности
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Политика для чтения (только свои голоса)
CREATE POLICY "Пользователи могут видеть свои голоса" 
ON public.votes 
FOR SELECT 
USING (auth.uid() = user_id);

-- Политика для вставки (только авторизованные пользователи)
CREATE POLICY "Пользователи могут голосовать" 
ON public.votes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Политика для обновления (только свои голоса)
CREATE POLICY "Пользователи могут обновлять свои голоса" 
ON public.votes 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Политика для удаления (только свои голоса)
CREATE POLICY "Пользователи могут удалять свои голоса" 
ON public.votes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Создание индексов для оптимизации запросов
CREATE INDEX votes_content_idx ON public.votes(content_id, content_type);
CREATE INDEX votes_user_idx ON public.votes(user_id);

