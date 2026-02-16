import React from "react";

export default function Profile(){
  return (
    <div className="container panel" style={{marginTop:24}}>
      <div className="hero"><h1>Your profile</h1><div className="sub">Hook this to Supabase auth later.</div></div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
        <div className="field"><span className="label">Name</span><input className="input" placeholder="Your name" /></div>
        <div className="field"><span className="label">Email</span><input className="input" placeholder="you@example.com" /></div>
        <div className="field"><span className="label">Skills</span><input className="input" placeholder="Teaching, First Aid, Fundraising" /></div>
        <div className="field"><span className="label">Availability</span>
          <select><option>Flexible</option><option>Weekends</option><option>Weekdays</option><option>Evenings</option></select>
        </div>
      </div>
      <div style={{marginTop:10}}><button className="btn primary">Save profile</button></div>
    </div>
  );
}
