import { useState } from "react";

function QrCodeGenerator() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("");
  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrCode.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("error downloading qr code", error);
      });
  }
  return (
    <>
      <div className="container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} alt="" className="qr-img" />}
        <div>
          <input
            type="text"
            placeholder="Data for QR code"
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image size (e.g 150)"
            value={qrSize}
            onChange={(e) => setQrSize(e.target.value)}
          />

          <button
            className="generate-btn"
            onClick={generateQR}
            disabled={loading}
          >
            Generate QR code
          </button>
          <button className="download-btn" onClick={downloadQR}>
            Download QR code
          </button>
        </div>
        <p style={{ color: "black", marginTop: "30px", fontWeight: 600 }}>
          Designed by Chandru.
        </p>
      </div>
    </>
  );
}

export default QrCodeGenerator;
