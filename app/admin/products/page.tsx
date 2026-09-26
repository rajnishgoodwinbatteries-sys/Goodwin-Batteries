"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Plus, Edit2, Trash2, CheckCircle, XCircle, Download } from "lucide-react";
import Link from "next/link";
import goodwinProducts from "@/data/goodwinProducts.json";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*, categories(name)").order("display_order");
    if (data) setProducts(data);
    setLoading(false);
  }

  const togglePublish = async (id: string, currentStatus: boolean) => {
    await supabase.from("products").update({ is_published: !currentStatus }).eq("id", id);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await supabase.from("products").delete().eq("id", id);
      fetchProducts();
    }
  };

  const importLocalProducts = async () => {
    if (!confirm("This will import/update all default battery models into the database. Do you want to proceed?")) return;
    
    setImporting(true);
    try {
      const payload = goodwinProducts.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        series: p.series,
        category_id: p.category,
        voltage: p.voltage,
        ah: (p as any).ah, 
        warranty: (p as any).warranty_options ? (p as any).warranty_options.join(" / ") : (p as any).warranty,
        warranty_options: (p as any).warranty_options || [],
        application: [p.application],
        image: p.image,
        description: p.description,
        terminal_layout: (p as any).terminalLayout || "",
        dimensions: (p as any).dimensions || "",
        weight: (p as any).weight || "",
        is_published: true,
        is_featured: true,
      }));

      const { error } = await supabase.from("products").upsert(payload, { onConflict: 'id' });
      
      if (error) throw error;
      
      alert("Successfully imported products into database!");
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      alert("Error importing products: " + err.message);
    } finally {
      setImporting(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand" size={32} /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage battery models and specifications.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={importLocalProducts} disabled={importing} className="bg-surface border border-border text-foreground font-bold px-4 py-2 rounded-lg hover:border-brand transition-colors flex items-center gap-2 disabled:opacity-50">
            {importing ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} 
            Import Defaults
          </button>
          <Link href="/admin/products/new" className="bg-brand text-white font-bold px-4 py-2 rounded-lg hover:bg-brand-dark flex items-center gap-2">
            <Plus size={18} /> Add Product
          </Link>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Model</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Category</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Specs (Ah/CCA)</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider">Status</th>
                <th className="p-4 font-bold text-sm uppercase text-muted-foreground tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-background rounded-lg border border-border flex items-center justify-center p-1">
                        {product.image ? <img src={product.image} className="max-h-full max-w-full object-contain" alt="" /> : <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded" />}
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{product.name}</div>
                        <div className="text-xs text-brand uppercase tracking-widest">{product.series} Series</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{product.categories?.name || "Uncategorized"}</td>
                  <td className="p-4 text-muted-foreground">{product.ah} {product.cca ? `/ ${product.cca}` : ""}</td>
                  <td className="p-4">
                    <button onClick={() => togglePublish(product.id, product.is_published)} className="flex items-center gap-2">
                      {product.is_published ? (
                        <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={14} /> Published</span>
                      ) : (
                        <span className="bg-gray-500/10 text-muted-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={14} /> Draft</span>
                      )}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="p-2 bg-background border border-border rounded hover:text-brand transition-colors"><Edit2 size={16} /></Link>
                      <button onClick={() => deleteProduct(product.id)} className="p-2 bg-background border border-border rounded hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No products found in the database. <br />
                    Click "Import Defaults" to load existing Battery Models.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
