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
    if (len <= 22) return { fontSize: '5.0pt', letterSpacing: '0.3px' };
    if (len <= 28) return { fontSize: '4.5pt', letterSpacing: '0.15px' };
    if (len <= 34) return { fontSize: '4.0pt', letterSpacing: '0.05px' };
    return { fontSize: '3.5pt', letterSpacing: '0px' };
  };

  const serialStyle = getSerialStyle(serialNumber.length);

  return (
    <div 
      className="label-container bg-white text-black box-border relative flex flex-col justify-between"
      style={{
        width: `${PRINTER_CONFIG.LABEL_WIDTH_MM}mm`,
        height: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
        maxHeight: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
        padding: '0.9mm 1.2mm 1.2mm 1.2mm',
        overflow: 'hidden',
        fontFamily: bodyFont,
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        color: '#000000'
      }}
    >
      {/* 1. Header: 2 Clean Rows (Brand on Top, Tagline + Model on Bottom) - Zero Collision Guaranteed */}
      <div className="flex flex-col shrink-0 border-b-[0.35mm] border-black pb-[0.35mm]">
        {/* Row 1: Authentic Goodwin G Emblem + Brand Name across the full width */}
        <div className="flex items-center gap-[0.8mm] leading-none">
          {/* Authentic Goodwin G Circular Emblem (Sharp 100% Black Vector) */}
          <svg 
            viewBox="0 0 100 100" 
            className="w-[3.2mm] h-[3.2mm] shrink-0" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="46" stroke="#000000" strokeWidth="8" fill="#ffffff" />
            <path 
              d="M 68 32 C 60 22 45 20 34 28 C 20 39 20 61 34 72 C 45 80 62 76 68 66 C 70 62 70 54 70 50 L 50 50 L 50 42 L 76 42 C 78 42 78 52 76 62 C 68 76 48 84 32 74 C 14 60 14 36 32 22 C 46 12 66 14 74 26 Z" 
              fill="#000000" 
            />
          </svg>

          <span 
            className="font-black text-black uppercase tracking-tight whitespace-nowrap"
            style={{ 
              fontFamily: logoFont,
              fontSize: '6.4pt', 
              lineHeight: 1,
              letterSpacing: letterSpacing,
              fontWeight: 900
            }}
          >
            GOODWIN BATTERIES
          </span>
        </div>

        {/* Row 2: Tagline on Left, Model Badge on Right (Plenty of Space, Never Collides) */}
        <div className="flex items-center justify-between leading-none mt-[0.35mm]">
          <span 
            className="font-bold text-black uppercase tracking-tight whitespace-nowrap truncate pr-[1mm]"
            style={{ 
              fontFamily: bodyFont,
              fontSize: '3.4pt', 
              lineHeight: 1
            }}
          >
            Your Trusted Power Source
          </span>

          {/* Model Box */}
          <div 
            className="shrink-0 border-[0.3mm] border-black rounded-[0.35mm] px-[1.2mm] py-[0.25mm] bg-white text-center inline-flex items-center gap-[0.6mm]"
            style={{ backgroundColor: '#ffffff' }}
          >
            <span className="text-[3.2pt] font-black text-black uppercase leading-none">MODEL:</span>
            <span 
              className="font-black text-black uppercase tracking-tight whitespace-nowrap leading-none"
              style={{ 
                fontFamily: bodyFont,
                fontSize: cleanModel.length > 12 ? '4.2pt' : '5.0pt',
                lineHeight: 1
              }}
            >
              {cleanModel}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: QR Code + Barcode */}
      <div className="flex flex-row items-center justify-between gap-[1mm] my-[0.4mm] shrink-0">
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

      {/* 3. Bottom Section: Clear Full-Width Metadata (Zero Truncation, Zero Clipping, Safe Tear Margin) */}
      <div className="border-t-[0.35mm] border-black pt-[0.35mm] shrink-0">
        <div className="flex justify-between items-center text-black font-extrabold" style={{ fontSize: '4.6pt', lineHeight: 1 }}>
          <div className="whitespace-nowrap">
            <span className="font-black">MFG:</span> {mfgDate}
          </div>
          <div className="whitespace-nowrap">
            <span className="font-black">WTY:</span> {warranty}
          </div>
        </div>

        {/* Full Serial Number (Safe from tear bar, scaled to 100% fit on 1 line) */}
        <div 
          className="font-black text-center text-black mt-[0.35mm] whitespace-nowrap overflow-hidden" 
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
