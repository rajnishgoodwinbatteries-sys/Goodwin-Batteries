"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import FactoryLabel from "@/components/labels/FactoryLabel";
import { Printer, ArrowLeft, Download } from "lucide-react";
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
  const labelsToPrint: string[] = [];
  for (let i = batch.start_sequence; i <= batch.end_sequence; i++) {
    const seqStr = String(i).padStart(5, '0');
    labelsToPrint.push(`\${batch.prefix_key}-\${seqStr}`);
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
            onClick={() => {
              // We encode the exact LSDX structure they provided, injecting the batch details.
              const lsdxTemplate = `<?xml version="1.0" encoding="utf-8"?>
<labelshopdocument version="1.2" tag="for Zenpart" date="2026-09-17 12:13:50">
	<labelform version="1.1">
		<paper name="Untitled" code="0" brand="0" cate="0" syslabel="0" otype="0" type="0" maxid="37">
			<paper size="256" atuoset="0" width="3800" height="2500" orientation="1" color="255,255,255" leftoffect="0" topoffect="0"/>
			<printer name="TSC TE244" dev="TSC TE244" dpix="203" dpiy="203" lang="3" set="1610612736" total="140" repeat="1" copy="1" startrecord="-1" gcopy="1" amount="5831" dmtype="6" script="">VABTAEMAIABUAEUAMgA0ADQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEAgfcABAFDyUBAAEAAAH6AHwBZACMAAABywABAAEAywABAAAAVQBTAEUAUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAwAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAKQAAQBNRFROAgAAAAUAAADLAAAAABkAAOQMAAAAAAAAuAsAAHAXAAAAAAAA3AUAAFgCAAAAAAAAAAAAAAAAAAD+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANwwAANoMAAAQJwAAECcAABAnAAAQJwAAoAoAAMIGAAC4BgAALAQAAEABAADSAAAAGAAAAAAAECcQJxAnAAAQJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQEAQQAAAAAzhgAAAAAAAAAAAAAAAAAAAIAAgAAABIAMAAAAAEAAAAIAAAA/////wAAAAABAAAAUAAAAAAAAAC4CwAAAAAAALgLAAAAAAAAAAAAAAIAAAAAAAAAGPABAAEAAABzc3N0c2NsBA==</printer>
		</paper>
		<labellayer>
			<labelformat name="Untitled" uint="0">
				<page left="0" top="0" right="100" bottom="0" viewrotate="0"/>
				<label width="3800" height="2500" rows="1" cols="1" rowgap="300" colgap="0" rotation="0"/>
				<form corner="1" hole="0" holesize="0" order="LTH"/>
			</labelformat>
			<labelobjects>
				<!-- GOODWIN BATTERIES -->
				<drawobj type="drawtext" id="1" name="" left="100" top="100" right="1800" bottom="450" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#000000" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="250" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<!-- Your Trusted Power Source -->
				<drawobj type="drawtext" id="2" name="" left="100" top="450" right="1800" bottom="650" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#000000" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="0" charset="1" height="120" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<!-- Model -->
				<drawobj type="drawtext" id="3" name="" left="1800" top="100" right="3700" bottom="450" rotation="none" style="0" halign="2" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#000000" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="200" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<!-- Line -->
				<drawobj type="drawtext" id="4" name="" left="100" top="650" right="3700" bottom="850" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#000000" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="150" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<!-- QR Code -->
				<drawobj type="drawbarcode" id="5" name="" left="100" top="800" right="1100" bottom="1800" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#000000" col="2" row="2"/>
					<barcode type="31" />
				</drawobj>
				<!-- Barcode -->
				<drawobj type="drawbarcode" id="6" name="" left="1300" top="900" right="3700" bottom="1700" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#000000" col="2" row="2"/>
					<barcode type="1" />
				</drawobj>
				<!-- MFG -->
				<drawobj type="drawtext" id="7" name="" left="100" top="1900" right="1500" bottom="2100" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#000000" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="150" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<!-- WTY -->
				<drawobj type="drawtext" id="8" name="" left="100" top="2150" right="1500" bottom="2350" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#000000" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="150" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<!-- Serial Text -->
				<drawobj type="drawtext" id="9" name="" left="1500" top="1900" right="3700" bottom="2200" rotation="none" style="0" halign="2" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#000000" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="150" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
			</labelobjects>
			<objvarlink link=":1,101:2,102:3,103:4,104:5,105:6,106:7,107:8,108:9,109"/>
		</labellayer>
		<variables>
			<variable type="constant" id="101" name="" shareid="" data="R09PRFdJTiBCQVRURVJJRVM=" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="102" name="" shareid="" data="WW91ciBUcnVzdGVkIFBvd2VyIFNvdXJjZQ==" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="103" name="" shareid="" data="\${modelData}" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="104" name="" shareid="" data="X19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18=" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="105" name="" shareid="" data="\${qrData}" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="106" name="" shareid="" data="\${serialData}" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="107" name="" shareid="" data="\${mfgData}" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="108" name="" shareid="" data="\${warrantyData}" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="109" name="" shareid="" data="\${serialData}" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
		</variables>
	</labelform>
	<database version="1.0">
		<Connection type="2" table="" colout="" group="1" config="" file="" parameter="">
			<fields/>
		</Connection>
	</database>
	<pictures/>
</labelshopdocument>
`;
              const base64Encode = (str: string) => typeof btoa !== 'undefined' ? btoa(str) : Buffer.from(str).toString('base64');
              
              const modelData = base64Encode(batch.product_name);
              const mfgDataText = base64Encode(`Mfg: ${batch.manufacturing_date}`);
              const warrantyDataText = base64Encode(`Warranty: ${batch.warranty_duration}`);
              const serialData = base64Encode(labelsToPrint[0] || 'SAMPLE-123');
              const qrData = base64Encode(`https://goodwinbatteries.in/warranty?serial=${labelsToPrint[0] || 'SAMPLE-123'}`);
              
              const finalLsdx = lsdxTemplate
                .replace('\${modelData}', modelData)
                .replace('\${qrData}', qrData)
                .replace('\${serialData}', serialData) // replaces first occurrence (barcode)
                .replace('\${serialData}', serialData) // replaces second occurrence (text)
                .replace('\${mfgData}', mfgDataText)
                .replace('\${warrantyData}', warrantyDataText);
                
              const blob = new Blob([finalLsdx], { type: 'application/xml' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Batch_\${batchId}.lsdx`;
              a.click();
              window.URL.revokeObjectURL(url);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 ml-2"
          >
            <Download size={18} /> Export .lsdx
          </button>
          
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
        @page {
          size: \${width}mm \${height}mm;
          margin: 0;
        }
        @media print {
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
