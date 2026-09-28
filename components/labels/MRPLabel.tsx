import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';

export interface MRPLabelProps {
  productName: string;
  productModel: string;
  voltage: string;
  capacity: string;
  mrp: string;
  mfgDate: string;
  serialNumber?: string;
  widthMm?: number;
  heightMm?: number;
}

export default function MRPLabel({
  productName,
  productModel,
  voltage,
  capacity,
  mrp,
  mfgDate,
  serialNumber,
  widthMm = 75,
  heightMm = 50
}: MRPLabelProps) {
  const verifyUrl = `https://goodwinbatteries.in/product/${productModel}`;

  return (
    <div 
      className="mrp-label-container bg-white text-black font-sans box-border relative"
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        pageBreakInside: 'avoid',
        padding: '3mm',
        overflow: 'hidden'
      }}
    >
      {/* Top Header */}
      <div className="flex justify-between items-start border-b-[0.5mm] border-black pb-[1mm] mb-[2mm]">
        <div>
          <h1 className="font-extrabold m-0 tracking-tight" style={{ fontSize: '3.5mm', lineHeight: '1.2' }}>
            GOODWIN BATTERIES
          </h1>
          <div className="font-semibold" style={{ fontSize: '2.5mm' }}>
            {productName}
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold bg-black text-white px-[1mm] inline-block" style={{ fontSize: '3.5mm' }}>
            {productModel}
          </div>
          <div className="font-bold mt-[0.5mm]" style={{ fontSize: '2.5mm' }}>
            {voltage} | {capacity}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row flex-grow justify-between mt-[1mm]">
        
        {/* Left Side: Specs & Price */}
        <div className="flex flex-col space-y-[1mm]" style={{ fontSize: '2.5mm', lineHeight: '1.4' }}>
          <div>
            <strong>MRP: </strong> 
            <span className="font-bold text-black" style={{ fontSize: '4mm' }}>
              ₹{mrp}
            </span>
            <div style={{ fontSize: '1.5mm' }}>(Incl. of all taxes)</div>
          </div>
          
          <div className="pt-[1mm]">
            <strong>MFG:</strong> {mfgDate}
          </div>
          
          {serialNumber && (
            <div>
              <strong>Batch/Serial No:</strong> {serialNumber}
            </div>
          )}

          <div className="mt-auto pt-[2mm]" style={{ fontSize: '1.8mm', lineHeight: '1.2' }}>
            <strong>Customer Care:</strong> 9220404411<br/>
            <strong>Website:</strong> goodwinbatteries.in<br/>
            Made in India
          </div>
        </div>

        {/* Right Side: QR & Barcode */}
        <div className="flex flex-col justify-between items-end">
          <QRCodeSVG 
            value={verifyUrl} 
            size={100}
            style={{ width: '100%', height: '100%', maxWidth: '15mm', maxHeight: '15mm' }}
            level="M" 
            includeMargin={false} 
          />
          
          {serialNumber && (
            <div className="mt-[2mm]" style={{ transform: 'scale(0.5)', transformOrigin: 'right bottom' }}>
              <Barcode 
                value={serialNumber} 
                format="CODE128"
                width={1.5}
                height={35}
                displayValue={true}
                fontSize={16}
                margin={0}
                background="#ffffff"
                lineColor="#000000"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
