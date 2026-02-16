import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth.jsx";

export default function Signup(){
  const { signUp } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("volunteer");

  async function onSubmit(e){
    e.preventDefault();
    setMsg("");
    if (!email || !password) { setMsg("Email and password are required"); return; }
    if (password.length < 8) { setMsg("Password must be at least 8 characters"); return; }
    if (password !== confirm) { setMsg("Passwords do not match"); return; }
    setLoading(true);
    try {
      const { user } = await signUp({ email, password, options: { data: { role } } });
      setMsg("Check your email to confirm your account.");
      nav("/login");
    } catch (err) {
      setMsg(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container panel" style={{marginTop:24}}>
      <div className="hero"><h1>Create your account</h1><div className="sub">We’ll email a verification link.</div></div>
      <form onSubmit={onSubmit}>
        <div className="field"><span className="label">Email</span><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" /></div>
        <div className="field"><span className="label">Password</span><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Create a strong password" autoComplete="new-password" /></div>
        <div className="field"><span className="label">Confirm password</span><input className="input" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Repeat password" autoComplete="new-password" /></div>
        <div className="field"><span className="label">Account type</span>
          <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="volunteer">Volunteer</option>
            <option value="organization">Organization</option>
          </select>
        </div>
        <div>
          <button className="btn primary" type="submit" disabled={loading}>{loading ? "Creating..." : "Sign up"}</button>
          <span className="sub" style={{marginLeft:8}}>{msg}</span>
        </div>
      </form>
      <div className="sub" style={{marginTop:8}}>Already have an account? <Link to="/login">Sign in</Link></div>
    </div>
  );
}


