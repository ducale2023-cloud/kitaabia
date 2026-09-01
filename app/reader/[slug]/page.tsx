import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Reader from "./reader";

export default async function ReaderPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: book } = await supabase.from("books").select("*").eq("slug", slug).eq("is_published", true).single();
  if (!book || !book.ebook_path) notFound();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user && book.access_type === "premium") return <main className="wrap"><h1>Sign in required</h1><p>This book requires an account.</p></main>;
  const { data: signed } = await supabase.storage.from("ebooks").createSignedUrl(book.ebook_path, 3600);
  if (!signed?.signedUrl) return <main className="wrap"><h1>Reader unavailable</h1><p>The eBook file is not accessible.</p></main>;
  return <Reader bookId={book.id} title={book.title} url={signed.signedUrl} userId={user?.id ?? null} />;
}
