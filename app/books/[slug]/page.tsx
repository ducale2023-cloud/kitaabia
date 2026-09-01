import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BookPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: book } = await supabase.from("books").select("*").eq("slug", slug).eq("is_published", true).single();
  if (!book) notFound();
  const cover = book.cover_path ? supabase.storage.from("book-covers").getPublicUrl(book.cover_path).data.publicUrl : null;
  return <main className="wrap">
    <Link href="/books">← All books</Link>
    <section className="bookHero">
      {cover && <img className="bookCover" src={cover} alt="" />}
      <div><p className="eyebrow">{book.access_type.toUpperCase()}</p><h1>{book.title}</h1><h2>{book.author}</h2>
      <p className="muted">{book.description}</p>
      <Link className="button" href={`/reader/${book.slug}`}>Read now →</Link></div>
    </section>
  </main>;
}
