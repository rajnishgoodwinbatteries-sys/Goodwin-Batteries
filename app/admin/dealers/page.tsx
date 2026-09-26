"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminDealersPage() {
  const [dealers, setDealers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDealer, setEditingDealer] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", region: "", seller_code: "", role: "dealer", parent_dealer_code: "" });

  useEffect(() => {
    fetchDealers();
  }, []);

  async function fetchDealers() {
    setLoading(true);
    const { data } = await supabase.from("dealers").select("*").order("created_at", { ascending: false });
    if (data) setDealers(data);
    setLoading(false);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let err;
    if (editingDealer) {
      const { error } = await supabase.from("dealers").update(formData).eq("id", editingDealer.id);
      err = error;
    } else {
      const { error } = await supabase.from("dealers").insert([formData]);
      err = error;
    }
    
    if (err) {
      alert("Error saving dealer: " + err.message);
      return;
    }
    
    setIsModalOpen(false);
    setEditingDealer(null);
    setFormData({ name: "", email: "", mobile: "", region: "", seller_code: "", role: "dealer", parent_dealer_code: "" });
    fetchDealers();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this dealer?")) {
      await supabase.from("dealers").delete().eq("id", id);
      fetchDealers();
    }
  };

  const openEdit = (dealer: any) => {
    setEditingDealer(dealer);
    setFormData({
      name: dealer.name,
      email: dealer.email,
      mobile: dealer.mobile || "",
      region: dealer.region,
      seller_code: dealer.seller_code,
      role: dealer.role || "dealer",
      parent_dealer_code: dealer.parent_dealer_code || ""
    });
    setIsModalOpen(true);
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand" size={32} /></div>;

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Manage Dealers</h1>
          <p className="text-muted-foreground">Assign regions and seller codes to dealers.</p>
        </div>
        <button 
          onClick={() => { setEditingDealer(null); setFormData({ name: "", email: "", mobile: "", region: "", seller_code: "", role: "dealer", parent_dealer_code: "" }); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-colors"
        >
          <Plus size={20} /> Add Dealer
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-hover border-b border-border text-muted-foreground text-sm uppercase tracking-wider font-bold">
            <tr>
              <th className="p-4">Seller Code</th>
              <th className="p-4">Role</th>
              <th className="p-4">Name</th>
              <th className="p-4">Region</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {dealers.map((d) => (
              <tr key={d.id} className="hover:bg-surface-hover/50 transition-colors">
                <td className="p-4 font-mono text-brand font-bold">{d.seller_code}</td>
                <td className="p-4 uppercase text-xs font-bold tracking-wider">{d.role || 'dealer'}</td>
                <td className="p-4 font-bold text-foreground">
                  {d.name}
                  {d.role === 'retailer' && <div className="text-xs text-muted-foreground font-normal">Parent: {d.parent_dealer_code}</div>}
                </td>
                <td className="p-4">{d.region}</td>
                <td className="p-4">
                  <div className="text-sm">{d.email}</div>
                  <div className="text-sm text-muted-foreground">{d.mobile}</div>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => openEdit(d)} className="p-2 text-muted-foreground hover:text-brand bg-background border border-border rounded"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(d.id)} className="p-2 text-muted-foreground hover:text-red-500 bg-background border border-border rounded"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {dealers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-muted-foreground">No dealers found. Add one above.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-foreground mb-4">{editingDealer ? 'Edit Dealer' : 'Add Dealer'}</h3>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Role</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-background border border-border rounded-lg p-3 text-foreground">
                  <option value="dealer">Dealer</option>
                  <option value="retailer">Retailer</option>
                </select>
              </div>
              {formData.role === 'retailer' && (
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-1">Parent Dealer Code (Required for Retailers)</label>
                  <input required={formData.role === 'retailer'} type="text" value={formData.parent_dealer_code} onChange={e => setFormData({...formData, parent_dealer_code: e.target.value.toUpperCase()})} className="w-full bg-background border border-border rounded-lg p-3 font-mono text-foreground uppercase" placeholder="e.g. GW-DL-001" />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Name (Dealer/Retailer)</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-border rounded-lg p-3 text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Code (Used as Password)</label>
                <input required type="text" value={formData.seller_code} onChange={e => setFormData({...formData, seller_code: e.target.value.toUpperCase()})} className="w-full bg-background border border-border rounded-lg p-3 font-mono text-foreground uppercase" />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Region</label>
                <input required type="text" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full bg-background border border-border rounded-lg p-3 text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Email (Used for Login)</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-background border border-border rounded-lg p-3 text-foreground" />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">Mobile</label>
                <input type="text" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full bg-background border border-border rounded-lg p-3 text-foreground" />
              </div>
              <div className="flex gap-4 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-surface border border-border py-3 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="flex-1 bg-brand text-white py-3 rounded-lg font-bold">Save Dealer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
