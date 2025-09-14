import React, { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeGeneratorProps {
  value: string;
}

const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({ value }) => {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: 'CODE39',
        width: 2, // largura das barras
        height: 100,
        displayValue: true,
        margin: 0,
         ...( { fit: true }  )
      });
    }
  }, [value]);

  return (
    <div className="w-full flex justify-center">
      {/* Limita o tamanho e deixa o svg se ajustar */}
      <svg ref={barcodeRef} style={{ maxWidth: "100%", height: "auto" }} />
    </div>
  );
};

export default BarcodeGenerator;
