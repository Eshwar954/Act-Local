import React, { useEffect, useState } from "react";
import { supabase } from "@services/supabase";
import { useAuth } from "@hooks/useAuth.jsx";

export default function Org(){
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    async function load(){
      if (!user?.id) return;
      // Fetch only this org's opportunities
      const { data, error } = await supabase
        .from("opportunities")
        .select("id, title, city, time, type, spots, created_at")
        .eq("org_id", user.id)
        .order("created_at", { ascending: false });
      if (error) setMsg(error.message);
      else setItems(data || []);
    }
    load();
  }, [user?.id]);

  return (
    <div className="container panel" style={{marginTop:24}}>
      <div className="hero"><h1>Organization dashboard</h1><div className="sub">Your posted opportunities</div></div>
      {msg && <div className="sub" style={{color:"#dc2626"}}>Error: {msg}</div>}
      {!items.length ? <div className="sub">No opportunities yet.</div> : (
        <div className="grid">
          {items.map(it => (
            <div className="card" key={it.id}>
              <div className="title">{it.title}</div>
              <div className="meta"><span>{it.city}</span> · <span>{it.time}</span> · <span>{it.type}</span> · <span>{it.spots} spots</span></div>
              <div className="sub">Posted: {new Date(it.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
