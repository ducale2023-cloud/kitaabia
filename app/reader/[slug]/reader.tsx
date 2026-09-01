"use client";
import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Reader({bookId,title,url,userId}:{bookId:string;title:string;url:string;userId:string|null}) {
  const timer = useRef<number|null>(null);
  useEffect(() => {
    if (!userId) return;
    const supabase = createClient();
    timer.current = window.setInterval(async () => {
      await supabase.from("user_books").upsert({
        user_id:userId, book_id:bookId, progress_seconds:0, progress_percent:0, last_read_at:new Date().toISOString()
      });
    }, 30000);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [bookId,userId]);
  return <main className="reader"><header><strong>{title}</strong></header>
    <iframe src={url} title={title} className="readerFrame" />
  </main>;
}
