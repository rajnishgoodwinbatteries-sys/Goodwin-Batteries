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
            onClick={() => {
              // We encode the exact LSDX structure they provided, injecting the batch details.
              const lsdxTemplate = \`<?xml version="1.0" encoding="utf-8"?>
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
				<drawobj type="drawtext" id="8" name="" left="741" top="100" right="3431" bottom="425" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="10" name="" left="146" top="474" right="1410" bottom="799" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="12" name="" left="165" top="909" right="1066" bottom="1234" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="14" name="" left="180" top="1343" right="1331" bottom="1668" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="16" name="" left="203" top="1778" right="1029" bottom="2103" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="21" name="" left="1498" top="489" right="1586" bottom="814" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="22" name="" left="1517" top="924" right="1605" bottom="1249" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="23" name="" left="1532" top="1358" right="1620" bottom="1683" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="24" name="" left="1555" top="1793" right="1643" bottom="2118" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="29" name="" left="1635" top="539" right="3462" bottom="839" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="753" width="10000" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="30" name="" left="1686" top="927" right="2674" bottom="1252" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="31" name="" left="1716" top="1369" right="3030" bottom="1694" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="32" name="" left="1743" top="1800" right="2168" bottom="2125" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="34" name="" left="222" top="2063" right="1811" bottom="2301" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="600" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
				<drawobj type="drawtext" id="36" name="" left="2269" top="1820" right="2870" bottom="2145" rotation="none" style="0" halign="0" valign="0" tpalign="0" tvalign="0">
					<color type="0" mode="1" table="0" change="0" varname="" index="123" colors="#FF0000,#00FF00,#0000FF" col="2" row="2"/>
					<text type="1" width="0" align="0" cut="0" spactype="0" spacing="0" charextra="0" template="0" templtestr="" circr="0" circradian="0" circstart="0" circtw="0" circway="0"/>
					<font facename="Arial" style="1" charset="1" height="800" width="0" italic="0" steikeout="0" underline="0" family="0" color="0,0,0" bkcolor="255,255,255"/>
				</drawobj>
			</labelobjects>
			<objvarlink link=":8,7:10,9:12,11:14,13:16,15:21,17:22,18:23,19:24,20:29,25:30,26:31,27:32,28:34,33:36,35"/>
		</labellayer>
		<variables>
			<variable type="constant" id="7" name="" shareid="" data="VHdvIFdoZWVsZXIgQmF0dGVyeQ==" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="9" name="" shareid="" data="TW9kZWwgTm8u" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="11" name="" shareid="" data="TWZnLkR0Lg==" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="13" name="" shareid="" data="V2FycmFudHk=" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="15" name="" shareid="" data="TS5SLlAu" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="17" name="" shareid="" data="Og==" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="18" name="" shareid="" data="Og==" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="19" name="" shareid="" data="Og==" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="20" name="" shareid="" data="Og==" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="25" name="" shareid="" data="\${modelData}" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="26" name="" shareid="" data="\${mfgData}" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="27" name="" shareid="" data="\${warrantyData}" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="28" name="" shareid="" data="UnMu" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="33" name="" shareid="" data="KEluY2wub2YgYWxsIFRheGVzKQ==" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
				<limit filled="left" fillchar="0" cutout="right"/>
				<cut/>
			</variable>
			<variable type="constant" id="35" name="" shareid="" data="MTEwNQ==" serialtype="0" serialstep="1" serialrepeat="1" serealreptype="0" serealreset="0" serealchars="" serealupper="" sereallower="" serealfield="" serealforder="0" serealsrc="0" databasefield="" databasegrindex="0" keyboardprompt="" datatimetype="0" datatimeoffect="0" datatimeformat="" usertc="0" rtctype="0" scripttext="" scriptpriv="RnVuY3Rpb24gT25HZXREYXRhKCkNCiAgICBPbkdldERhdGEgPSAiMTIzNDU2NzgiDQpFbmQgRnVuY3Rpb24=">
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
\`;
              const base64Encode = (str: string) => typeof btoa !== 'undefined' ? btoa(str) : Buffer.from(str).toString('base64');
              
              const modelData = base64Encode(batch.product_name);
              const mfgData = base64Encode(batch.manufacturing_date);
              const warrantyData = base64Encode(batch.warranty_duration);
              
              const finalLsdx = lsdxTemplate
                .replace('\\${modelData}', modelData)
                .replace('\\${mfgData}', mfgData)
                .replace('\\${warrantyData}', warrantyData);
                
              const blob = new Blob([finalLsdx], { type: 'application/xml' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = \`Batch_\${batchId}.lsdx\`;
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
          size: ${width}mm ${height}mm;
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
