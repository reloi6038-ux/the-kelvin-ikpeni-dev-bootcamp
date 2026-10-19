// ============================================================
// src/services/certificateGenerator.js
// Unique ID generation, QR code, and PDF certificate layout.
// ============================================================

const crypto = require("crypto");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

/**
 * Generate a unique certificate ID like "KIDB-2026-A1B2C3".
 */
function generateCertificateId() {
  const year = new Date().getFullYear();
  const random = crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 6);
  return `KIDB-${year}-${random}`;
}

/**
 * Generate a QR code PNG buffer pointing to the public verification URL.
 */
async function generateQrBuffer(certificateId) {
  const baseUrl =
    process.env.PUBLIC_BASE_URL ||
    "http://localhost:3000";
  const url = `${baseUrl}/verify-certificate.html?id=${encodeURIComponent(certificateId)}`;
  return QRCode.toBuffer(url, {
    type: "png",
    width: 220,
    margin: 1,
    color: { dark: "#0a0e27", light: "#ffffff" },
  });
}

/**
 * Render a certificate PDF to a writable stream.
 * @param {object} opts
 * @param {object} opts.certificate - Mongoose certificate doc
 * @param {WritableStream} opts.stream - output stream (res or file)
 */
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
          Subject: certificate.courseTitle,
          Keywords: `certificate, ${certificate.certificateId}, bootcamp`,
        },
      });

      doc.pipe(stream);
      doc.on("finish", resolve);
      doc.on("error", reject);

      const W = doc.page.width;   // 841.89
      const H = doc.page.height;  // 595.28

      // --- Background ---
      doc.rect(0, 0, W, H).fill("#0a0e27");

      // --- Outer gold border ---
      doc
        .lineWidth(4)
        .strokeColor("#ffb84a")
        .rect(20, 20, W - 40, H - 40)
        .stroke();

      // --- Inner thin border ---
      doc
        .lineWidth(1)
        .strokeColor("#4a9eff")
        .rect(32, 32, W - 64, H - 64)
        .stroke();

      // --- Corner ornaments ---
      const corners = [
        [50, 50],
        [W - 50, 50],
        [50, H - 50],
        [W - 50, H - 50],
      ];
      corners.forEach(([x, y]) => {
        doc.circle(x, y, 4).fill("#ffb84a");
      });

      // --- Header branding ---
      doc
        .fillColor("#ffb84a")
        .font("Helvetica-Bold")
        .fontSize(11)
        .text("THE KELVIN IKPENI DEV BOOTCAMP", 0, 80, {
          align: "center",
          characterSpacing: 3,
        });

      doc
        .moveTo(W / 2 - 120, 100)
        .lineTo(W / 2 + 120, 100)
        .lineWidth(1)
        .strokeColor("#ffb84a")
        .stroke();

      // --- Title ---
      doc
        .fillColor("#ffffff")
        .font("Helvetica-Bold")
        .fontSize(36)
        .text("Certificate of Completion", 0, 130, {
          align: "center",
        });

      // --- "This certifies that" ---
      doc
        .fillColor("#9aa4bf")
        .font("Helvetica")
        .fontSize(13)
        .text("This certifies that", 0, 195, { align: "center" });

      // --- Student name ---
      doc
        .fillColor("#ffffff")
        .font("Helvetica-Bold")
        .fontSize(32)
        .text(certificate.studentName, 0, 220, { align: "center" });

      // --- Underline for name ---
      const nameWidth = Math.min(doc.widthOfString(certificate.studentName) + 40, 500);
      doc
        .moveTo(W / 2 - nameWidth / 2, 262)
        .lineTo(W / 2 + nameWidth / 2, 262)
        .lineWidth(1.5)
        .strokeColor("#4a9eff")
        .stroke();

      // --- "has successfully completed" ---
      doc
        .fillColor("#9aa4bf")
        .font("Helvetica")
        .fontSize(13)
        .text("has successfully completed", 0, 285, { align: "center" });

      // --- Course title ---
      doc
        .fillColor("#4a9eff")
        .font("Helvetica-Bold")
        .fontSize(24)
        .text(certificate.courseTitle, 0, 310, { align: "center" });

      // --- Issue date ---
      const issueDate = new Date(certificate.issuedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      doc
        .fillColor("#9aa4bf")
        .font("Helvetica")
        .fontSize(11)
        .text(`Issued on ${issueDate}`, 0, 355, { align: "center" });

      // --- Certificate ID ---
      doc
        .fillColor("#ffb84a")
        .font("Courier-Bold")
        .fontSize(12)
        .text(`ID: ${certificate.certificateId}`, 0, 378, { align: "center" });

      // --- Signature area (left) ---
      const sigY = 440;
      doc
        .moveTo(140, sigY)
        .lineTo(340, sigY)
        .lineWidth(1)
        .strokeColor("#9aa4bf")
        .stroke();
      doc
        .fillColor("#ffffff")
        .font("Helvetica-Bold")
        .fontSize(13)
        .text("Kelvin Ikpeni", 140, sigY + 8, { width: 200, align: "center" });
      doc
        .fillColor("#9aa4bf")
        .font("Helvetica")
        .fontSize(10)
        .text("Founder & Lead Instructor", 140, sigY + 26, {
          width: 200,
          align: "center",
        });

      // --- QR code + verification (right) ---
      const qrSize = 90;
      const qrX = W - 170;
      const qrY = sigY - 45;
      doc.image(qrBuffer, qrX, qrY, { width: qrSize, height: qrSize });

      doc
        .fillColor("#9aa4bf")
        .font("Helvetica")
        .fontSize(8)
        .text("Verify this certificate at:", qrX - 30, qrY + qrSize + 6, {
          width: qrSize + 60,
          align: "center",
        });

      doc
        .fillColor("#4a9eff")
        .font("Courier")
        .fontSize(7)
        .text(
          `${process.env.PUBLIC_BASE_URL || "http://localhost:3000"}/verify-certificate.html?id=${certificate.certificateId}`,
          qrX - 60,
          qrY + qrSize + 20,
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