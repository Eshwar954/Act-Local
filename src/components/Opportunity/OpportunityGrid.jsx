import React from "react";
import OpportunityCard from "./OpportunityCard.jsx";

export default function OpportunityGrid({ loading, items }){
  if (loading) {
    return (
      <div className="grid">
        {Array.from({length:6}).map((_,i)=>(
          <div className="card" key={i}>
            <div className="skeleton" style={{width:90, height:26}}></div>
            <div className="skeleton" style={{width:"70%", height:22}}></div>
            <div className="skeleton" style={{width:"95%", height:16}}></div>
            <div className="skeleton" style={{width:"85%", height:16}}></div>
            <div className="skeleton" style={{width:"60%", height:16}}></div>
            <div style={{display:"flex", gap:8, marginTop:"auto"}}>
              <div className="skeleton" style={{width:90, height:38}}></div>
              <div className="skeleton" style={{width:90, height:38}}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return <div className="sub">No matches. Try fewer filters.</div>;
  }

  return (
    <div className="grid">
      {items.map(it => <OpportunityCard key={it.id} item={it} />)}
    </div>
  );
}
