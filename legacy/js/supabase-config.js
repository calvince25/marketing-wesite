// Supabase Configuration
const SUPABASE_URL = 'https://axfipopovsnjoyizwpkd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yAQKErTMry9QxOSQLW6K5Q_-9Cme51b';

// Initialize Supabase Client
// We use a different name than the global 'supabase' to avoid shadowing
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabaseClient = client;
