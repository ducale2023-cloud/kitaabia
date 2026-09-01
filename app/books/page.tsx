import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Books() {
  const supabase = await createClient();
  const { data: books, error } = await supabase
    .from("books")
    .select("id,title,slug,author,description,cover_path,access_type")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return <main className="wrap">
    <p className="eyebrow">KITAABIA LIBRARY</p><h1>Explore books</h1>
    {error ? <p className="error">Could not load the library.</p> :
      <div className="grid">{(books ?? []).map((b:any) =>
        <article className="card" key={b.id}>
          {b.cover_path && <img className="cover" src={supabase.storage.from("book-covers").getPublicUrl(b.cover_path).data.publicUrl} alt="" />}
          <h3>{b.title}</h3><p>{b.author}</p><p className="muted">{b.description}</p>
          <Link href={`/books/${b.slug}`}>View book →</Link>
        </article>)}</div>}
  </main>;
}
