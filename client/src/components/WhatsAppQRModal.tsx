import React, { useEffect, useState, useRef } from 'react';
import { api } from '../lib/api';

interface WhatsAppQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
}

export const WhatsAppQRModal: React.FC<WhatsAppQRModalProps> = ({ isOpen, onClose, token }) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'waiting' | 'scanned' | 'error'>('waiting');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Initialize WhatsApp connection and get QR code
  const initializeConnection = async () => {
    setLoading(true);
    setStatus('waiting');
    try {
      // Call backend to initiate WhatsApp connection
      const response = (await api.getWhatsappConnect(token)) as any;
      
      if (response.data?.qrCode && response.data.qrCode !== 'connecting...') {
        setQrCode(response.data.qrCode);
      }

      // Start polling for connection status
      startPolling();
    } catch (error) {
      console.error('Failed to initialize WhatsApp:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Poll WhatsApp status every 2 seconds
  const startPolling = () => {
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = (await api.getWhatsappStatus(token)) as any;
        const connectionStatus = response.data;

        if (connectionStatus?.isConnected) {
          setStatus('scanned');
          setPhoneNumber(connectionStatus.phoneNumber);
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }
          // Close modal after 2 seconds
          setTimeout(onClose, 2000);
        } else if (connectionStatus?.qrCode && connectionStatus.qrCode !== 'connecting...') {
          setQrCode(connectionStatus.qrCode);
        }
      } catch (error) {
        console.error('Status check error:', error);
      }
    }, 2000);
  };

  useEffect(() => {
    if (isOpen) {
      initializeConnection();
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-100">Connect WhatsApp</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>

        {/* QR Code Display */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-400 mb-4" />
            <p className="text-neutral-400 text-sm">Generating QR code...</p>
          </div>
        ) : status === 'waiting' ? (
          <div className="space-y-4">
            {qrCode ? (
              <div className="flex flex-col items-center">
                <img
                  src={qrCode}
                  alt="WhatsApp QR Code"
                  className="w-64 h-64 border-2 border-neutral-700 rounded-lg p-2 bg-white"
                />
                <p className="text-neutral-400 text-sm text-center mt-4">
                  Open WhatsApp on your phone and scan this QR code to connect
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-400 mb-4" />
                <p className="text-neutral-400 text-sm">Waiting for QR code...</p>
              </div>
            )}
          </div>
        ) : status === 'scanned' ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-green-500 mb-4">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <p className="text-neutral-100 font-semibold mb-1">Connected!</p>
            <p className="text-neutral-400 text-sm text-center">
              {phoneNumber && `Phone: ${phoneNumber}`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
            <p className="text-neutral-100 font-semibold mb-1">Connection Failed</p>
            <p className="text-neutral-400 text-sm text-center mb-4">
              Unable to connect. Please try again.
            </p>
            <button
              onClick={initializeConnection}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Footer */}
        {status === 'waiting' && !loading && qrCode && (
          <div className="border-t border-neutral-800 mt-6 pt-4">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
