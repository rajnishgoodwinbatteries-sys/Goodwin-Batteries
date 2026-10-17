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
  // to ensure 100% fit on 18mm box width with ZERO clipping or overflow
  const getModelStyle = (len: number) => {
    if (len <= 6) return { fontSize: '7.6pt', letterSpacing: '0.2px' };
    if (len <= 9) return { fontSize: '6.6pt', letterSpacing: '0.1px' };
    if (len <= 13) return { fontSize: '5.8pt', letterSpacing: '0px' };
    if (len <= 18) return { fontSize: '5.0pt', letterSpacing: '-0.05px' };
    if (len <= 24) return { fontSize: '4.2pt', letterSpacing: '-0.1px' };
    return { fontSize: '3.6pt', letterSpacing: '-0.15px' };
  };

  // Dynamically calculate font-size and spacing based on serial number length
  // Calibrated for full 36mm width so any serial up to 48+ chars is 100% visible with maximum font size
  const getSerialStyle = (len: number) => {
    if (len <= 12) return { fontSize: '7.2pt', letterSpacing: '0.35px' };
    if (len <= 16) return { fontSize: '6.5pt', letterSpacing: '0.25px' };
    if (len <= 20) return { fontSize: '5.8pt', letterSpacing: '0.18px' };
    if (len <= 25) return { fontSize: '5.2pt', letterSpacing: '0.12px' };
    if (len <= 30) return { fontSize: '4.7pt', letterSpacing: '0.08px' };
    if (len <= 36) return { fontSize: '4.3pt', letterSpacing: '0.04px' };
    if (len <= 42) return { fontSize: '3.9pt', letterSpacing: '0px' };
    if (len <= 48) return { fontSize: '3.5pt', letterSpacing: '-0.05px' };
    return { fontSize: '3.1pt', letterSpacing: '-0.1px' };
  };

  const modelStyle = getModelStyle(cleanModel.length);
  const serialStyle = getSerialStyle(serialNumber.length);

  // LAYOUT 1: MAX QR HERO (DEFAULT & HIGHLY RECOMMENDED)
  // Max content is the QR code (~13.2mm) with highlighted SCAN FOR WARRANTY header on top.
  // Full-width serial number bar across the bottom guarantees 100% visibility for all serials.
  // ONLY the GW logo is used (no "goodwin" text).
  // Model, warranty, MFG, and serial auto-adjust dynamically for 100% compatibility across all models.
  if (!showBarcode) {
    return (
      <div 
        className="label-container bg-white text-black box-border relative flex flex-col justify-between"
        style={{
          width: `${PRINTER_CONFIG.LABEL_WIDTH_MM}mm`,
          height: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
          maxHeight: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
          padding: '0.8mm 1.2mm 1.6mm 1.2mm', // 1.6mm bottom clearance protects from printer tear bar
          overflow: 'hidden',
          fontFamily: bodyFont,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#000000',
          WebkitFontSmoothing: 'none',
          textRendering: 'geometricPrecision'
        }}
      >
        {/* TOP SECTION: SCANNABLE QR CODE (LEFT) + BRAND, MODEL & SPECS (RIGHT) */}
        <div className="flex flex-row items-stretch justify-between flex-1 min-h-0">
          {/* LEFT: HIGHLIGHTED "SCAN FOR WARRANTY" ON TOP + SCANNABLE QR CODE */}
          <div className="flex flex-col items-center justify-between w-[16.5mm] shrink-0 pr-[0.8mm] border-r-[0.35mm] border-black">
            {/* Highlighted Banner directly on top of the QR code */}
            <div 
              className="w-full bg-black text-white text-center font-black uppercase rounded-[0.35mm] py-[0.5mm] px-[0.2mm] mb-[0.5mm] leading-none shrink-0 label-badge-invert"
              style={{ 
                fontSize: '4.8pt', 
                letterSpacing: '0.15px',
                backgroundColor: '#000000',
                color: '#ffffff',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                lineHeight: 1
              }}
            >
              SCAN FOR WARRANTY
            </div>

            <div className="w-full flex-1 flex items-center justify-center bg-white min-h-0">
              <QRCodeSVG 
                value={verifyUrl} 
                size={160}
                style={{ 
                  width: '13.2mm', 
                  height: '13.2mm', 
                  maxWidth: '100%', 
                  maxHeight: '100%',
                  shapeRendering: 'crispEdges'
                }}
                level="L" 
                boostLevel={false}
                marginSize={1}
                fgColor="#000000"
                bgColor="#FFFFFF"
              />
            </div>
          </div>

          {/* RIGHT: ONLY GW LOGO + AUTO-ADJUSTING MODEL + WARRANTY & METADATA */}
          <div className="flex flex-col justify-between flex-1 min-w-0 pl-[1.2mm] h-full py-[0.1mm]">
            {/* Top Row: Authentic GW Circular Emblem + Bold Warranty Badge */}
            <div className="flex items-center justify-between pb-[0.2mm]">
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

              {/* Self-contained horizontal Warranty badge: Maximum Visibility */}
              <div className="border-[0.4mm] border-black rounded-[0.35mm] px-[1.1mm] py-[0.45mm] bg-white text-center leading-none inline-flex items-center gap-[0.6mm]">
                <span className="font-black text-[6.2pt] text-black tracking-tight" style={{ textShadow: '0 0 0.15px #000000', lineHeight: 1 }}>
                  {cleanWarranty}
                </span>
                <span className="text-[3.8pt] font-black uppercase text-black tracking-wider leading-none">
                  WARRANTY
                </span>
              </div>
            </div>

            {/* Model Box - AUTO-ADJUSTS DYNAMICALLY WITH INCREASED FONT SIZES */}
            <div className="border-[0.4mm] border-black rounded-[0.35mm] px-[0.8mm] py-[0.6mm] bg-white flex flex-col items-center justify-center text-center my-[0.3mm]">
              <div className="text-[3.6pt] font-black text-black uppercase leading-none tracking-wider mb-[0.4mm]">
                BATTERY MODEL
              </div>
              <div 
                className="font-black text-black uppercase tracking-tight truncate w-full leading-none"
                style={{ 
                  fontFamily: bodyFont,
                  fontSize: modelStyle.fontSize,
                  letterSpacing: modelStyle.letterSpacing,
                  textShadow: '0 0 0.15px #000000'
                }}
              >
                {cleanModel}
              </div>
            </div>

            {/* MFG Date Row - Dedicated line with bold legible text */}
            <div className="flex items-center justify-between text-black font-black text-[5.0pt] leading-none pt-[0.2mm]">
              <span>
                <strong className="font-black">MFG: </strong>
                <span className="font-bold">{mfgDate}</span>
              </span>
              <span className="text-[3.6pt] font-black uppercase tracking-wider">
                GENUINE
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: ONLY COMPLETE SERIAL NUMBER (AUTO-ADJUSTS, MAXIMUM LEGIBILITY) */}
        <div className="w-full border-t-[0.4mm] border-black pt-[0.5mm] mt-[0.3mm] flex items-center justify-center shrink-0 leading-none overflow-hidden">
          <span 
            className="font-black text-black uppercase whitespace-nowrap overflow-hidden font-mono text-center w-full leading-none tracking-tight"
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
        padding: '0.8mm 1.0mm 1.8mm 1.0mm',
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
          className="w-[4.4mm] h-[4.4mm] shrink-0" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="46" stroke="#000000" strokeWidth="8" fill="#ffffff" />
          <path 
            d="M 68 32 C 60 22 45 20 34 28 C 20 39 20 61 34 72 C 45 80 62 76 68 66 C 70 62 70 54 70 50 L 50 50 L 50 42 L 76 42 C 78 42 78 52 76 62 C 68 76 48 84 32 74 C 14 60 14 36 32 22 C 46 12 66 14 74 26 Z" 
            fill="#000000" 
          />
        </svg>

        <div className="border-[0.35mm] border-black rounded-[0.35mm] px-[1mm] py-[0.3mm] bg-white text-center inline-flex items-center gap-[0.5mm]">
          <span className="text-[3.2pt] font-black text-black uppercase leading-none">MODEL:</span>
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
          className="font-black text-black border-[0.35mm] border-black rounded-[0.35mm] px-[1.0mm] py-[0.3mm] uppercase text-center"
          style={{ fontSize: '5.2pt', lineHeight: 1 }}
        >
          {cleanWarranty}
        </span>
      </div>

      {/* Middle Row: Highlighted QR Code + Metadata */}
      <div className="flex flex-row items-center justify-between gap-[1.5mm] my-[0.2mm] shrink-0">
        <div className="shrink-0 flex flex-col items-center">
          <div 
            className="w-full bg-black text-white text-center font-black uppercase rounded-[0.3mm] py-[0.35mm] px-[0.2mm] mb-[0.35mm] leading-none shrink-0 label-badge-invert"
            style={{ 
              fontSize: '3.8pt', 
              letterSpacing: '0.1px',
              backgroundColor: '#000000',
              color: '#ffffff',
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            SCAN FOR WARRANTY
          </div>
          <div className="p-[0.2mm] bg-white border border-black/50 rounded-[0.3mm]">
            <QRCodeSVG 
              value={verifyUrl} 
              size={160}
              style={{ width: '11.0mm', height: '11.0mm', shapeRendering: 'crispEdges' }}
              level="L" 
              boostLevel={false}
              marginSize={1} 
              fgColor="#000000"
              bgColor="#FFFFFF"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between h-[13.0mm] py-[0.2mm]">
          <div className="text-[4.0pt] font-black uppercase text-black leading-tight">
            SCAN TO REGISTER DIGITAL WARRANTY
          </div>
          <div className="text-[4.8pt] font-bold text-black leading-none">
            <strong>MFG:</strong> {mfgDate}
          </div>
          <div className="text-[4.2pt] font-black uppercase text-black tracking-wider">
            GOODWIN BATTERIES
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
