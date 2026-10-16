"use client";

import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";

export default function DealersLocatorPage() {
  const settings = useGlobalSettings();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;
    
    setLoading(true);

    setTimeout(() => {
      const text = `Hello Goodwin Batteries,\nI am looking for a dealer near: ${location}\nPlease help me find the nearest authorized dealer.`;
      const whatsappNum = settings?.whatsapp_main?.replace(/\D/g, "") || "9667724411";
      window.open(`https://wa.me/91${whatsappNum}?text=${encodeURIComponent(text)}`, "_blank");
      setLoading(false);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      <section className="bg-background py-16 border-b border-border">
        <div className="container text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            FIND <span className="text-primary">GOODWIN</span> NEAR YOU
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect with our team to find the nearest authorized Goodwin dealers and service centers in your city.
          </p>
        </div>
      </section>

      <section className="py-24 bg-surface flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container max-w-xl relative z-10">
          <div className="bg-background border border-border/50 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-primary/5 blur-[100px] pointer-events-none mix-blend-screen" />
             
            <div className="w-20 h-20 bg-surface border border-border/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/10">
              <MapPin size={36} className="text-primary" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 relative z-10">Find Your Nearest Dealer</h2>
            <p className="text-muted-foreground mb-10 text-sm md:text-base relative z-10 leading-relaxed">
              Enter your City or Pincode below and we will instantly connect you with the best authorized dealer near you.
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col gap-6 relative z-10">
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter City or Pincode..." 
                  className="w-full bg-surface border border-border rounded-xl pl-14 pr-4 py-5 text-foreground placeholder-slate-400 focus:outline-none focus:border-[#00843D] focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-lg shadow-sm"
                />
                <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00843D] hover:bg-[#006830] text-white font-bold uppercase tracking-wider py-5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-emerald-700/20 text-lg active:scale-98"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : "Connect on WhatsApp"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
