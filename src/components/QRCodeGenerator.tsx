import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  value: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value }) => {
  const qrCodeRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      QRCode.toDataURL(value, { errorCorrectionLevel: 'H' })
        .then((url) => {
          if (qrCodeRef.current) { 
            qrCodeRef.current.src = url; 
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [value]);

  return <img ref={qrCodeRef} alt="Generated QR Code" />;
};

export default QRCodeGenerator;  