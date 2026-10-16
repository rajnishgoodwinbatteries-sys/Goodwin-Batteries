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
  logoFont = "'Arial Black', 'Trebuchet MS', Impact, sans-serif",
  bodyFont = "Tahoma, Verdana, sans-serif",
  serialFont = "'Consolas', 'Courier New', monospace",
  letterSpacing = "0.4px",
}: FactoryLabelProps) {
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
      {/* Header with high-clarity logo typography and anti-bleed tracking */}
      <div className="flex justify-between items-start border-b-[0.5mm] border-black pb-[0.5mm] mb-[0.8mm]">
        <div className="flex flex-col flex-1 min-w-0 pr-[1mm]">
          <div 
            className="font-black tracking-normal text-black uppercase" 
            style={{ 
              fontFamily: logoFont,
              fontSize: '8pt', 
              lineHeight: '1.05',
              letterSpacing: letterSpacing,
              fontWeight: 900
            }}
          >
            GOODWIN BATTERIES
          </div>
          <div 
            className="font-bold text-black" 
            style={{ 
              fontFamily: bodyFont,
              fontSize: '4.5pt',
              lineHeight: '1.1',
              letterSpacing: '0.2px'
            }}
          >
            Your Trusted Power Source
          </div>
        </div>
        <div 
          className="font-extrabold text-right truncate text-black ml-[1mm]" 
          style={{ 
            fontFamily: bodyFont,
            fontSize: '6.5pt', 
            lineHeight: '1.1', 
            maxWidth: '48%',
            letterSpacing: '0.15px'
          }}
        >
          {productModel}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-row justify-between flex-grow min-h-0">
        {/* Left Side: QR & Clear High-Contrast Bottom Text */}
        <div className="flex flex-col justify-between h-full w-[36%]">
          <div className="flex-1 min-h-0 flex items-center justify-start">
            <QRCodeSVG 
              value={verifyUrl} 
              style={{ width: '100%', height: '100%', maxWidth: '11.5mm', maxHeight: '11.5mm' }}
              level="M" 
              includeMargin={false} 
              fgColor="#000000"
              bgColor="#FFFFFF"
            />
          </div>
          <div 
            className="mt-[0.5mm] shrink-0 text-black font-bold" 
            style={{ 
              fontFamily: bodyFont,
              fontSize: '5.2pt', 
              lineHeight: '1.25',
              letterSpacing: '0.15px'
            }}
          >
            <div className="truncate text-ellipsis">
              <strong className="font-black">MFG:</strong> {mfgDate}
            </div>
            <div className="truncate text-ellipsis">
              <strong className="font-black">WTY:</strong> {warranty}
            </div>
          </div>
        </div>

        {/* Right Side: Barcode & Crisp Serial Number */}
        <div className="flex flex-col h-full w-[62%] justify-between items-end ml-[1mm]">
          <div className="w-full flex-grow min-h-0 flex items-center justify-end overflow-hidden">
            <div className="w-full h-full flex items-center justify-end [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-[11.5mm] [&>svg]:max-w-[21mm]">
              <Barcode 
                value={serialNumber} 
                format="CODE128"
                width={1.2}
                height={35}
                displayValue={false}
                margin={0}
                background="#ffffff"
                lineColor="#000000"
              />
            </div>
          </div>
          <div 
            className="font-bold text-right mt-[0.5mm] shrink-0 w-full text-black" 
            style={{ 
              fontFamily: serialFont,
              fontSize: '5.2pt', 
              lineHeight: '1.1', 
              wordBreak: 'break-all',
              letterSpacing: '0.4px',
              fontWeight: 800
            }}
          >
            {serialNumber}
          </div>
        </div>
      </div>
    </div>
  );
}
