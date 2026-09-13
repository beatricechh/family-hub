// ─────────────────────────────────────────────────────────────
// Family Hub — connection settings
// These point the app at your Supabase project.
// Both values are safe to keep here (the anon key is meant to be public;
// your data is protected by the Row Level Security rules).
// Never put a "secret" / "service_role" key or your DB password here.
//
// vapidPublicKey below is also safe to keep here — it's the PUBLIC half of
// the push-notification key pair (like the anon key, it's meant to ship in
// the app). The matching PRIVATE key never lives here; it stays only in
// Supabase's secret store.
// ─────────────────────────────────────────────────────────────
window.FH_CONFIG = {
  url:     "https://ellaqhoocgkufqwrpvnz.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbGFxaG9vY2drdWZxd3Jwdm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMzc3MzAsImV4cCI6MjEwNDgxMzczMH0.JJJtDMkbBLw2VfBxv_SUZF1-5mncfYgaBHoGd5bxXsc",
  vapidPublicKey: "BGo_YjNJgQMFkZaSlvcmyW-BRIFdjDDfJ4iwc9Z5MNWS4onVrnVBWKMRuuhRfyfAaLV0-ATtcxwhOohSCHvhe1w"
};
