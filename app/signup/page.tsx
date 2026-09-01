 "use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Signup() {
  const [message,setMessage] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMessage("");
    const f = new FormData(e.currentTarget);
    const email=String(f.get("email")), password=String(f.get("password"));
    const supabase=createClient();
    const { error }=await supabase.auth.signUp({email,password});
    setMessage(error ? error.message : "Check your email to confirm your account.");
  }
  return <main className="wrap"><p className="eyebrow">JOIN KITAABIA</p><h1>Create account</h1>
    <form className="form" onSubmit={submit}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" minLength={8} placeholder="Password (8+ characters)" required />
      <button className="btn gold">Create account</button>
    </form>
    {message && <p className={message.startsWith("Check")?"success":"error"}>{message}</p>}
    <p>Already have an account? <Link href="/login">Sign in</Link></p>
  </main>;
}
