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
  logoFont = "'Arial Black', 'Trebuchet MS', Impact, sans-serif",
  bodyFont = "Tahoma, Verdana, sans-serif",
  serialFont = "'Consolas', 'Courier New', monospace",
  letterSpacing = "0.4px",
}: MRPLabelProps) {
  const verifyUrl = `https://goodwinbatteries.in/warranty`;

  return (
    <div 
      className="label-container bg-white text-black box-border relative flex flex-col"
      style={{
        width: `${PRINTER_CONFIG.LABEL_WIDTH_MM}mm`,
        height: `${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm`,
        padding: '1.5mm',
        overflow: 'hidden',
        fontFamily: bodyFont,
        boxSizing: 'border-box'
      }}
    >
      {/* Top Header */}
      <div className="flex justify-between items-start border-b-[0.5mm] border-black pb-[0.5mm] mb-[0.6mm]">
        <div className="flex flex-col flex-1 min-w-0 pr-[1mm]">
          {/* Logo with high-clarity typography and anti-bleed tracking */}
          <h1 
            className="font-black m-0 tracking-normal text-black uppercase" 
            style={{ 
              fontFamily: logoFont,
              fontSize: '7.2pt', 
              lineHeight: '1.05',
              letterSpacing: letterSpacing,
              fontWeight: 900
            }}
          >
            GOODWIN BATTERIES
          </h1>
          <div 
            className="font-bold truncate text-black mt-[0.2mm]" 
            style={{ 
              fontFamily: bodyFont,
              fontSize: '5pt', 
              lineHeight: '1.1',
              letterSpacing: '0.15px'
            }}
          >
            {productName}
          </div>
        </div>

        <div className="text-right flex-shrink-0 ml-[0.5mm] max-w-[15mm]">
          <div 
            className="font-extrabold bg-black text-white px-[0.8mm] py-[0.2mm] inline-block truncate w-full text-center" 
            style={{ 
              fontFamily: bodyFont,
              fontSize: '5.5pt', 
              lineHeight: '1.1',
              letterSpacing: '0.2px'
            }}
          >
            {productModel}
          </div>
          <div 
            className="font-extrabold text-black mt-[0.3mm]" 
            style={{ 
              fontFamily: bodyFont,
              fontSize: '4.5pt', 
              lineHeight: '1' 
            }}
          >
            {voltage}|{capacity}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row flex-grow justify-between mt-[0.4mm] min-h-0">
        
        {/* Left Side: Specs, Price, and High-Clarity Bottom Details */}
        <div 
          className="flex flex-col justify-between w-[54%] text-black h-full" 
          style={{ fontFamily: bodyFont }}
        >
          <div className="space-y-[0.5mm]">
            <div>
              <span className="font-extrabold" style={{ fontSize: '5pt' }}>MRP: </span> 
              <span 
                className="font-black text-black ml-[0.5mm]" 
                style={{ fontSize: '7.5pt', letterSpacing: '0.2px' }}
              >
                ₹{mrp}
              </span>
              <div 
                className="font-bold text-black" 
                style={{ fontSize: '4pt', lineHeight: '1', letterSpacing: '0.1px' }}
              >
                (Incl. of all taxes)
              </div>
            </div>
            
            <div 
              className="text-black" 
              style={{ fontSize: '4.8pt', lineHeight: '1.1' }}
            >
              <strong className="font-black">MFG: </strong> 
              <span className="font-bold">{mfgDate}</span>
            </div>
          </div>
          
          {/* Bottom text block - Enhanced contrast, clear line-height, no blur */}
          <div 
            className="pt-[0.5mm] text-black font-bold" 
            style={{ 
              fontSize: '4.2pt', 
              lineHeight: '1.25',
              letterSpacing: '0.15px'
            }}
          >
            <div><strong className="font-black">CC:</strong> 9220404411</div>
            <div>goodwinbatteries.in</div>
            <div className="font-black tracking-wide">Made in India</div>
          </div>
        </div>

        {/* Right Side: QR & Barcode */}
        <div className="flex flex-col justify-between items-end w-[46%] h-full">
          <div className="flex-shrink-0">
            <QRCodeSVG 
              value={verifyUrl} 
              style={{ width: '100%', height: '100%', maxWidth: '10mm', maxHeight: '10mm' }}
              level="M" 
              includeMargin={false} 
              fgColor="#000000"
              bgColor="#FFFFFF"
            />
          </div>
          
          {serialNumber && (
            <div className="mt-[0.8mm] w-full flex-grow min-h-0 flex flex-col items-end justify-end overflow-hidden">
              <div className="w-full flex-grow min-h-0 flex items-center justify-end [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-[7.5mm] [&>svg]:max-w-max">
                <Barcode 
                  value={serialNumber} 
                  format="CODE128"
                  width={1}
                  height={18}
                  displayValue={false}
                  margin={0}
                  background="#ffffff"
                  lineColor="#000000"
                />
              </div>
              <div 
                className="font-bold text-right shrink-0 w-full text-black mt-[0.3mm]" 
                style={{ 
                  fontFamily: serialFont,
                  fontSize: '4.8pt', 
                  lineHeight: '1', 
                  wordBreak: 'break-all',
                  letterSpacing: '0.4px'
                }}
              >
                {serialNumber}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
