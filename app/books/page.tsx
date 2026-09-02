import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MobileNav } from "../page";

export default async function Books(){
 const supabase=await createClient();
 const {data:books,error}=await supabase.from("books").select("id,title,slug,author,description,cover_path,access_type").eq("is_published",true).order("created_at",{ascending:false});
 return <div className="site-shell"><header className="site-header"><Link href="/" className="logo"><span className="logo-mark">▥</span><span>Book Library</span></Link><nav className="desktop-nav"><Link href="/">Home</Link><Link href="/books">Categories</Link><Link href="/library">My Library</Link><Link href="/books">Popular</Link></nav><div className="header-actions"><Link className="search-pill" href="/books">⌕ <span>Search books...</span></Link><Link href="/login" className="avatar">👤</Link></div></header>
 <main className="library-page"><div className="page-title"><div><p className="hero-kicker">KITAABIA LIBRARY</p><h1>Discover books</h1></div><Link href="/admin" className="outline-btn">Admin</Link></div><div className="filter-bar"><span>All books</span><span>Self-Development</span><span>History</span><span>Islamic</span><span>Business</span></div>{error?<p className="error">Could not load the library.</p>:<div className="book-grid">{(books??[]).map((b:any)=>{const cover=b.cover_path?supabase.storage.from("book-covers").getPublicUrl(b.cover_path).data.publicUrl:null;return <article className="catalog-card" key={b.id}><Link href={`/books/${b.slug}`} className="catalog-cover">{cover?<img src={cover} alt=""/>:<div className="cover-placeholder">▥</div>}</Link><div className="catalog-info"><h3>{b.title}</h3><p>{b.author}</p><span className="tag">{b.access_type}</span><Link href={`/books/${b.slug}`} className="text-link">View book →</Link></div></article>})}</div>}</main><MobileNav active="books"/></div>
}
