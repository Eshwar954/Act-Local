import React from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Explore from "@pages/Explore.jsx";
import Post from "@pages/Post.jsx";
import Profile from "@pages/Profile.jsx";
import Org from "@pages/Org.jsx";
import Login from "@pages/Login.jsx";
import Signup from "@pages/Signup.jsx";
import AuthCallback from "@pages/AuthCallback.jsx";
import { useAuth, RequireAuth, RequireOrg } from "@hooks/useAuth.jsx";

function Header() {
  const { user, signOut } = useAuth();
  const nav = useNavigate();
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="brand"><span className="logo" /> Actlocal</div>
        <nav className="nav">
          <NavLink to="/" end className={({isActive})=>`tab ${isActive ? "active":""}`}>Explore</NavLink>
          <NavLink to="/post" className={({isActive})=>`tab ${isActive ? "active":""}`}>Post</NavLink>
          <NavLink to="/profile" className={({isActive})=>`tab ${isActive ? "active":""}`}>Profile</NavLink>
          <NavLink to="/org" className={({isActive})=>`tab ${isActive ? "active":""}`}>Org</NavLink>
        </nav>
        <div className="actions">
          {!user ? (
            <>
              <NavLink to="/login" className="btn">Sign in</NavLink>
              <NavLink to="/signup" className="btn primary">Create account</NavLink>
            </>
          ) : (
            <>
              <span className="sub">{user.email}</span>
              <button className="btn" onClick={async ()=>{ await signOut(); nav("/"); }}>Sign out</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default function App(){
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/post" element={<RequireOrg><Post /></RequireOrg>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/org" element={<RequireOrg><Org /></RequireOrg>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
      <footer className="container" style={{marginTop:24}}>
        Auth by Supabase. Protects posting and org/profile pages.
      </footer>
    </>
  );
}
