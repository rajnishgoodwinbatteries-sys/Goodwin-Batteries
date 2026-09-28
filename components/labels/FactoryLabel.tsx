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
  const verifyUrl = `https://goodwinbatteries.in/warranty`;

  return (
    <div 
      className="factory-label-container bg-white text-black font-sans box-border relative"
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        pageBreakInside: 'avoid',
        padding: '1.5mm',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        textRendering: 'optimizeSpeed',
        WebkitFontSmoothing: 'none',
        imageRendering: 'pixelated',
        filter: 'grayscale(100%) contrast(1000%)'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .factory-label-container svg { shape-rendering: crispEdges; }
      `}} />
      {/* Header */}
      <div className="flex justify-between items-start border-b border-black pb-[0.5mm] mb-[1mm]">
        <div className="flex flex-col">
          <div className="font-extrabold tracking-tighter" style={{ fontSize: '2.5mm', lineHeight: '1' }}>GOODWIN BATTERIES</div>
          <div className="font-normal tracking-tight" style={{ fontSize: '1.2mm' }}>Your Trusted Power Source</div>
        </div>
        <div className="font-bold text-right truncate" style={{ fontSize: '1.8mm', lineHeight: '1.1', maxWidth: '50%' }}>
          {productModel}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-row justify-between flex-grow min-h-0">
        {/* Left Side: QR & Text */}
        <div className="flex flex-col h-full w-[35%]">
          <div className="flex-1 min-h-0 flex items-center">
            <QRCodeSVG 
              value={verifyUrl} 
              style={{ width: '100%', height: '100%', maxWidth: '10mm', maxHeight: '10mm' }}
              level="M" 
              includeMargin={false} 
            />
          </div>
          <div className="mt-[0.5mm] shrink-0" style={{ fontSize: '1.4mm', lineHeight: '1.2' }}>
            <div className="font-bold truncate text-ellipsis">MFG: {mfgDate}</div>
            <div className="font-bold truncate text-ellipsis">WTY: {warranty}</div>
          </div>
        </div>

        {/* Right Side: Barcode */}
        <div className="flex flex-col h-full w-[60%] justify-center items-end ml-[1mm]">
          <div className="w-full flex-grow min-h-0 flex items-center justify-end overflow-hidden">
            <div className="w-full h-full flex items-center justify-end [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-[12mm] [&>svg]:max-w-max">
              <Barcode 
                value={serialNumber} 
                format="CODE128"
                width={1}
                height={50}
                displayValue={false}
                margin={0}
                background="#ffffff"
                lineColor="#000000"
              />
            </div>
          </div>
          <div className="font-extrabold text-right mt-[0.5mm] tracking-tight shrink-0 w-full" style={{ fontSize: '1.2mm', lineHeight: '1.1', wordBreak: 'break-all' }}>
            {serialNumber}
          </div>
        </div>
      </div>
    </div>
  );
}
