'use client';

import React, { useState, useRef } from 'react';
import { QRCodeCanvas as QRCode } from 'qrcode.react';

const QrGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [qrValue, setQrValue] = useState<string>('');
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const generateQrCode = () => {
    setQrValue(inputText);
  };

  const downloadQrCode = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector('canvas');
      if (canvas) {
        const pngUrl = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">QR Code Generator</h1>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
          placeholder="Enter text or URL"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
          onClick={generateQrCode}
          disabled={!inputText.trim()}
        >
          Generate QR Code
        </button>

        {qrValue && (
          <div className="flex flex-col items-center mt-6">
            <div ref={qrCodeRef} className="p-2 border border-gray-200 rounded-md bg-white">
              <QRCode value={qrValue} size={256} level="H" includeMargin={true} />
            </div>
            <button
              className="mt-4 bg-green-600 text-white p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={downloadQrCode}
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrGenerator;