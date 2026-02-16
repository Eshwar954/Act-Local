import { supabase } from "./supabase";

/**
 * Fetch opportunities from the backend.
 * Expects a Supabase view `v_opportunities_active` that filters out expired posts.
 */
export async function fetchOpportunities({ q, cause, city, time } = {}) {
  let query = supabase
    .from("v_opportunities_active")
    .select("*")
    .order("created_at", { ascending: false });

  if (cause) query = query.eq("cause", cause);
  if (city)  query = query.ilike("city", `%${city}%`);
  if (time)  query = query.eq("time", time);

  if (q) {
    // Title/org ilike search; adjust fields to your schema
    query = query.or(`title.ilike.%${q}%,org.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/** Create opportunity (org owner). Backend computes expires_at based on live_days. */
export async function createOpportunity(payload) {
  const { data, error } = await supabase
    .from("opportunities")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}
