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
  showBarcode?: boolean;
}

export default function FactoryLabel({
  serialNumber,
  productModel,
  warranty,
  mfgDate,
  bodyFont = "Arial, Helvetica, sans-serif",
  serialFont = "'Consolas', 'Courier New', monospace",
  showBarcode = false,
}: FactoryLabelProps) {
  const verifyUrl = serialNumber
    ? `https://goodwinbatteries.in/support/warranty-registration?serial=${encodeURIComponent(serialNumber.trim())}`
    : `https://goodwinbatteries.in/support/warranty-registration`;

  // Clean model name for display (e.g. "GW-XL2.5LC (12 Months)" -> "GW-XL2.5LC")
  const cleanModel = productModel.replace(/\s*\([^)]*\)/g, '').trim() || productModel;

  // Clean warranty for badge (e.g. "48 Months" -> "48M", "36 Months" -> "36M")
  const cleanWarranty = warranty.replace(/Months?/i, 'M').replace(/\s+/g, '').trim() || warranty;

  // Dynamically auto-adjust font size & spacing for any model name length
  // to ensure 100% fit on 16mm box width with ZERO clipping or overflow
  const getModelStyle = (len: number) => {
    if (len <= 6) return { fontSize: '6.2pt', letterSpacing: '0.2px' };
    if (len <= 9) return { fontSize: '5.2pt', letterSpacing: '0.1px' };
    if (len <= 13) return { fontSize: '4.4pt', letterSpacing: '0px' };
    if (len <= 18) return { fontSize: '3.7pt', letterSpacing: '-0.05px' };
    if (len <= 24) return { fontSize: '3.2pt', letterSpacing: '-0.1px' };
    return { fontSize: '2.8pt', letterSpacing: '-0.15px' };
  };

  // Dynamically calculate font-size and spacing based on serial number length
  const getSerialStyle = (len: number) => {
    if (len <= 14) return { fontSize: '5.2pt', letterSpacing: '0.2px' };
    if (len <= 20) return { fontSize: '4.4pt', letterSpacing: '0.1px' };
    if (len <= 26) return { fontSize: '3.8pt', letterSpacing: '0px' };
    return { fontSize: '3.2pt', letterSpacing: '-0.05px' };
  };

  const modelStyle = getModelStyle(cleanModel.length);
  const serialStyle = getSerialStyle(serialNumber.length);

  // LAYOUT 1: MAX QR HERO (DEFAULT & HIGHLY RECOMMENDED)
  // Max content is the QR code (~17mm) for instant phone scanning.
  // ONLY the GW logo is used (no "goodwin" text).
  // Model auto-adjusts dynamically for 100% compatibility across all models.
  if (!showBarcode) {
    return (
      <div 
        className="label-container bg-white text-black box-border relative flex flex-row items-stretch justify-between"
        style={{
          width: `${PRINTER_CONFIG.LABEL_WIDTH_MM}mm`,
          height: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
          maxHeight: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
          padding: '0.8mm 1.0mm 2.0mm 1.0mm', // 2.0mm bottom clearance protects from printer tear bar
          overflow: 'hidden',
          fontFamily: bodyFont,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#000000',
          WebkitFontSmoothing: 'none',
          textRendering: 'geometricPrecision'
        }}
      >
        {/* LEFT: THE GIANT SCANNABLE QR CODE (MAX CONTENT) */}
        <div className="flex flex-col items-center justify-between w-[18.4mm] shrink-0 pr-[0.8mm] border-r-[0.35mm] border-black">
          {/* Giant QR Code: ~16.5mm x 16.5mm */}
          <div className="w-full flex-1 flex items-center justify-center p-[0.2mm] bg-white">
            <QRCodeSVG 
              value={verifyUrl} 
              size={64}
              style={{ width: '16.5mm', height: '16.5mm', imageRendering: 'pixelated' }}
              level="L" 
              includeMargin={false} 
              fgColor="#000000"
              bgColor="#FFFFFF"
            />
          </div>

          {/* Crisp Scan Guide underneath */}
          <div 
            className="w-full text-center font-black text-black tracking-tight uppercase leading-none pt-[0.4mm]"
            style={{ fontSize: '3.3pt', letterSpacing: '0.15px', textShadow: '0 0 0.15px #000000' }}
          >
            SCAN FOR E-WARRANTY
          </div>
        </div>

        {/* RIGHT: ONLY GW LOGO + AUTO-ADJUSTING MODEL + SERIAL + SPECS */}
        <div className="flex flex-col justify-between flex-1 min-w-0 pl-[1.0mm] h-full">
          {/* Top: ONLY Authentic GW Circular Emblem (NO "Goodwin" text!) + Warranty Pill */}
          <div className="flex items-center justify-between border-b-[0.35mm] border-black pb-[0.35mm]">
            {/* Authentic GW Circular Emblem (Sharp 100% Black Vector) */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-[5.2mm] h-[5.2mm] shrink-0" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="46" stroke="#000000" strokeWidth="8" fill="#ffffff" />
              <path 
                d="M 68 32 C 60 22 45 20 34 28 C 20 39 20 61 34 72 C 45 80 62 76 68 66 C 70 62 70 54 70 50 L 50 50 L 50 42 L 76 42 C 78 42 78 52 76 62 C 68 76 48 84 32 74 C 14 60 14 36 32 22 C 46 12 66 14 74 26 Z" 
                fill="#000000" 
              />
            </svg>

            {/* Warranty Pill */}
            <div className="flex flex-col items-end leading-none">
              <span 
                className="font-black text-black border-[0.35mm] border-black rounded-[0.35mm] px-[1mm] py-[0.3mm] bg-white uppercase text-center"
                style={{ fontSize: '4.4pt', lineHeight: 1, textShadow: '0 0 0.15px #000000' }}
              >
                {cleanWarranty}
              </span>
              <span className="text-[2.8pt] font-black uppercase text-black tracking-widest mt-[0.3mm]">
                WARRANTY
              </span>
            </div>
          </div>

          {/* Model Box - AUTO ADJUSTS TO EVERY MODEL (100% Compatible, Zero Clipping) */}
          <div className="border-[0.35mm] border-black rounded-[0.35mm] px-[0.8mm] py-[0.35mm] bg-white flex flex-col items-center justify-center text-center my-[0.3mm]">
            <span className="text-[2.8pt] font-black text-black uppercase leading-none tracking-wider mb-[0.2mm]">
              BATTERY MODEL
            </span>
            <span 
              className="font-black text-black uppercase tracking-tight truncate w-full leading-none"
              style={{ 
                fontFamily: bodyFont,
                fontSize: modelStyle.fontSize,
                letterSpacing: modelStyle.letterSpacing,
                lineHeight: 1,
                textShadow: '0 0 0.15px #000000'
              }}
            >
              {cleanModel}
            </span>
          </div>

          {/* Serial Number Box - Monospace, High-Contrast */}
          <div className="border-[0.35mm] border-black rounded-[0.35mm] px-[0.8mm] py-[0.35mm] bg-white flex flex-col items-center justify-center text-center my-[0.3mm]">
            <span className="text-[2.8pt] font-black text-black uppercase leading-none tracking-wider mb-[0.2mm]">
              SERIAL NUMBER
            </span>
            <span 
              className="font-black text-black uppercase truncate w-full leading-none font-mono"
              style={{ 
                fontFamily: serialFont,
                fontSize: serialStyle.fontSize,
                letterSpacing: serialStyle.letterSpacing,
                lineHeight: 1,
                textShadow: '0 0 0.15px #000000'
              }}
            >
              {serialNumber}
            </span>
          </div>

          {/* Bottom Metadata: Mfg Date & Genuine Badge */}
          <div className="flex items-center justify-between text-black font-bold pt-[0.2mm] border-t-[0.35mm] border-black leading-none" style={{ fontSize: '3.6pt' }}>
            <span style={{ textShadow: '0 0 0.15px #000000' }}>
              <strong>MFG:</strong> {mfgDate}
            </span>
            <span className="uppercase font-black tracking-wider" style={{ fontSize: '3.0pt' }}>
              GENUINE
            </span>
          </div>
        </div>
      </div>
    );
  }

  // LAYOUT 2: QR + FULL-WIDTH BARCODE (OPTIONAL)
  return (
    <div 
      className="label-container bg-white text-black box-border relative flex flex-col justify-between"
      style={{
        width: `${PRINTER_CONFIG.LABEL_WIDTH_MM}mm`,
        height: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
        maxHeight: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
        padding: '0.8mm 1.0mm 2.0mm 1.0mm',
        overflow: 'hidden',
        fontFamily: bodyFont,
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        color: '#000000',
        WebkitFontSmoothing: 'none',
        textRendering: 'geometricPrecision'
      }}
    >
      {/* Top Header: Only GW Logo + Model Box + Warranty (NO "Goodwin" text) */}
      <div className="flex items-center justify-between border-b-[0.35mm] border-black pb-[0.35mm] shrink-0">
        <svg 
          viewBox="0 0 100 100" 
          className="w-[4.0mm] h-[4.0mm] shrink-0" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="46" stroke="#000000" strokeWidth="8" fill="#ffffff" />
          <path 
            d="M 68 32 C 60 22 45 20 34 28 C 20 39 20 61 34 72 C 45 80 62 76 68 66 C 70 62 70 54 70 50 L 50 50 L 50 42 L 76 42 C 78 42 78 52 76 62 C 68 76 48 84 32 74 C 14 60 14 36 32 22 C 46 12 66 14 74 26 Z" 
            fill="#000000" 
          />
        </svg>

        <div className="border-[0.35mm] border-black rounded-[0.35mm] px-[1mm] py-[0.25mm] bg-white text-center inline-flex items-center gap-[0.4mm]">
          <span className="text-[2.8pt] font-black text-black uppercase leading-none">MODEL:</span>
          <span 
            className="font-black text-black uppercase tracking-tight whitespace-nowrap leading-none"
            style={{ 
              fontFamily: bodyFont,
              fontSize: modelStyle.fontSize,
              lineHeight: 1,
              textShadow: '0 0 0.15px #000000'
            }}
          >
            {cleanModel}
          </span>
        </div>

        <span 
          className="font-black text-black border-[0.35mm] border-black rounded-[0.35mm] px-[0.8mm] py-[0.2mm] uppercase text-center"
          style={{ fontSize: '4.2pt', lineHeight: 1 }}
        >
          {cleanWarranty}
        </span>
      </div>

      {/* Middle Row: Large QR Code + Metadata */}
      <div className="flex flex-row items-center justify-between gap-[1.5mm] my-[0.2mm] shrink-0">
        <div className="shrink-0 flex items-center justify-center p-[0.2mm] bg-white border border-black/50 rounded-[0.3mm]">
          <QRCodeSVG 
            value={verifyUrl} 
            size={48}
            style={{ width: '12.0mm', height: '12.0mm', imageRendering: 'pixelated' }}
            level="L" 
            includeMargin={false} 
            fgColor="#000000"
            bgColor="#FFFFFF"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between h-[12.0mm] py-[0.3mm]">
          <div className="text-[3.2pt] font-black uppercase text-black leading-tight">
            SCAN TO REGISTER DIGITAL WARRANTY
          </div>
          <div className="text-[3.8pt] font-bold text-black leading-none">
            <strong>MFG:</strong> {mfgDate}
          </div>
          <div className="text-[3.4pt] font-bold uppercase text-black">
            GENUINE BATTERY
          </div>
        </div>
      </div>

      {/* Bottom Row: Full-width Barcode + Protected Serial Number */}
      <div className="border-t-[0.35mm] border-black pt-[0.25mm] shrink-0">
        <div className="w-full flex items-center justify-center h-[3.8mm] overflow-hidden">
          <div className="w-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-[3.8mm]">
            <Barcode 
              value={serialNumber} 
              format="CODE128"
              width={1}
              height={16}
              displayValue={false}
              margin={0}
              background="#ffffff"
              lineColor="#000000"
            />
          </div>
        </div>

        <div 
          className="font-black text-center text-black mt-[0.25mm] whitespace-nowrap overflow-hidden font-mono" 
          style={{ 
            fontFamily: serialFont,
            fontSize: serialStyle.fontSize, 
            letterSpacing: serialStyle.letterSpacing,
            lineHeight: 1,
            textShadow: '0 0 0.15px #000000'
          }}
        >
          {serialNumber}
        </div>
      </div>
    </div>
  );
}
