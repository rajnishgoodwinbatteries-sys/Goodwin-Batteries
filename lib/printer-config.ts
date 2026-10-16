export const PRINTER_CONFIG = {
  LABEL_WIDTH_MM: 38,
  LABEL_HEIGHT_MM: 25,
  PRINTER_MODEL: "DCode DC 421 / 423 & TSC TE244",
  SUPPORTED_PRINTERS: [
    { id: "dcode", name: "DCode DC 421 / 423 (203 DPI)", model: "DCode DC 421 / 423" },
    { id: "tsc", name: "TSC TE244 (203 DPI)", model: "TSC TE244" },
    { id: "zebra", name: "Zebra ZD / ZT Series (203 DPI)", model: "Zebra ZD / ZT" },
  ]
};

export const THERMAL_FONT_PRESETS = {
  logoFonts: [
    { id: "arial-black", name: "Arial Black (Boldest & Sharpest - Recommended)", value: "'Arial Black', 'Trebuchet MS', Impact, sans-serif" },
    { id: "trebuchet", name: "Trebuchet MS Bold (High Legibility)", value: "'Trebuchet MS', 'Lucida Grande', sans-serif" },
    { id: "tahoma-bold", name: "Tahoma Bold (Ultra Crisp)", value: "Tahoma, Verdana, sans-serif" },
    { id: "impact", name: "Impact (Dense Industrial)", value: "Impact, Charcoal, sans-serif" },
    { id: "arial-heavy", name: "Arial Heavy (800 Weight)", value: "Arial, Helvetica, sans-serif" },
  ],
  bodyFonts: [
    { id: "tahoma", name: "Tahoma (High Clarity for Small Text - Recommended)", value: "Tahoma, Verdana, sans-serif" },
    { id: "trebuchet", name: "Trebuchet MS (High Contrast)", value: "'Trebuchet MS', 'Lucida Grande', sans-serif" },
    { id: "verdana", name: "Verdana (Spacious & Clean)", value: "Verdana, Geneva, sans-serif" },
    { id: "consolas", name: "Consolas / Mono (Crisp Grid)", value: "Consolas, 'Courier New', monospace" },
    { id: "arial-bold", name: "Arial Bold", value: "Arial, Helvetica, sans-serif" },
  ],
  serialFonts: [
    { id: "consolas", name: "Consolas Monospace (Crisp Digits - Recommended)", value: "Consolas, 'Courier New', monospace" },
    { id: "tahoma-bold", name: "Tahoma Bold (Tabular)", value: "Tahoma, Verdana, sans-serif" },
    { id: "courier", name: "Courier New (Monospaced)", value: "'Courier New', Courier, monospace" },
  ],
  trackingOptions: [
    { id: "anti-bleed", name: "Anti-Bleed (+0.2px - Recommended)", value: "0.2px" },
    { id: "standard", name: "Standard (0px)", value: "0px" },
    { id: "wide", name: "Wide (+0.4px)", value: "0.4px" },
  ]
};

export const getPrintCss = () => `
  @page {
    size: ${PRINTER_CONFIG.LABEL_WIDTH_MM}mm ${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm;
    margin: 0;
  }
  @media print {
    *, *:before, *:after {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
      box-sizing: border-box !important;
    }
    html, body {
      width: ${PRINTER_CONFIG.LABEL_WIDTH_MM}mm !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      color: #000000 !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
      text-rendering: geometricPrecision !important;
    }
    .print\\:hidden, nav, header, footer, .sidebar, aside {
      display: none !important;
    }
    .print-page-wrapper {
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      width: ${PRINTER_CONFIG.LABEL_WIDTH_MM}mm !important;
      height: auto !important;
    }
    .print-labels-container {
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
      gap: 0 !important;
      width: ${PRINTER_CONFIG.LABEL_WIDTH_MM}mm !important;
      height: auto !important;
    }
    .print-label-item {
      display: block !important;
      width: ${PRINTER_CONFIG.LABEL_WIDTH_MM}mm !important;
      height: ${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm !important;
      max-height: ${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      box-shadow: none !important;
      page-break-after: always !important;
      break-after: page !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      overflow: hidden !important;
    }
    .print-label-item:last-child {
      page-break-after: auto !important;
      break-after: auto !important;
    }
    .label-container {
      width: ${PRINTER_CONFIG.LABEL_WIDTH_MM}mm !important;
      height: ${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm !important;
      max-height: ${PRINTER_CONFIG.LABEL_HEIGHT_MM}mm !important;
      margin: 0 !important;
      padding: 1mm 1.2mm !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
      background: #ffffff !important;
      color: #000000 !important;
      position: relative !important;
      border: none !important;
      box-shadow: none !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      -webkit-font-smoothing: antialiased !important;
      text-rendering: geometricPrecision !important;
    }
    .label-container * {
      color: #000000 !important;
    }
    .label-container .text-white {
      color: #ffffff !important;
    }
    .label-container .bg-black {
      background-color: #000000 !important;
    }
  }
`;
