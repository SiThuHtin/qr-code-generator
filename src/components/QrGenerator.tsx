'use client';

import React, { useState, useRef } from 'react';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { UploadCloud, Link as LinkIcon, FileCheck, Loader2, X } from 'lucide-react';

type Tab = 'text' | 'file';

const QrGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('text');
  const [inputText, setInputText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [qrValue, setQrValue] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const generateQrCode = () => {
    setErrorMsg('');
    setQrValue(inputText);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    // Client-side Validation: 5MB
    const MAX_MB = 5;
    if (file.size > MAX_MB * 1024 * 1024) {
      setErrorMsg(`File too large! Must be under 5MB (currently ${(file.size / 1024 / 1024).toFixed(2)}MB).`);
      return;
    }

    // Client-side Validation: Allowed Types
    const allowedExtensions = ['pdf', 'docx', 'xlsx', 'pptx', 'png', 'jpeg', 'jpg'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMsg(`File type not allowed. Supported: PDF, DOCX, XLSX, PPTX, PNG, JPEG.`);
      return;
    }

    setIsUploading(true);
    setErrorMsg('');
    setQrValue('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setQrValue(data.url);
      } else {
        setErrorMsg(data.error || 'File upload failed');
      }
    } catch (error) {
      setErrorMsg('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
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
    <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl transition-all hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">QR Code Generator</h1>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-zinc-800 rounded-lg p-1 mb-6">
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'text' ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          onClick={() => { setActiveTab('text'); setQrValue(''); setErrorMsg(''); }}
        >
          <LinkIcon size={16} /> Text / URL
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'file' ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          onClick={() => { setActiveTab('file'); setQrValue(''); setErrorMsg(''); }}
        >
          <UploadCloud size={16} /> File Upload
        </button>
      </div>

      {activeTab === 'text' ? (
        <div className="mb-6">
          <label htmlFor="qr-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Enter text or URL
          </label>
          <input
            id="qr-input"
            type="text"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-zinc-800 text-foreground transition-all"
            placeholder="https://example.com"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className="mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={generateQrCode}
            disabled={!inputText.trim()}
          >
            Generate QR Code
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Upload any file (PDF, PPTX, Docs, Images)
          </label>
          <div className="relative flex items-center justify-center w-full mt-2">
            <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${file ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-800 bg-gray-50 dark:bg-zinc-800'}`}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {file ? (
                  <>
                    <FileCheck className="w-8 h-8 mb-2 text-green-500" />
                    <p className="mb-2 text-sm text-green-600 dark:text-green-400 font-semibold truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center px-4">PDF, PPTX, XLSX, DOCX, PNG, JPEG</p>
                  </>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept=".pdf,.docx,.xlsx,.pptx,.png,.jpeg,.jpg"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) {
                    // Validate file type immediately
                    const allowedExtensions = ['pdf', 'docx', 'xlsx', 'pptx', 'png', 'jpeg', 'jpg'];
                    const fileExtension = selected.name.split('.').pop()?.toLowerCase() || '';
                    if (!allowedExtensions.includes(fileExtension)) {
                      setErrorMsg(`File type not allowed. Supported: PDF, DOCX, XLSX, PPTX, PNG, JPEG.`);
                      setFile(null);
                      return;
                    }

                    // Validate file size immediately
                    const MAX_MB = 5;
                    if (selected.size > MAX_MB * 1024 * 1024) {
                      setErrorMsg(`File too large! Must be under 5MB (currently ${(selected.size / 1024 / 1024).toFixed(2)}MB).`);
                      setFile(null);
                      return;
                    }

                    // If valid, clear any old error and set the file
                    setErrorMsg('');
                    setFile(selected);
                  }
                }}
              />
            </label>

            {file && !isUploading && (
              <button
                className="absolute top-3 right-3 p-1.5 bg-red-100/80 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors z-10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFile(null);
                  setErrorMsg('');
                  // Also clear value from the file input to allow re-selection of the same file
                  const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
                  if (fileInput) fileInput.value = '';
                }}
                title="Remove file"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {errorMsg && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{errorMsg}</p>}

          <button
            className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleFileUpload}
            disabled={!file || isUploading}
          >
            {isUploading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</>
            ) : (
              <>Generate QR Code</>
            )}
          </button>
        </div>
      )}

      {qrValue && !isUploading && (
        <div className="flex flex-col items-center mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div
            ref={qrCodeRef}
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <QRCode value={qrValue} size={200} level="H" includeMargin={true} />
          </div>
          <button
            className="mt-6 w-full flex items-center justify-center py-3 px-4 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-100 dark:hover:bg-white dark:text-black text-white font-semibold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all"
            onClick={downloadQrCode}
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QrGenerator;