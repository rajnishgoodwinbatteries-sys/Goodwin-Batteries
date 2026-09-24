"use client";

import { useState } from "react";
import { Loader2, Search, CheckCircle, ShieldCheck, AlertCircle, Phone } from "lucide-react";
import { publicWarrantyLookup } from "@/app/actions/public-actions";

export default function PublicWarrantyPage() {
  const [serialNumber, setSerialNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;
    
    setLoading(true);
    setResult(null);
    try {
      const res = await publicWarrantyLookup(serialNumber.trim().toUpperCase());
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const maskString = (str: string) => {
    if (!str) return 'N/A';
    if (str.length <= 4) return str;
    return str.slice(0, 2) + '*'.repeat(str.length - 4) + str.slice(-2);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 bg-brand text-white font-bold flex items-center justify-center rounded-2xl mx-auto mb-6 text-4xl shadow-xl shadow-brand/20">
            G
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
            Check Your <span className="text-brand">Goodwin Battery</span> Warranty
          </h1>
          <p className="text-lg text-muted-foreground">
            Instantly verify your battery's warranty status using its serial number.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 md:p-10 shadow-lg mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
              placeholder="e.g. GW-TZ5LB-260924-00128"
              className="flex-1 px-6 py-4 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 font-mono uppercase text-lg transition-all"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-brand text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-brand/20"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              Check Status
            </button>
          </form>
        </div>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {result.error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center text-red-500">
                <AlertCircle size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Battery Not Found</h3>
                <p>{result.error}</p>
                <p className="text-sm mt-4 text-foreground">If you believe this is an error, please contact our support team.</p>
              </div>
            )}

            {result.status === "NOT_REGISTERED" && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-8 text-center text-yellow-600">
                <ShieldCheck size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-yellow-700">Not Registered</h3>
                <p>We found this battery, but its warranty has not been registered yet.</p>
                <p className="mt-4 font-mono font-bold text-foreground bg-background py-2 px-4 rounded border border-border inline-block">
                  {result.battery.serial_number}
                </p>
                <p className="text-sm mt-6 text-foreground">Please visit your authorized Goodwin dealer to register your warranty.</p>
              </div>
            )}

            {result.status === "REGISTERED" && (
              <div className="bg-surface border border-brand/30 rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-gradient-to-r from-brand to-brand-dark p-8 text-white text-center">
                  <CheckCircle size={48} className="mx-auto mb-4 text-white/90" />
                  <h3 className="text-3xl font-black mb-1">Warranty Active</h3>
                  <p className="font-mono text-white/80">{result.battery.serial_number}</p>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-background border border-border rounded-xl p-5">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Purchased On</p>
                      <p className="text-xl font-semibold text-foreground">{result.registration.warranty_start_date || 'N/A'}</p>
                    </div>
                    <div className="bg-background border border-border rounded-xl p-5">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Valid Until</p>
                      <p className="text-xl font-semibold text-brand">{result.registration.warranty_expiry_date || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-6 mt-6">
                    <h4 className="font-bold text-lg mb-4 text-foreground">Registration Details</h4>
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Product</p>
                        <p className="text-foreground">{result.battery.product_id || 'Goodwin Battery'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Status</p>
                        <p className="text-foreground">{result.registration.status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Dealer</p>
                        <p className="text-foreground">{result.registration.dealer_name || 'Authorized Dealer'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border flex justify-center">
                    <a 
                      href={`/warranty/certificate?serial=${result.battery.serial_number}`} 
                      className="bg-brand/10 text-brand font-bold px-6 py-3 rounded-xl border border-brand/20 hover:bg-brand hover:text-white transition-all flex items-center gap-2"
                    >
                      View Digital Certificate
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Support CTA */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Need warranty support or have questions?</p>
              <a 
                href="https://wa.me/919667724411" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
              >
                <Phone size={18} />
                Contact Support on WhatsApp
              </a>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
