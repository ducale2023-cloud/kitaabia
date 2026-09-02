import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MobileNav } from "../../page";

export default async function BookPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const supabase=await createClient(); const {data:book}=await supabase.from("books").select("*").eq("slug",slug).eq("is_published",true).single(); if(!book)notFound();
 const cover=book.cover_path?supabase.storage.from("book-covers").getPublicUrl(book.cover_path).data.publicUrl:null;
 return <div className="site-shell"><header className="site-header"><Link href="/" className="logo"><span className="logo-mark">▥</span><span>Book Library</span></Link><nav className="desktop-nav"><Link href="/">Home</Link><Link href="/books">Categories</Link><Link href="/library">My Library</Link><Link href="/books">Popular</Link></nav><div className="header-actions"><Link href="/login" className="avatar">👤</Link></div></header>
 <main className="detail-page"><div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/books">Self-Development</Link><span>›</span><strong>{book.title}</strong></div><section className="detail-card"><div className="detail-cover">{cover?<img src={cover} alt=""/>:<div className="cover-placeholder">▥</div>}</div><div className="detail-info"><p className="hero-kicker">{book.access_type.toUpperCase()}</p><h1>{book.title}</h1><h2>{book.author}</h2><div className="rating">★★★★★ <span>4.8 (12.5K reviews)</span></div><div className="chips"><span>Self-Development</span><span>Productivity</span></div><div className="meta-grid"><span>▤ <b>{book.pages??"—"}</b> Pages</span><span>◎ English</span><span>▧ {book.format?.toUpperCase()}</span></div><div className="detail-actions"><Link href={`/reader/${book.slug}`} className="primary-btn">Read Now</Link><Link href="/library" className="outline-btn">♡ Add to My Library</Link></div><div className="about"><h3>About the Book</h3><p>{book.description || "A thoughtful book to help you learn, grow, and build better habits."}</p></div></div></section></main><MobileNav active="books"/></div>
}
