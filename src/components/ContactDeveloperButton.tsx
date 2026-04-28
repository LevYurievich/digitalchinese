import { useState, useRef } from "react";
import { MessageSquare, Paperclip, X, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB на файл
const BUCKET = "developer-message-attachments";

export function ContactDeveloperButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setFiles([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    const combined = [...files, ...selected];
    if (combined.length > MAX_FILES) {
      toast.error(`Максимум ${MAX_FILES} файлов`);
      return;
    }
    const oversized = selected.find((f) => f.size > MAX_FILE_SIZE);
    if (oversized) {
      toast.error(`Файл "${oversized.name}" больше 10 МБ`);
      return;
    }
    setFiles(combined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Заполните все обязательные поля");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Некорректный email");
      return;
    }

    setSubmitting(true);
    try {
      // Загрузка файлов в storage
      const uploaded: { name: string; url: string; path: string }[] = [];
      for (const file of files) {
        const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { contentType: file.type || undefined });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
        uploaded.push({ name: file.name, url: pub.publicUrl, path });
      }

      // Сохранение в БД
      const { error: insErr } = await supabase
        .from("developer_messages")
        .insert({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          attachment_paths: uploaded.map((u) => u.path),
        });
      if (insErr) throw insErr;

      // Отправка email
      const { error: fnErr } = await supabase.functions.invoke(
        "send-developer-message",
        {
          body: {
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            attachments: uploaded.map((u) => ({ name: u.name, url: u.url })),
          },
        },
      );
      if (fnErr) throw fnErr;

      toast.success("Сообщение отправлено! Проверьте почту — мы отправили подтверждение.");
      reset();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Не удалось отправить сообщение",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 z-40 shadow-lg rounded-full gap-2 h-12 px-5"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="hidden sm:inline">Написать разработчику</span>
      </Button>

      <Dialog open={open} onOpenChange={(o) => !submitting && setOpen(o)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Написать разработчику</DialogTitle>
            <DialogDescription>
              Поделитесь вопросом или пожеланием. Можно приложить до 5 файлов
              (до 10 МБ каждый).
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dev-name">Имя *</Label>
              <Input
                id="dev-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={200}
                disabled={submitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dev-email">Электронная почта *</Label>
              <Input
                id="dev-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={320}
                disabled={submitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dev-message">Вопрос или пожелание *</Label>
              <Textarea
                id="dev-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                maxLength={5000}
                disabled={submitting}
                required
              />
              <p className="text-xs text-muted-foreground text-right">
                {message.length}/5000
              </p>
            </div>

            <div className="space-y-2">
              <Label>Вложения ({files.length}/{MAX_FILES})</Label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                disabled={submitting || files.length >= MAX_FILES}
                className="hidden"
                id="dev-files"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={submitting || files.length >= MAX_FILES}
                className="w-full gap-2"
              >
                <Paperclip className="h-4 w-4" />
                Прикрепить файлы
              </Button>
              {files.length > 0 && (
                <ul className="space-y-1.5">
                  {files.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-2 text-sm bg-muted rounded-md px-3 py-2"
                    >
                      <span className="truncate flex-1" title={f.name}>
                        {f.name}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {(f.size / 1024).toFixed(0)} KB
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        disabled={submitting}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full gap-2"
              size="lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Отправить
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}