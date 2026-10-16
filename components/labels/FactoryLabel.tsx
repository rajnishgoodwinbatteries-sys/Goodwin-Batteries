import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import { PRINTER_CONFIG } from '@/lib/printer-config';

export interface FactoryLabelProps {
  serialNumber: string;
  productModel: string;
  warranty: string;
  mfgDate: string;
  logoFont?: string;
  bodyFont?: string;
  serialFont?: string;
  letterSpacing?: string;
}

export default function FactoryLabel({
  serialNumber,
  productModel,
  warranty,
  mfgDate,
  logoFont = "'Arial Black', Impact, sans-serif",
  bodyFont = "Tahoma, Arial, sans-serif",
  serialFont = "'Consolas', 'Courier New', monospace",
  letterSpacing = "0.2px",
}: FactoryLabelProps) {
  const verifyUrl = `https://goodwinbatteries.in/warranty`;

  // Clean model name for display (e.g. "GW-XL2.5LC (12 Months)" -> "GW-XL2.5LC")
  const cleanModel = productModel.replace(/\s*\([^)]*\)/g, '').trim() || productModel;

  // Dynamically calculate font-size and spacing based on serial number length
  // to ensure 100% fit on 36mm printable width without right-edge clipping
  const getSerialStyle = (len: number) => {
    if (len <= 22) return { fontSize: '5.2pt', letterSpacing: '0.35px' };
    if (len <= 28) return { fontSize: '4.6pt', letterSpacing: '0.2px' };
    if (len <= 34) return { fontSize: '4.0pt', letterSpacing: '0.08px' };
    return { fontSize: '3.4pt', letterSpacing: '0px' };
  };

  const serialStyle = getSerialStyle(serialNumber.length);

  return (
    <div 
      className="label-container bg-white text-black box-border relative flex flex-col justify-between"
      style={{
        width: `${PRINTER_CONFIG.LABEL_WIDTH_MM}mm`,
        height: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
        maxHeight: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
        padding: '0.8mm 1.2mm',
        overflow: 'hidden',
        fontFamily: bodyFont,
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Header Section: Brand Row + Dedicated Model Row (Prevents Any Collision) */}
      <div className="shrink-0 flex flex-col">
        {/* Brand Row: Tilak Logo + GOODWIN BATTERIES + Tagline */}
        <div className="flex items-center justify-between leading-none">
          <div className="flex items-center gap-[0.7mm]">
            {/* Authentic Goodwin Tilak Vector Logo */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 100 120" 
              className="w-[2.6mm] h-[3.2mm] shrink-0" 
              fill="black"
            >
              <path d="M 20 10 C 20 60, 20 80, 50 100 C 80 80, 80 60, 80 10 C 70 10, 65 30, 65 60 C 65 75, 55 85, 50 85 C 45 85, 35 75, 35 60 C 35 30, 30 10, 20 10 Z" fill="#000000" />
              <path d="M 40 100 C 45 115, 55 115, 60 100 Z" fill="#000000" />
              <path d="M 46 20 C 46 50, 48 70, 50 80 C 52 70, 54 50, 54 20 C 54 10, 46 10, 46 20 Z" fill="#000000" />
            </svg>

            <span 
              className="font-black text-black tracking-tight uppercase whitespace-nowrap"
              style={{ 
                fontFamily: logoFont,
                fontSize: '5.8pt', 
                lineHeight: 1,
                letterSpacing: letterSpacing,
                fontWeight: 900
              }}
            >
              GOODWIN BATTERIES
            </span>
          </div>

          <span 
            className="font-bold text-black uppercase tracking-tight whitespace-nowrap shrink-0 ml-[0.5mm]"
            style={{ 
              fontFamily: bodyFont,
              fontSize: '3.4pt', 
              lineHeight: 1
            }}
          >
            Your Trusted Power Source
          </span>
        </div>

        {/* Dedicated Model Name Bar (Full 36mm width utilization: Zero Collision Guaranteed) */}
        <div className="flex items-center justify-between bg-black text-white px-[1.2mm] py-[0.35mm] rounded-[0.35mm] mt-[0.35mm] leading-none">
          <span 
            className="font-black uppercase tracking-wider truncate"
            style={{ 
              fontFamily: bodyFont,
              fontSize: '5.0pt', 
              lineHeight: 1,
              letterSpacing: '0.2px'
            }}
          >
            MODEL: {cleanModel}
          </span>
          <span 
            className="font-bold text-white/90 uppercase whitespace-nowrap shrink-0 ml-[1mm]"
            style={{ 
              fontSize: '3.6pt', 
              lineHeight: 1 
            }}
          >
            GENUINE OEM
          </span>
        </div>
      </div>

      {/* 2. Middle Row: QR Code + Barcode */}
      <div className="flex flex-row items-center justify-between gap-[1mm] my-[0.3mm] shrink-0">
        {/* QR Code */}
        <div className="shrink-0 flex items-center justify-center p-[0.2mm] bg-white border border-black/50 rounded-[0.3mm]">
          <QRCodeSVG 
            value={verifyUrl} 
            size={28}
            style={{ width: '7.2mm', height: '7.2mm' }}
            level="M" 
            includeMargin={false} 
            fgColor="#000000"
            bgColor="#FFFFFF"
          />
        </div>

        {/* Barcode */}
        <div className="flex-1 min-w-0 flex items-center justify-center overflow-hidden h-[7.2mm]">
          <div className="w-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-[7.2mm]">
            <Barcode 
              value={serialNumber} 
              format="CODE128"
              width={1}
              height={26}
              displayValue={false}
              margin={0}
              background="#ffffff"
              lineColor="#000000"
            />
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Clear Full-Width Metadata (Zero Truncation, Zero Clipping) */}
      <div className="border-t-[0.35mm] border-black pt-[0.35mm] shrink-0">
        <div className="flex justify-between items-center text-black font-extrabold" style={{ fontSize: '4.6pt', lineHeight: 1 }}>
          <div className="whitespace-nowrap">
            <span className="font-black">MFG:</span> {mfgDate}
          </div>
          <div className="whitespace-nowrap">
            <span className="font-black">WTY:</span> {warranty}
          </div>
        </div>

        {/* Full Serial Number (Scaled to 100% fit on 1 line without right-edge cut-off) */}
        <div 
          className="font-black text-center text-black mt-[0.3mm] whitespace-nowrap overflow-hidden" 
          style={{ 
            fontFamily: serialFont,
            fontSize: serialStyle.fontSize, 
            letterSpacing: serialStyle.letterSpacing,
            lineHeight: 1,
            fontWeight: 800
          }}
        >
          {serialNumber}
        </div>
      </div>
    </div>
  );
}
