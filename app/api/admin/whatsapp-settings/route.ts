import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

const CONFIG_FILE = path.join(process.cwd(), "config", "order-notifications.json");

interface WhatsAppOrderConfig {
  whatsappNumber: string;
  countryCode: string;
  enableAlerts: boolean;
  autoOpenNotification: boolean;
  updatedAt: string;
}

const DEFAULT_CONFIG: WhatsAppOrderConfig = {
  whatsappNumber: "9667724411",
  countryCode: "91",
  enableAlerts: true,
  autoOpenNotification: true,
  updatedAt: new Date().toISOString(),
};

function readConfigFile(): WhatsAppOrderConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, "utf-8");
      return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
    }
  } catch (err) {
    console.warn("Could not read order-notifications.json, using default", err);
  }
  return DEFAULT_CONFIG;
}

function writeConfigFile(config: WhatsAppOrderConfig): boolean {
  try {
    const dir = path.dirname(CONFIG_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to write order-notifications.json", err);
    return false;
  }
}

export async function GET() {
  try {
    let config = readConfigFile();

    // Check if Supabase global_settings has a newer or configured whatsapp_main
    try {
      const { data } = await supabase.from("global_settings").select("whatsapp_main").single();
      if (data?.whatsapp_main && !config.whatsappNumber) {
        config.whatsappNumber = data.whatsapp_main.replace(/\D/g, "");
      }
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, config });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to load settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cleanNumber = (body.whatsappNumber || "9667724411").replace(/\D/g, "");

    if (cleanNumber.length < 10) {
      return NextResponse.json({ error: "Please enter a valid 10-digit WhatsApp number." }, { status: 400 });
    }

    const updatedConfig: WhatsAppOrderConfig = {
      whatsappNumber: cleanNumber,
      countryCode: (body.countryCode || "91").replace(/\D/g, ""),
      enableAlerts: body.enableAlerts !== false,
      autoOpenNotification: body.autoOpenNotification !== false,
      updatedAt: new Date().toISOString(),
    };

    // Save to disk
    writeConfigFile(updatedConfig);

    // Sync to Supabase global_settings if possible
    try {
      await supabase.from("global_settings").update({
        whatsapp_main: cleanNumber,
        updated_at: new Date().toISOString(),
      }).neq("id", "00000000-0000-0000-0000-000000000000");
    } catch {
      // non-blocking
    }

    return NextResponse.json({ success: true, config: updatedConfig });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save settings" }, { status: 500 });
  }
}
