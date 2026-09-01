import { createClient } from "@/lib/supabase/server";
import AdminUpload from "./upload";

export default async function Admin() {
  const supabase = await createClient();
  const { data:{user} } = await supabase.auth.getUser();
  if (!user) return <main className="wrap"><h1>Admin</h1><p>Sign in first.</p></main>;
  const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single();
  if (role?.role !== "admin") return <main className="wrap"><h1>Access denied</h1><p>Your account is not an administrator.</p></main>;
  const { count } = await supabase.from("books").select("*",{count:"exact",head:true});
  const { data: categories } = await supabase.from("categories").select("id,name").order("name");
  return <main className="wrap"><p className="eyebrow">MANAGEMENT</p><h1>Library dashboard</h1>
    <div className="card"><h2>{count ?? 0}</h2><p>Published/draft books</p></div>
    <AdminUpload categories={categories ?? []} />
  </main>;
}
