"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const f = new FormData(e.currentTarget);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });

    if (error) {
      setLoading(false);
      setMessage(error.message);
      return;
    }

    const user = data.user;
    if (!user) {
      setLoading(false);
      setMessage("Sign in succeeded, but no user session was returned.");
      return;
    }

    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    setMessage("Signed in successfully. Redirecting...");
    router.replace(role?.role === "admin" ? "/admin" : "/books");
    router.refresh();
  }

  return (
    <main className="wrap">
      <p className="eyebrow">KITAABIA ACCOUNT</p>
      <h1>Sign in</h1>
      <form className="form" onSubmit={submit}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button className="btn gold" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      {message && (
        <p className={message.includes("successfully") ? "success" : "error"}>
          {message}
        </p>
      )}
      <p>New here? <Link href="/signup">Create an account</Link></p>
    </main>
  );
}
