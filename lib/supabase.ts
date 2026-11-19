import { createBrowserClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ziftqhkqrzpojyzsefmj.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder";

export const supabase =
  typeof window !== "undefined"
    ? createBrowserClient(supabaseUrl, supabaseKey)
    : createSupabaseClient(supabaseUrl, supabaseKey);

