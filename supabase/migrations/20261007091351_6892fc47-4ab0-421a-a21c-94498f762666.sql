DROP POLICY IF EXISTS "Anyone can submit developer messages" ON public.developer_messages;
CREATE POLICY "Anyone can submit valid developer messages"
ON public.developer_messages FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
  AND char_length(btrim(message)) BETWEEN 1 AND 5000
  AND coalesce(array_length(attachment_paths, 1), 0) <= 5
);

DROP POLICY IF EXISTS "Anyone can read attachments" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload attachments" ON storage.objects;
CREATE POLICY "Anyone can upload uniquely named attachments"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'developer-message-attachments'
  AND name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[A-Za-z0-9]{1,10}$'
);