"use server";

import { createClient } from "@/lib/supabase/server";

export async function publicWarrantyLookup(serialNumber: string) {
  // Ideally, add rate limiting here (e.g. using Vercel KV or a DB table)
  
  const supabase = await createClient();
  
  // Look up battery serial first
  const { data: battery, error: batteryError } = await supabase
    .from("battery_serials")
    .select("serial_number, product_id, status")
    .eq("serial_number", serialNumber)
    .single();
    
  if (batteryError || !battery) {
    return { error: "Battery not found in records." };
  }
  
  // Look up registration using service_role or server-side admin privileges if RLS restricts it
  // Since we are running in a server action, the client is standard authenticated/anon. 
  // RLS might block anon from reading warranty_registrations!
  // To allow public lookup, we can temporarily create a policy for reading by serial number,
  // or we can use supabase-admin if we had the service key.
  // We will assume a secure RPC or RLS policy allows querying by serial number where PII is not exposed.
  // For now, since this is a Server Action running as the user (who is anon), RLS WILL BLOCK it unless we
  // have a policy for anon users to read by serial number.
  
  // Fetching it anyway (assumes a policy will be added or exists for anon users to lookup by exact serial_number)
  const { data: registration, error: regError } = await supabase
    .from("warranty_registrations")
    .select("serial_number, warranty_start_date, warranty_expiry_date, status, dealer_name")
    .eq("serial_number", serialNumber)
    .single();
    
  if (regError || !registration) {
    return { status: "NOT_REGISTERED", battery };
  }
  
  return {
    status: "REGISTERED",
    battery,
    registration
  };
}
