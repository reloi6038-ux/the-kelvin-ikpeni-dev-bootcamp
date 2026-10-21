const crypto = require("crypto");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

function generateCertificateId() {
  const year = new Date().getFullYear();
  const random = crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 6);
  return `KIDB-${year}-${random}`;
}

async function generateQrBuffer(certificateId) {
  const baseUrl = process.env.PUBLIC_BASE_URL || "http://localhost:3000";
  // FIX: Pointing exactly to /verify-certificate.html
  const url = `${baseUrl}/verify-certificate.html?id=${encodeURIComponent(certificateId)}`;
  
  return QRCode.toBuffer(url, {
    type: "png",
    width: 200,
    margin: 1,
    color: { dark: "#0a0e27", light: "#ffffff" },
  });
}

async function generateCertificatePdf({ certificate, stream }) {
  const qrBuffer = await generateQrBuffer(certificate.certificateId);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
        info: {
          Title: `Certificate — ${certificate.studentName}`,
          Author: "The Kelvin Ikpeni Dev Bootcamp",
        },
      });

      doc.pipe(stream);
      doc.on("finish", resolve);
      doc.on("error", reject);

      const W = doc.page.width;   // 841.89
      const H = doc.page.height;  // 595.28

      // --- Background (Cream / Parchment) ---
      doc.rect(0, 0, W, H).fill("#FCFBF7");

      // --- Outer Gold Border ---
      doc
        .lineWidth(6)
        .strokeColor("#D4AF37")
        .rect(25, 25, W - 50, H - 50)
        .stroke();

      // --- Inner Navy Border ---
      doc
        .lineWidth(2)
        .strokeColor("#0a0e27")
        .rect(40, 40, W - 80, H - 80)
        .stroke();

      // --- Corner Ornaments (Gold) ---
      const corners = [
        [40, 40], [W - 40, 40], [40, H - 40], [W - 40, H - 40]
      ];
      corners.forEach(([x, y]) => {
        doc.circle(x, y, 6).fill("#D4AF37");
      });

      // --- Header Branding ---
      doc
        .fillColor("#0a0e27")
        .font("Helvetica-Bold")
        .fontSize(14)
        .text("THE KELVIN IKPENI DEV BOOTCAMP", 0, 80, {
          align: "center",
          characterSpacing: 4,
        });

      // --- Title ---
      const titleText = certificate.type === "accomplishment" 
        ? "Statement of Accomplishment" 
        : "Certificate of Completion";
      
      doc
        .fillColor("#D4AF37")
        .font("Helvetica-Bold")
        .fontSize(36)
        .text(titleText, 0, 120, { align: "center" });

      // --- Divider ---
      doc
        .moveTo(W / 2 - 150, 160)
        .lineTo(W / 2 + 150, 160)
        .lineWidth(1.5)
        .strokeColor("#D4AF37")
        .stroke();

      // --- Text ---
      doc
        .fillColor("#444444")
        .font("Helvetica")
        .fontSize(14)
        .text("This is proudly presented to", 0, 185, { align: "center" });

      // --- Student Name ---
      doc
        .fillColor("#0a0e27")
        .font("Helvetica-Bold")
        .fontSize(34)
        .text(certificate.studentName, 0, 215, { align: "center" });

      // --- Underline ---
      const nameWidth = Math.min(doc.widthOfString(certificate.studentName) + 60, 500);
      doc
        .moveTo(W / 2 - nameWidth / 2, 260)
        .lineTo(W / 2 + nameWidth / 2, 260)
        .lineWidth(1)
        .strokeColor("#D4AF37")
        .stroke();

      // --- Course Title ---
      doc
        .fillColor("#444444")
        .font("Helvetica")
        .fontSize(14)
        .text("for successfully completing the course", 0, 285, { align: "center" });

      doc
        .fillColor("#4a9eff")
        .font("Helvetica-Bold")
        .fontSize(24)
        .text(certificate.courseTitle, 0, 315, { align: "center" });

      // --- Issue Date ---
      const issueDate = new Date(certificate.issuedAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      });
      doc
        .fillColor("#666666")
        .font("Helvetica")
        .fontSize(12)
        .text(`Issued on ${issueDate}`, 0, 360, { align: "center" });

      // --- Certificate ID ---
      doc
        .fillColor("#D4AF37")
        .font("Courier-Bold")
        .fontSize(12)
        .text(`ID: ${certificate.certificateId}`, 0, 385, { align: "center" });

      // ==========================================
      // SIGNATURE AREA (Left)
      // ==========================================
      const sigY = 450;
      
      // Signature Line
      doc
        .moveTo(150, sigY)
        .lineTo(350, sigY)
        .lineWidth(1)
        .strokeColor("#0a0e27")
        .stroke();

      // CEO Signature (Script font simulation)
      doc
        .fillColor("#0a0e27")
        .font("Times-Italic")
        .fontSize(24)
        .text("Kelvin S. Ikpeni", 150, sigY - 30, { width: 200, align: "center" });

      // CEO Title
      doc
        .fillColor("#666666")
        .font("Helvetica")
        .fontSize(10)
        .text("Founder & CEO", 150, sigY + 8, { width: 200, align: "center" });

      // ==========================================
      // GOLD EMBOSSED SEAL (Center Bottom)
      // ==========================================
      const sealX = W / 2;
      const sealY = sigY + 20;
      const sealRadius = 42;

      // Outer Gold Circle
      doc
        .circle(sealX, sealY, sealRadius)
        .fill("#D4AF37");

      // Inner Dark Gold Ring (Embossed look)
      doc
        .circle(sealX, sealY, sealRadius - 5)
        .lineWidth(2)
        .strokeColor("#B8860B")
        .stroke();

      // White Highlight Ring (Adds 3D metallic reflection)
      doc
        .circle(sealX, sealY, sealRadius - 8)
        .lineWidth(1)
        .strokeColor("#FFF8DC")
        .stroke();

      // Carved text: "KIDB"
      doc
        .fillColor("#8B6508") // Dark gold for carved shadow look
        .font("Helvetica-Bold")
        .fontSize(22)
        .text("KIDB", sealX - 32, sealY - 12, { 
          width: 64, 
          align: "center", 
          characterSpacing: 2 
        });

      // Small stars on the seal
      doc
        .fillColor("#8B6508")
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("★  ★  ★", sealX - 30, sealY + 14, { width: 60, align: "center" });

      // ==========================================
      // QR CODE + VERIFICATION (Right)
      // ==========================================
      const qrSize = 80;
      const qrX = W - 160;
      const qrY = sigY - 35;
      
      doc.image(qrBuffer, qrX, qrY, { width: qrSize, height: qrSize });

      doc
        .fillColor("#666666")
        .font("Helvetica")
        .fontSize(8)
        .text("Verify at:", qrX - 20, qrY + qrSize + 6, { width: qrSize + 40, align: "center" });

      // FIX: Corrected the text printed below the QR code
      doc
        .fillColor("#0a0e27")
        .font("Courier")
        .fontSize(7)
        .text(
          `${process.env.PUBLIC_BASE_URL || "http://localhost:3000"}/verify-certificate.html`,
          qrX - 60, qrY + qrSize + 18,
          { width: qrSize + 120, align: "center" }
        );

      // --- If revoked, overlay banner ---
      if (certificate.revoked) {
        doc
          .save()
          .rotate(-30, { origin: [W / 2, H / 2] })
          .fillColor("#ff4757")
          .opacity(0.25)
          .fontSize(90)
          .font("Helvetica-Bold")
          .text("REVOKED", 0, H / 2 - 40, { align: "center" })
          .restore();
        doc.opacity(1);
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateCertificateId, generateCertificatePdf };