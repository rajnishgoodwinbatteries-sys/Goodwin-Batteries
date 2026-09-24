"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Plus, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";
import WarrantyPlanModal from "@/components/admin/WarrantyPlanModal";

export default function WarrantyPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    setLoading(true);
    const { data, error } = await supabase.from("warranty_plans").select("*").order("created_at", { ascending: false });
    if (data) setPlans(data);
    setLoading(false);
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await supabase.from("warranty_plans").update({ active: !currentStatus }).eq("id", id);
    fetchPlans();
  };

  const deletePlan = async (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      await supabase.from("warranty_plans").delete().eq("id", id);
      fetchPlans();
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand" size={32} /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Warranty Plans</h1>
          <p className="text-muted-foreground">Manage your product warranty plans, free replacement periods, and pro-rata rules.</p>
        </div>
        <button onClick={() => { setSelectedPlan(null); setIsModalOpen(true); }} className="bg-brand text-white font-bold px-4 py-2 rounded-lg hover:bg-brand-dark flex items-center gap-2">
          <Plus size={18} /> Add Plan
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Plan Details</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Durations (Months)</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Status</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b border-border hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-foreground">{plan.plan_name}</div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">ID: {plan.id}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <div className="text-sm">Total: <span className="font-bold text-foreground">{plan.warranty_months}</span></div>
                    <div className="text-xs">Free: {plan.free_replacement_months} | Pro-rata: {plan.pro_rata_months}</div>
                  </td>
                  <td className="p-4">
                    <button onClick={() => toggleActive(plan.id, plan.active)} className="flex items-center gap-2">
                      {plan.active ? (
                        <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={14} /> Active</span>
                      ) : (
                        <span className="bg-gray-500/10 text-muted-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={14} /> Inactive</span>
                      )}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setSelectedPlan(plan); setIsModalOpen(true); }} className="p-2 bg-background border border-border rounded hover:text-brand transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => deletePlan(plan.id)} className="p-2 bg-background border border-border rounded hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">No warranty plans found. Create one.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <WarrantyPlanModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedPlan(null); }}
        plan={selectedPlan}
        onSuccess={fetchPlans}
      />
    </div>
  );
}
