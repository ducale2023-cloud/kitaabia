import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminUpload from "./upload";
import LogoutButton from "@/app/components/logout-button";

export default async function Admin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="wrap">
        <p className="eyebrow">KITAABIA</p>
        <h1>Admin</h1>
        <p>Sign in first.</p>
        <Link className="btn gold" href="/login">Go to sign in</Link>
      </main>
    );
  }

  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (role?.role !== "admin") {
    return (
      <main className="wrap">
        <p className="eyebrow">KITAABIA MANAGEMENT</p>
        <h1>Access denied</h1>
        <p>Your signed-in account is not an administrator yet.</p>
        <p><strong>Account:</strong> {user.email}</p>
        <Link href="/books">Back to books</Link>
      </main>
    );
  }

  const { count } = await supabase.from("books").select("*", { count: "exact", head: true });
  const { data: categories } = await supabase.from("categories").select("id,name").order("name");

  return (
    <main className="wrap">
      <div className="actions"><LogoutButton /></div>
      <p className="eyebrow">MANAGEMENT</p>
      <h1>Library dashboard</h1>
      <div className="card"><h2>{count ?? 0}</h2><p>Published/draft books</p></div>
      <AdminUpload categories={categories ?? []} />
    </main>
  );
}
