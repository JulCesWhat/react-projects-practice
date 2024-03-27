import { useState } from "react";
import QRCode from "react-qr-code";
import "./styles.css";

const QrCodeGenerator = () => {
  const [qrCode, setQrCode] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnGenerate = () => {
    setQrCode(text);
    setText("");
  };

  return (
    <div>
      <h1>Qr Code Generator</h1>
      <div className="qr-code-actions">
        <input
          type="text"
          onChange={handleOnChange}
          value={text}
          placeholder="Enter text to generate QR code"
        />
        <button
          disabled={!(text && text.trim() !== "")}
          onClick={handleOnGenerate}
        >
          Generate
        </button>
      </div>
      <div>
        <QRCode id="qr-code-id" value={qrCode} />
      </div>
    </div>
  );
};

export default QrCodeGenerator;
