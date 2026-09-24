"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Calendar, ShieldCheck, AlertTriangle, Edit2, Trash2 } from "lucide-react";
import WarrantyModal from "@/components/admin/WarrantyModal";
import ClaimModal from "@/components/admin/ClaimModal";

export default function AdminWarrantiesPage() {
  const [activeTab, setActiveTab] = useState<"registrations" | "claims">("registrations");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedReg, setSelectedReg] = useState<any>(null);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [regRes, claimsRes] = await Promise.all([
      supabase.from("warranty_registrations").select("*").order("created_at", { ascending: false }),
      supabase.from("warranty_claims").select("*").order("created_at", { ascending: false })
    ]);
    
    if (regRes.data) setRegistrations(regRes.data);
    if (claimsRes.data) setClaims(claimsRes.data);
    setLoading(false);
  }

  const updateRegStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Registered' ? 'Verified' : currentStatus === 'Verified' ? 'Rejected' : 'Registered';
    await supabase.from("warranty_registrations").update({ status: newStatus }).eq("id", id);
    fetchData();
  };

  const updateClaimStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Pending Review' ? 'Under Inspection' : currentStatus === 'Under Inspection' ? 'Approved' : currentStatus === 'Approved' ? 'Rejected' : 'Pending Review';
    await supabase.from("warranty_claims").update({ status: newStatus }).eq("id", id);
    fetchData();
  };

  const deleteReg = async (id: string) => {
    if (confirm("Are you sure you want to delete this warranty registration?")) {
      await supabase.from("warranty_registrations").delete().eq("id", id);
      fetchData();
    }
  };

  const deleteClaim = async (id: string) => {
    if (confirm("Are you sure you want to delete this warranty claim?")) {
      await supabase.from("warranty_claims").delete().eq("id", id);
      fetchData();
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand" size={32} /></div>;

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Warranties & Claims</h1>
          <p className="text-muted-foreground">Manage product warranty registrations and service claims.</p>
        </div>
        <div className="flex bg-surface p-1 rounded-xl border border-border">
          <button 
            onClick={() => setActiveTab("registrations")}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === 'registrations' ? 'bg-brand text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Registrations ({registrations.length})
          </button>
          <button 
            onClick={() => setActiveTab("claims")}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === 'claims' ? 'bg-brand text-white' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Claims ({claims.length})
          </button>
        </div>
      </div>

      {activeTab === "registrations" && (
        <div className="grid grid-cols-1 gap-4">
          {registrations.map((reg) => (
            <div key={reg.id} className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:border-brand/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-foreground">{reg.customer_name}</h3>
                    <button 
                      onClick={() => updateRegStatus(reg.id, reg.status)}
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                        reg.status === 'Registered' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                        reg.status === 'Verified' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}
                    >
                      {reg.status}
                    </button>
                  </div>
                  <p className="text-muted-foreground font-mono text-sm">{reg.id}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono bg-background border border-border px-3 py-1.5 rounded">
                    <Calendar size={14} />
                    {new Date(reg.created_at).toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedReg(reg); setIsRegModalOpen(true); }} className="p-1.5 bg-background border border-border rounded hover:text-brand transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => deleteReg(reg.id)} className="p-1.5 bg-background border border-border rounded hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>

              {reg.admin_notes && (
                <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg text-foreground mb-6">
                  <p className="text-xs text-yellow-600 uppercase tracking-widest font-bold mb-2">Admin Notes</p>
                  <p className="whitespace-pre-wrap text-sm">{reg.admin_notes}</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Serial Number</p>
                  <p className="font-mono text-foreground font-semibold">{reg.serial_number}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Battery Model ID</p>
                  <p className="font-mono text-foreground">{reg.battery_model_id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Dealer</p>
                  <p className="text-foreground">{reg.dealer_name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Vehicle</p>
                  <p className="text-foreground font-mono text-sm uppercase">{reg.vehicle_reg_number}</p>
                  <p className="text-foreground text-sm">{reg.vehicle_make_model}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Mobile</p>
                  <a href={`tel:+91${reg.mobile}`} className="font-mono text-brand hover:underline">{reg.mobile}</a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Email</p>
                  <p className="text-foreground">{reg.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Purchase Date</p>
                  <p className="text-foreground">{reg.purchase_date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Invoice No.</p>
                  <p className="text-foreground font-mono">{reg.invoice_number}</p>
                </div>
              </div>
            </div>
          ))}

          {registrations.length === 0 && (
            <div className="bg-surface border border-border rounded-xl p-12 text-center text-muted-foreground">
              <ShieldCheck size={48} className="mx-auto mb-4 opacity-20" />
              <p>No warranty registrations found.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "claims" && (
        <div className="grid grid-cols-1 gap-4">
          {claims.map((claim) => (
            <div key={claim.id} className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:border-brand/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-foreground">{claim.customer_name}</h3>
                    <button 
                      onClick={() => updateClaimStatus(claim.id, claim.status)}
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                        claim.status === 'Pending Review' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                        claim.status === 'Under Inspection' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                        claim.status === 'Approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}
                    >
                      {claim.status}
                    </button>
                  </div>
                  <p className="text-muted-foreground font-mono text-sm">{claim.id}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono bg-background border border-border px-3 py-1.5 rounded">
                    <Calendar size={14} />
                    {new Date(claim.created_at).toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedClaim(claim); setIsClaimModalOpen(true); }} className="p-1.5 bg-background border border-border rounded hover:text-brand transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => deleteClaim(claim.id)} className="p-1.5 bg-background border border-border rounded hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg text-foreground mb-6">
                <p className="text-xs text-red-500 uppercase tracking-widest font-bold mb-2">Issue Description</p>
                <p className="whitespace-pre-wrap">{claim.issue_description}</p>
              </div>

              {claim.admin_notes && (
                <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg text-foreground mb-6">
                  <p className="text-xs text-yellow-600 uppercase tracking-widest font-bold mb-2">Admin Notes</p>
                  <p className="whitespace-pre-wrap text-sm">{claim.admin_notes}</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Serial Number</p>
                  <p className="font-mono text-foreground font-semibold">{claim.serial_number}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Warranty ID</p>
                  <p className="font-mono text-foreground">{claim.warranty_id || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Mobile</p>
                  <a href={`tel:+91${claim.mobile}`} className="font-mono text-brand hover:underline">{claim.mobile}</a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Dealer</p>
                  <p className="text-foreground">{claim.dealer_name}</p>
                </div>
              </div>
            </div>
          ))}

          {claims.length === 0 && (
            <div className="bg-surface border border-border rounded-xl p-12 text-center text-muted-foreground">
              <AlertTriangle size={48} className="mx-auto mb-4 opacity-20" />
              <p>No warranty claims found.</p>
            </div>
          )}
        </div>
      )}

      <WarrantyModal 
        isOpen={isRegModalOpen}
        onClose={() => { setIsRegModalOpen(false); setSelectedReg(null); }}
        registration={selectedReg}
        onSuccess={fetchData}
      />
      
      <ClaimModal 
        isOpen={isClaimModalOpen}
        onClose={() => { setIsClaimModalOpen(false); setSelectedClaim(null); }}
        claim={selectedClaim}
        onSuccess={fetchData}
      />
    </div>
  );
}
