 "use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [message,setMessage] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMessage("");
    const f = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(f.get("email")), password: String(f.get("password"))
    });
    setMessage(error ? error.message : "Signed in successfully.");
  }
  return <main className="wrap"><p className="eyebrow">KITAABIA ACCOUNT</p><h1>Sign in</h1>
    <form className="form" onSubmit={submit}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button className="btn gold">Sign in</button>
    </form>
    {message && <p className={message.includes("successfully")?"success":"error"}>{message}</p>}
    <p>New here? <Link href="/signup">Create an account</Link></p>
  </main>;
}
