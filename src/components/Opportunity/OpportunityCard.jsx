import React from "react";

export default function OpportunityCard({ item }){
  return (
    <article className="card">
      <div className="badge">{item.cause}</div>
      <div className="title">{item.title}</div>
      <div className="meta">
        <span>{item.org}</span><span className="dot"></span>
        <span>{item.city}</span><span className="dot"></span>
        <span>{item.time}</span><span className="dot"></span>
        <span>{item.type}</span><span className="dot"></span>
        <span>{item.spots} spots</span>
      </div>
      <p className="desc">{item.description || item.desc}</p>
      <div className="cta">
        <button className="pill">Save</button>
        <button className="pill apply">Apply</button>
      </div>
    </article>
  );
}
