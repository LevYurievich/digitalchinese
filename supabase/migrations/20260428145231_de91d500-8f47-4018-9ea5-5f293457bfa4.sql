
-- Таблица для сообщений разработчику
CREATE TABLE public.developer_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  attachment_paths TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.developer_messages ENABLE ROW LEVEL SECURITY;

-- Любой (включая анонимов) может создать сообщение
CREATE POLICY "Anyone can submit developer messages"
ON public.developer_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Никто из клиентов не может читать сообщения (только сервис-роль через edge function)
-- (никаких SELECT-политик не создаём)

-- Storage bucket для вложений (публичный, чтобы ссылки работали в письме)
INSERT INTO storage.buckets (id, name, public)
VALUES ('developer-message-attachments', 'developer-message-attachments', true);

-- Любой может загружать файлы в этот bucket
CREATE POLICY "Anyone can upload attachments"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'developer-message-attachments');

-- Любой может читать (для публичных URL)
CREATE POLICY "Anyone can read attachments"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'developer-message-attachments');
