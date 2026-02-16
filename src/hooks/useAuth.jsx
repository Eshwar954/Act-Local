import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@services/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadSession(){
      const { data } = await supabase.auth.getUser();
      if (!active) return;
      setUser(data?.user || null);
      setInitializing(false);
    }
    loadSession();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({
    user,
    initializing,
    async signIn({ email, password }){
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },
    async signUp({ email, password, options }){
      const { data, error } = await supabase.auth.signUp({ email, password, options });
      if (error) throw error;
      return data;
    },
    async signOut(){
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
  }), [user, initializing]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth({ children }){
  const { user, initializing } = useAuth();
  if (initializing) return null;
  if (!user) return <div className="container panel" style={{marginTop:24}}>Please sign in to continue.</div>;
  return children;
}

export function RequireOrg({ children }){
  const { user, initializing } = useAuth();
  if (initializing) return null;
  if (!user) return <div className="container panel" style={{marginTop:24}}>Please sign in to continue.</div>;
  const role = user.user_metadata?.role || "volunteer";
  if (role !== "organization") {
    return <div className="container panel" style={{marginTop:24}}>Only organization accounts can access this page.</div>;
  }
  return children;
}


