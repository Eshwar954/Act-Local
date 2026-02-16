import React, { useEffect, useMemo, useState } from "react";
import { useFilters } from "@store/filtersStore";
import { CAUSES, TIMES } from "@lib/constants";
import useDebounce from "@hooks/useDebounce";
import { fetchOpportunities } from "@services/api";
import OpportunityGrid from "@components/Opportunity/OpportunityGrid.jsx";

export default function Explore(){
  const { q, cause, city, time, setField, reset } = useFilters();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  const qDebounced = useDebounce(q, 350);

  const filtersMemo = useMemo(()=>({
    q: qDebounced, cause, city, time
  }), [qDebounced, cause, city, time]);

  useEffect(()=>{
    let alive = true;
    setLoading(true);
    setError("");
    fetchOpportunities(filtersMemo)
      .then(d => { if (alive) setRows(d || []); })
      .catch(e => { if (alive) setError(e.message || "Failed to fetch"); })
      .finally(()=> alive && setLoading(false));
    return ()=>{ alive = false; };
  }, [filtersMemo]);

  return (
    <div className="container">
      <div className="hero">
        <h1>Find local opportunities that actually matter</h1>
        <div className="sub">Search by cause, city, and time commitment. Apply in one click.</div>
      </div>

      <div className="layout">
        <aside className="sidebar">
          <div className="side-title">Filters</div>

          <div className="field">
            <span className="label">Search</span>
            <input className="input" placeholder="Teaching, Dogs, Tree planting"
              value={q} onChange={e=>setField("q", e.target.value)} />
          </div>

          <div className="field">
            <span className="label">Cause</span>
            <select value={cause} onChange={e=>setField("cause", e.target.value)}>
              <option value="">All causes</option>
              {CAUSES.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="field">
            <span className="label">City</span>
            <input className="input" placeholder="e.g., Hyderabad"
              value={city} onChange={e=>setField("city", e.target.value)} />
          </div>

          <div className="field">
            <span className="label">Time</span>
            <select value={time} onChange={e=>setField("time", e.target.value)}>
              <option value="">Any time</option>
              {TIMES.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div style={{display:"flex", gap:8}}>
            <button className="btn" onClick={()=>setField("q", q)}>Apply filters</button>
            <button className="btn ghost" onClick={reset}>Reset</button>
          </div>
        </aside>

        <section>
          {error && <div className="panel" style={{color:"#dc2626"}}>Error: {error}</div>}
          <OpportunityGrid loading={loading} items={rows} />
        </section>
      </div>
    </div>
  );
}
