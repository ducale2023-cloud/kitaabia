import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Library() {
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return <main className="wrap"><h1>My Library</h1><p>Please sign in to access your library.</p><Link href="/login">Sign in →</Link></main>;
  const {data}=await supabase.from("user_books").select("progress,books(title,slug,author)").eq("user_id",user.id).order("last_read_at",{ascending:false});
  return <main className="wrap"><p className="eyebrow">YOUR SPACE</p><h1>My Library</h1><div className="grid">{(data||[]).map((x:any)=><article className="card" key={x.books.slug}><h3>{x.books.title}</h3><p>{x.books.author}</p><p className="muted">{x.progress}% complete</p><Link href={`/books/${x.books.slug}`}>Open →</Link></article>)}</div></main>;
}
