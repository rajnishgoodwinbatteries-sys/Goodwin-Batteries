import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import { PRINTER_CONFIG } from '@/lib/printer-config';

export interface MRPLabelProps {
  productName: string;
  productModel: string;
  voltage: string;
  capacity: string;
  mrp: string;
  mfgDate: string;
  serialNumber?: string;
  logoFont?: string;
  bodyFont?: string;
  serialFont?: string;
  letterSpacing?: string;
}

export default function MRPLabel({
  productName,
  productModel,
  voltage,
  capacity,
  mrp,
  mfgDate,
  serialNumber,
  bodyFont = "Tahoma, Verdana, sans-serif",
  serialFont = "'Consolas', 'Courier New', monospace",
}: MRPLabelProps) {
  const verifyUrl = serialNumber
    ? `https://goodwinbatteries.in/support/warranty-registration?serial=${encodeURIComponent(serialNumber.trim())}`
    : `https://goodwinbatteries.in/support/warranty-registration`;

  // Clean model and product name for display (strip any "Goodwin" text to keep ONLY GW logo)
  const cleanProductName = productName.replace(/goodwin\s*/gi, '').trim() || 'AUTOMOTIVE BATTERY';
  const cleanModel = productModel.replace(/\s*\([^)]*\)/g, '').trim() || productModel;

  // Auto-adjust font size for model based on length to guarantee 100% fit
  const getModelStyle = (len: number) => {
    if (len <= 7) return { fontSize: '5.6pt', letterSpacing: '0.1px' };
    if (len <= 11) return { fontSize: '4.8pt', letterSpacing: '0px' };
    if (len <= 15) return { fontSize: '4.2pt', letterSpacing: '-0.05px' };
    return { fontSize: '3.6pt', letterSpacing: '-0.1px' };
  };

  // Auto-adjust font size for serial number based on length across full width
  const getSerialStyle = (len: number) => {
    if (len <= 14) return { fontSize: '5.2pt', letterSpacing: '0.2px' };
    if (len <= 20) return { fontSize: '4.6pt', letterSpacing: '0.15px' };
    if (len <= 26) return { fontSize: '4.2pt', letterSpacing: '0.1px' };
    if (len <= 32) return { fontSize: '3.9pt', letterSpacing: '0.05px' };
    if (len <= 38) return { fontSize: '3.6pt', letterSpacing: '0px' };
    if (len <= 44) return { fontSize: '3.2pt', letterSpacing: '-0.05px' };
    return { fontSize: '2.8pt', letterSpacing: '-0.1px' };
  };

  const modelStyle = getModelStyle(cleanModel.length);
  const serialStyle = getSerialStyle(serialNumber?.length || 0);

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
      {/* Top Header: ONLY GW LOGO (No "Goodwin" text, No "GENUINE") + Auto-adjusting Model Box + Voltage/Capacity */}
      <div className="flex justify-between items-center border-b-[0.35mm] border-black pb-[0.35mm] mb-[0.25mm] shrink-0">
        <div className="flex items-center gap-[0.8mm] flex-1 min-w-0 pr-[1mm]">
          {/* Authentic GW Circular Emblem (Sharp 100% Black Vector) */}
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

          <div className="flex flex-col min-w-0">
            <div 
              className="font-black truncate text-black leading-tight uppercase" 
              style={{ 
                fontFamily: bodyFont,
                fontSize: '4.4pt', 
                letterSpacing: '0.1px'
              }}
            >
              {cleanProductName}
            </div>
            <span className="text-[2.8pt] font-extrabold uppercase text-black tracking-wider leading-none mt-[0.2mm]">
              AUTOMOTIVE BATTERY
            </span>
          </div>
        </div>

        {/* Model Box on Header Right: Auto-adjusts for all models */}
        <div className="text-right flex-shrink-0 ml-[0.5mm] max-w-[17mm]">
          <div 
            className="font-black border-[0.35mm] border-black bg-white text-black px-[0.8mm] py-[0.25mm] inline-block truncate w-full text-center rounded-[0.35mm] leading-none" 
            style={{ 
              fontFamily: bodyFont,
              fontSize: modelStyle.fontSize, 
              lineHeight: '1',
              letterSpacing: modelStyle.letterSpacing,
              textShadow: '0 0 0.15px #000000'
            }}
          >
            {cleanModel}
          </div>
          <div 
            className="font-extrabold text-black mt-[0.2mm] leading-none" 
            style={{ 
              fontFamily: bodyFont,
              fontSize: '4.0pt', 
              lineHeight: '1' 
            }}
          >
            {voltage}|{capacity}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-row flex-grow justify-between items-stretch min-h-0">
        
        {/* Left Side: Pricing & Metadata */}
        <div 
          className="flex flex-col justify-between w-[52%] text-black h-full pr-[0.8mm]" 
          style={{ fontFamily: bodyFont }}
        >
          <div className="space-y-[0.3mm]">
            <div>
              <span className="font-extrabold" style={{ fontSize: '4.8pt' }}>MRP: </span> 
              <span 
                className="font-black text-black ml-[0.5mm]" 
                style={{ fontSize: '7.5pt', letterSpacing: '0.2px', textShadow: '0 0 0.15px #000000' }}
              >
                ₹{mrp}
              </span>
              <div 
                className="font-bold text-black" 
                style={{ fontSize: '3.6pt', lineHeight: '1', letterSpacing: '0.1px' }}
              >
                (Incl. of all taxes)
              </div>
            </div>
            
            <div 
              className="text-black" 
              style={{ fontSize: '4.4pt', lineHeight: '1.1' }}
            >
              <strong className="font-black">MFG: </strong> 
              <span className="font-bold">{mfgDate}</span>
            </div>
          </div>
          
          {/* Bottom details */}
          <div 
            className="pt-[0.3mm] text-black font-bold" 
            style={{ 
              fontSize: '3.8pt', 
              lineHeight: '1.2',
              letterSpacing: '0.1px'
            }}
          >
            <div><strong className="font-black">CC:</strong> 9220404411</div>
            <div>Scan QR for Portal</div>
            <div className="font-black tracking-wide">Made in India</div>
          </div>
        </div>

        {/* Right Side: MAX SCANNABLE QR CODE */}
        <div className="flex flex-col justify-center items-center w-[48%] h-full pl-[0.8mm] border-l-[0.35mm] border-black">
          <div className="flex flex-col items-center justify-center">
            <QRCodeSVG 
              value={verifyUrl} 
              size={52}
              style={{ 
                width: '13.5mm', 
                height: '13.5mm', 
                imageRendering: 'pixelated' 
              }}
              level="L" 
              includeMargin={false} 
              fgColor="#000000"
              bgColor="#FFFFFF"
            />
            <div className="text-[2.8pt] font-black uppercase text-center mt-[0.35mm] tracking-tight">
              SCAN TO REGISTER
            </div>
          </div>
        </div>
      </div>

      {/* Optional Full-width Serial Number (36mm wide - 100% visible for all serial lengths!) */}
      {serialNumber && (
        <div className="w-full border-t-[0.35mm] border-black pt-[0.25mm] mt-[0.25mm] flex items-center justify-between shrink-0">
          <span className="text-[2.6pt] font-black uppercase text-black tracking-wider leading-none">
            S/N:
          </span>
          <span 
            className="font-mono font-black text-center flex-1 mx-[0.5mm] leading-none whitespace-nowrap overflow-hidden text-black"
            style={{ 
              fontFamily: serialFont,
              fontSize: serialStyle.fontSize,
              letterSpacing: serialStyle.letterSpacing,
              textShadow: '0 0 0.15px #000000'
            }}
          >
            {serialNumber}
          </span>
          <span className="text-[2.6pt] font-black text-black uppercase tracking-wider leading-none">
            INDIA
          </span>
        </div>
      )}
    </div>
  );
}
