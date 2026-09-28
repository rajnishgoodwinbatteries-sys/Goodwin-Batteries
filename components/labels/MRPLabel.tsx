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
  const pxHeight = Math.round(heightMm * 3.78);
  const verifyUrl = `https://goodwinbatteries.in/product/${productModel}`;

  return (
    <div 
      className="mrp-label-container bg-white border border-gray-300 relative overflow-hidden text-black font-sans box-border"
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        pageBreakAfter: 'always',
        display: 'flex',
        flexDirection: 'column',
        padding: '3mm',
      }}
    >
      {/* Top Header */}
      <div className="flex justify-between items-start border-b-2 border-black pb-1 mb-1">
        <div>
          <h1 className="font-extrabold m-0 tracking-tight" style={{ fontSize: '14px', lineHeight: '1.2' }}>
            GOODWIN BATTERIES
          </h1>
          <div className="font-semibold" style={{ fontSize: '9px' }}>
            {productName}
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg bg-black text-white px-2" style={{ fontSize: '12px' }}>
            {productModel}
          </div>
          <div className="font-bold mt-1" style={{ fontSize: '8px' }}>
            {voltage} | {capacity}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row flex-grow justify-between mt-1">
        
        {/* Left Side: Specs & Price */}
        <div className="flex flex-col space-y-1" style={{ fontSize: '8px', lineHeight: '1.4' }}>
          <div>
            <strong>MRP: </strong> 
            <span className="font-bold text-black" style={{ fontSize: '11px' }}>
              ₹{mrp}
            </span>
            <div style={{ fontSize: '5px' }}>(Incl. of all taxes)</div>
          </div>
          
          <div className="pt-1">
            <strong>MFG Month/Year:</strong> {mfgDate}
          </div>
          
          {serialNumber && (
            <div>
              <strong>Batch/Serial No:</strong> {serialNumber}
            </div>
          )}

          <div className="mt-auto pt-2" style={{ fontSize: '5px' }}>
            <strong>Customer Care:</strong> 9220404411<br/>
            <strong>Website:</strong> goodwinbatteries.in<br/>
            Made in India
          </div>
        </div>

        {/* Right Side: QR & Barcode */}
        <div className="flex flex-col justify-between items-end">
          <QRCodeSVG 
            value={verifyUrl} 
            size={pxHeight * 0.3} 
            level="M" 
            includeMargin={false} 
          />
          
          {serialNumber && (
            <div className="mt-2" style={{ transform: 'scale(0.85)', transformOrigin: 'right bottom' }}>
              <Barcode 
                value={serialNumber} 
                format="CODE128"
                width={1.2}
                height={25}
                displayValue={true}
                fontSize={12}
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
