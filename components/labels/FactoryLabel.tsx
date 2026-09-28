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
  const verifyUrl = `https://goodwinbatteries.in/verify/${serialNumber}`;

  return (
    <div 
      className="factory-label-container bg-white text-black font-sans box-border relative"
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        pageBreakInside: 'avoid',
        padding: '1.5mm',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start border-b border-black pb-[0.5mm] mb-[1mm]">
        <div className="flex flex-col">
          <div className="font-extrabold tracking-tighter" style={{ fontSize: '2.5mm', lineHeight: '1' }}>GOODWIN BATTERIES</div>
          <div className="font-normal tracking-tight" style={{ fontSize: '1.2mm' }}>Your Trusted Power Source</div>
        </div>
        <div className="font-bold text-right" style={{ fontSize: '2mm', lineHeight: '1.1', maxWidth: '45%' }}>
          {productModel}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-row justify-between h-[15mm]">
        {/* Left Side: QR & Text */}
        <div className="flex flex-col h-full w-[40%]">
          <div className="flex-1 flex items-center">
            <QRCodeSVG 
              value={verifyUrl} 
              size={100}
              style={{ width: '100%', height: '100%', maxWidth: '10mm', maxHeight: '10mm' }}
              level="M" 
              includeMargin={false} 
            />
          </div>
          <div className="mt-[0.5mm]" style={{ fontSize: '1.5mm', lineHeight: '1.2' }}>
            <div><strong>MFG:</strong> {mfgDate}</div>
            <div><strong>WTY:</strong> {warranty}</div>
          </div>
        </div>

        {/* Right Side: Barcode */}
        <div className="flex flex-col h-full w-[55%] justify-center items-end">
          <div style={{ transform: 'scale(0.35)', transformOrigin: 'right center', whiteSpace: 'nowrap' }}>
            <Barcode 
              value={serialNumber} 
              format="CODE128"
              width={1.5}
              height={45}
              displayValue={false}
              margin={0}
              background="#ffffff"
              lineColor="#000000"
            />
          </div>
          <div className="font-bold text-right mt-[0.5mm] tracking-tight" style={{ fontSize: '1.5mm' }}>
            {serialNumber}
          </div>
        </div>
      </div>
    </div>
  );
}
