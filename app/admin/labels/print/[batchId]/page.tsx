"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import FactoryLabel from "@/components/labels/FactoryLabel";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PrintFactoryBatchPage() {
  const params = useParams();
  const batchId = params.batchId as string;
  
  const [batch, setBatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Default dimensions from user screenshot
  const [width, setWidth] = useState(38);
  const [height, setHeight] = useState(25);

  useEffect(() => {
    async function loadBatch() {
      if (!batchId) return;
      const { data, error } = await supabase
        .from("sticker_batches")
        .select("*")
        .eq("id", batchId)
        .single();
      
      if (data) {
        setBatch(data);
      } else {
        console.error("Batch not found:", error);
      }
      setLoading(false);
    }
    loadBatch();
  }, [batchId]);

  if (loading) {
    return <div className="p-8 text-center">Loading batch data...</div>;
  }

  if (!batch) {
    return <div className="p-8 text-center text-red-500">Batch not found.</div>;
  }

  // Reconstruct serial numbers from batch
  const labelsToPrint = [];
  for (let i = batch.start_sequence; i <= batch.end_sequence; i++) {
    const seqStr = String(i).padStart(5, '0');
    labelsToPrint.push(`${batch.prefix_key}-${seqStr}`);
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-page-wrapper">
      {/* Non-printable controls */}
      <div className="print:hidden p-4 bg-gray-100 border-b flex justify-between items-center mb-8 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin/serial-generator" className="text-gray-600 hover:text-black flex items-center gap-2">
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="text-xl font-bold">Print Preview: {batch.product_name}</h1>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">
            {labelsToPrint.length} Labels
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
            margin: 0;
            padding: 0;
            background: white;
          }
          /* Hide non-printable controls inside this page */
          .print\\:hidden {
            display: none !important;
          }
          .print-page-wrapper {
            margin: 0;
            padding: 0;
          }
          /* Remove gaps between pages/labels */
          .factory-label-container {
            page-break-after: always;
            page-break-inside: avoid;
            margin: 0;
            border: none !important;
          }
        }
      `}} />

      <div className="flex flex-col items-center gap-8 print:gap-0 print:items-start bg-gray-50 print:bg-white pb-20">
        {labelsToPrint.map((serial) => (
          <div key={serial} className="shadow-lg print:shadow-none">
            <FactoryLabel
              serialNumber={serial}
              productModel={batch.product_name}
              warranty={batch.warranty_duration}
              mfgDate={batch.manufacturing_date}
              widthMm={width}
              heightMm={height}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
