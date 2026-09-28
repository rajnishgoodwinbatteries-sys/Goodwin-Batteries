"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import MRPLabel from "@/components/labels/MRPLabel";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PrintMRPPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const qty = parseInt(searchParams.get("qty") || "1", 10);
  const mrp = searchParams.get("mrp") || "0";
  const mfgDate = searchParams.get("mfgDate") || "";
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Default dimensions
  const [width, setWidth] = useState(75);
  const [height, setHeight] = useState(50);

  useEffect(() => {
    async function loadProduct() {
      if (!productId) return;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      
      if (data) {
        setProduct(data);
      } else {
        console.error("Product not found:", error);
      }
      setLoading(false);
    }
    loadProduct();
  }, [productId]);

  if (loading) {
    return <div className="p-8 text-center">Loading product data...</div>;
  }

  if (!product) {
    return <div className="p-8 text-center text-red-500">Product not found.</div>;
  }

  const labelsToPrint = Array.from({ length: qty }).map((_, i) => i);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-page-wrapper">
      {/* Non-printable controls */}
      <div className="print:hidden p-4 bg-gray-100 border-b flex justify-between items-center mb-8 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin/mrp-generator" className="text-gray-600 hover:text-black flex items-center gap-2">
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="text-xl font-bold">Print MRP: {product.name}</h1>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">
            {qty} Labels
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <label className="font-bold">Size:</label>
            <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-16 p-1 border rounded" /> mm W
            <span className="text-gray-400">x</span>
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-16 p-1 border rounded" /> mm H
          </div>
          <button 
            onClick={handlePrint}
            className="bg-black text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800"
          >
            <Printer size={18} /> Print (Ctrl+P)
          </button>
        </div>
      </div>

      {/* Printable area */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page {
            size: ${width}mm ${height}mm;
            margin: 0;
          }
          body {
            visibility: hidden;
            margin: 0;
            padding: 0;
            background: white;
          }
          .print-page-wrapper, .print-page-wrapper * {
            visibility: visible;
          }
          .print-page-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;
            padding: 0;
            width: 100%;
          }
          /* Remove gaps between pages/labels */
          .mrp-label-container {
            page-break-after: always;
            page-break-inside: avoid;
            margin: 0;
            border: none !important;
          }
        }
      `}} />

      <div className="flex flex-col items-center gap-8 print:gap-0 print:items-start bg-gray-50 print:bg-white pb-20">
        {labelsToPrint.map((_, index) => (
          <div key={index} className="shadow-lg print:shadow-none">
            <MRPLabel
              productName={product.name}
              productModel={product.slug}
              voltage={product.voltage || '12V'}
              capacity={product.ah || 'N/A'}
              mrp={mrp}
              mfgDate={mfgDate}
              widthMm={width}
              heightMm={height}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
