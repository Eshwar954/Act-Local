import React, { useEffect, useState } from "react";
import { CAUSES, TIMES } from "@lib/constants";
import { createOpportunity } from "@services/api";
import { useAuth } from "@hooks/useAuth.jsx";

export default function Post(){
  const { user } = useAuth();
  const [form, setForm] = useState({
    org_id: "", title: "", cause: CAUSES[0],
    city: "", time: TIMES[0], type: "In-person",
    spots: 0, description: "", live_days: 30
  });
  const [msg, setMsg] = useState("");

  const set = (k, v)=> setForm(f=>({...f, [k]: v}));

  useEffect(()=>{
    if (user?.id) setForm(f=>({ ...f, org_id: user.id }));
  }, [user?.id]);

  async function onSubmit(e){
    e.preventDefault();
    setMsg("");
    try {
      if (!form.org_id) throw new Error("Missing org_id (sign in to post)");
      await createOpportunity(form);
      setMsg("Saved. Visible under Explore when active.");
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    }
  }

  return (
    <div className="container panel" style={{marginTop:24}}>
      <div className="hero"><h1>Post an opportunity</h1><div className="sub">Backend computes expiry from <code>live_days</code>.</div></div>
      <form onSubmit={onSubmit}>
        {/* org_id hidden in UI; bound to signed-in org user */}
        <div className="field"><span className="label">Title</span><input className="input" value={form.title} onChange={e=>set("title", e.target.value)} placeholder="Teach basic English" /></div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
          <div className="field"><span className="label">Cause</span>
            <select value={form.cause} onChange={e=>set("cause", e.target.value)}>{CAUSES.map(c=><option key={c}>{c}</option>)}</select>
          </div>
          <div className="field"><span className="label">Time</span>
            <select value={form.time} onChange={e=>set("time", e.target.value)}>{TIMES.map(t=><option key={t}>{t}</option>)}</select>
          </div>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
          <div className="field"><span className="label">City</span><input className="input" value={form.city} onChange={e=>set("city", e.target.value)} placeholder="Bengaluru" /></div>
          <div className="field"><span className="label">Type</span>
            <select value={form.type} onChange={e=>set("type", e.target.value)}><option>In-person</option><option>Remote</option></select>
          </div>
        </div>
        <div className="field"><span className="label">Spots</span><input className="input" type="number" min="0" value={form.spots} onChange={e=>set("spots", Number(e.target.value))} /></div>
        <div className="field"><span className="label">Description</span><textarea className="input" value={form.description} onChange={e=>set("description", e.target.value)} placeholder="What will volunteers do?" /></div>
        <div className="field"><span className="label">Live days</span><input className="input" type="number" min="1" value={form.live_days} onChange={e=>set("live_days", Number(e.target.value))} /></div>
        <div><button className="btn primary" type="submit">Save</button> <span className="sub">{msg}</span></div>
      </form>
    </div>
  );
}
