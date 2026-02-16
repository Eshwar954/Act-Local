import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@services/supabase";

export default function AuthCallback(){
  const nav = useNavigate();
  const [msg, setMsg] = useState("Confirming your email...");

  useEffect(()=>{
    async function run(){
      // 1) If OAuth/code flow, try exchange
      try {
        await supabase.auth.exchangeCodeForSession(window.location.href);
      } catch (e) {
        // ignore; not a code flow
      }

      // 2) If hash tokens exist (email confirmation), set session
      const hash = window.location.hash || "";
      if (hash.includes("access_token") && hash.includes("refresh_token")) {
        const params = new URLSearchParams(hash.replace(/^#/, ""));
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        if (access_token && refresh_token) {
          try {
            await supabase.auth.setSession({ access_token, refresh_token });
          } catch (e) {
            // ignore; will fall back to non-authed message
          }
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setMsg("Email confirmed. You are signed in.");
        setTimeout(()=> nav("/profile"), 800);
        return;
      }

      // Fallback: show confirmed message without session
      const hashParams = new URLSearchParams((window.location.hash || "").replace(/^#/, ""));
      const type = hashParams.get("type");
      if (type === "signup" || type === "recovery") {
        setMsg("Email confirmed. You can sign in now.");
      } else {
        setMsg("Checked confirmation. If not signed in, try Sign in.");
      }
    }
    run();
  }, [nav]);

  return (
    <div className="container panel" style={{marginTop:24}}>
      <div className="hero"><h1>Authentication</h1><div className="sub">{msg}</div></div>
    </div>
  );
}


