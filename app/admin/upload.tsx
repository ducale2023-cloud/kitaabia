"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminUpload({categories}:{categories:{id:string;name:string}[]}) {
 const [busy,setBusy]=useState(false),[msg,setMsg]=useState("");
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault(); setBusy(true); setMsg(""); const f=new FormData(e.currentTarget);
  const cover=f.get("cover") as File, ebook=f.get("ebook") as File;
  const supabase=createClient(); const slug=String(f.get("slug"));
  const coverPath=`${crypto.randomUUID()}-${cover.name.replace(/[^a-zA-Z0-9._-]/g,"-")}`;
  const ebookPath=`${crypto.randomUUID()}-${ebook.name.replace(/[^a-zA-Z0-9._-]/g,"-")}`;
  const c=await supabase.storage.from("book-covers").upload(coverPath,cover,{upsert:false});
  if(c.error){setMsg(c.error.message);setBusy(false);return;}
  const p=await supabase.storage.from("ebooks").upload(ebookPath,ebook,{upsert:false});
  if(p.error){setMsg(p.error.message);setBusy(false);return;}
  const {error}=await supabase.from("books").insert({
   title:String(f.get("title")),slug,author:String(f.get("author")),description:String(f.get("description")||""),
   category_id:String(f.get("category_id")||"")||null,cover_path:coverPath,ebook_path:ebookPath,
   format:String(f.get("format")),access_type:String(f.get("access_type")),is_published:f.get("is_published")==="on",
   featured:f.get("featured")==="on",published_at:f.get("is_published")==="on"?new Date().toISOString():null
  });
  setMsg(error?error.message:"Book uploaded successfully."); setBusy(false);
  if(!error) (e.target as HTMLFormElement).reset();
 }
 return <form className="card form" onSubmit={submit}>
  <h2>Add a book</h2><input name="title" required placeholder="Book title"/><input name="slug" required placeholder="book-slug"/>
  <input name="author" required placeholder="Author"/><textarea name="description" placeholder="Description"/>
  <select name="category_id"><option value="">No category</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
  <select name="format"><option value="pdf">PDF</option><option value="epub">EPUB</option></select>
  <select name="access_type"><option value="free">Free</option><option value="premium">Premium</option></select>
  <label>Cover <input name="cover" type="file" accept="image/*" required/></label>
  <label>eBook <input name="ebook" type="file" accept=".pdf,.epub,application/pdf" required/></label>
  <label><input name="is_published" type="checkbox"/> Publish immediately</label>
  <label><input name="featured" type="checkbox"/> Featured</label>
  <button className="button" disabled={busy}>{busy?"Uploading…":"Upload book"}</button>{msg&&<p>{msg}</p>}
 </form>;
}
