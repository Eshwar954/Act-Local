import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth.jsx";

export default function Login(){
  const { signIn } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e){
    e.preventDefault();
    setMsg("");
    if (!email || !password) { setMsg("Email and password are required"); return; }
    setLoading(true);
    try {
      await signIn({ email, password });
      nav("/profile");
    } catch (err) {
      setMsg(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container panel" style={{marginTop:24}}>
      <div className="hero"><h1>Sign in</h1><div className="sub">Use your email and password.</div></div>
      <form onSubmit={onSubmit}>
        <div className="field"><span className="label">Email</span><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" /></div>
        <div className="field"><span className="label">Password</span><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password" autoComplete="current-password" /></div>
        <div>
          <button className="btn primary" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          <span className="sub" style={{marginLeft:8}}>{msg}</span>
        </div>
      </form>
      <div className="sub" style={{marginTop:8}}>No account? <Link to="/signup">Sign up</Link></div>
      <div className="sub" style={{marginTop:8}}><Link to="/auth/callback">Email confirmed? Click here if stuck</Link></div>
    </div>
  );
}


