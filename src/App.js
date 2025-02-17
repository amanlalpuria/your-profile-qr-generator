import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

function App() {
    const [link, setLink] = useState("");
    const [qrLink, setQrLink] = useState("");
    const qrRef = useRef(null);

    const generateQR = () => {
        if (link.trim() !== "") {
            setQrLink(link);
        }
    };

    // Function to download the QR Code as an image with a 5px margin
    const downloadQR = () => {
        if (qrRef.current) {
            const canvas = document.createElement("canvas");
            const qrCanvas = qrRef.current.querySelector("canvas");
            if (qrCanvas) {
                const size = qrCanvas.width + 10; // 5px margin on each side
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext("2d");

                // Fill background with white and add margin
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, size, size);
                ctx.drawImage(qrCanvas, 5, 5);

                const url = canvas.toDataURL("image/png");
                const a = document.createElement("a");
                a.href = url;
                a.download = "qr-code.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
    };

    // Function to print the QR Code with a 5px margin
    const printQR = () => {
        if (qrRef.current) {
            const qrCanvas = qrRef.current.querySelector("canvas");
            if (!qrCanvas) return;

            const size = qrCanvas.width + 10; // 5px margin on each side
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");

            // Fill background with white and add margin
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(qrCanvas, 5, 5);

            const imgUrl = canvas.toDataURL();

            const printWindow = window.open("", "_blank");
            printWindow.document.write(`
                <html>
                    <head><title>Print QR Code</title></head>
                    <body style="text-align: center; padding: 20px;">
                        <h2>Scan this QR Code</h2>
                        <img src="${imgUrl}" style="border: 5px solid white;"/>
                        <script>
                            window.onload = function() {
                                window.print();
                                window.onafterprint = function() { window.close(); };
                            }
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Social Media QR Code Generator</h2>
            <input
                type="text"
                placeholder="Paste your profile link..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                style={{ width: "300px", padding: "10px", fontSize: "16px" }}
            />
            <br />
            <button onClick={generateQR} style={{ marginTop: "10px", padding: "10px 20px" }}>
                Generate QR Code
            </button>
            <br />
            {qrLink && (
                <div style={{ marginTop: "20px" }}>
                    <div ref={qrRef}>
                        <QRCodeCanvas value={qrLink} size={200} />
                    </div>
                    <p>Scan the QR to open the profile</p>
                    <button onClick={downloadQR} style={{ margin: "5px", padding: "10px 20px" }}>
                        Download QR
                    </button>
                    <button onClick={printQR} style={{ margin: "5px", padding: "10px 20px" }}>
                        Print QR
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
