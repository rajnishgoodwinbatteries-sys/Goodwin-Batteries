import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';

export interface FactoryLabelProps {
  serialNumber: string;
  productModel: string;
  warranty: string;
  mfgDate: string;
  widthMm?: number;
  heightMm?: number;
}

export default function FactoryLabel({
  serialNumber,
  productModel,
  warranty,
  mfgDate,
  widthMm = 38,
  heightMm = 25
}: FactoryLabelProps) {
  // Convert mm to pixels roughly for screen display, but print CSS will handle exact sizing
  // 1 mm is approx 3.78 px at 96 dpi
  const pxWidth = Math.round(widthMm * 3.78);
  const pxHeight = Math.round(heightMm * 3.78);
  const verifyUrl = `https://goodwinbatteries.in/verify/${serialNumber}`;

  return (
    <div 
      className="factory-label-container bg-white border border-gray-300 relative overflow-hidden text-black font-sans box-border"
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        pageBreakAfter: 'always',
        display: 'flex',
        flexDirection: 'column',
        padding: '2mm',
      }}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-black pb-1 mb-1">
        <div className="font-bold tracking-tighter" style={{ fontSize: '10px', lineHeight: '1' }}>
          GOODWIN BATTERIES
          <div className="font-normal" style={{ fontSize: '5px' }}>Your Trusted Power Source</div>
        </div>
        <div className="font-bold" style={{ fontSize: '10px' }}>
          {productModel}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-row flex-grow justify-between items-center">
        {/* Left Side: QR & Text */}
        <div className="flex flex-col justify-between h-full">
          <QRCodeSVG 
            value={verifyUrl} 
            size={pxHeight * 0.4} 
            level="H" 
            includeMargin={false} 
          />
          <div style={{ fontSize: '6px', lineHeight: '1.2' }} className="mt-1">
            <div><strong>MFG:</strong> {mfgDate}</div>
            <div><strong>WTY:</strong> {warranty} Months</div>
          </div>
        </div>

        {/* Right Side: Barcode */}
        <div className="flex flex-col items-end justify-center h-full w-[60%] overflow-hidden">
          <div className="w-full flex justify-end" style={{ transform: 'scale(0.65)', transformOrigin: 'right center' }}>
            <Barcode 
              value={serialNumber} 
              format="CODE128"
              width={1.1}
              height={30}
              displayValue={false}
              margin={0}
              background="#ffffff"
              lineColor="#000000"
            />
          </div>
          <div className="text-center font-bold mt-1 tracking-wider" style={{ fontSize: '7px', width: '100%', textAlign: 'right' }}>
            {serialNumber}
          </div>
        </div>
      </div>
    </div>
  );
}
