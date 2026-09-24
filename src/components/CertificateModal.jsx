import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Award, ShieldCheck, Download } from 'lucide-react';

export default function CertificateModal() {
  const { activeModal, closeModal, modalData, currentUser, showToast } = useApp();

  const studentName = currentUser?.name || 'Alexander Wright';
  const certificateId = 'NX-2026-8942';
  const certificateRef = useRef(null);

  if (activeModal !== 'certificate') return null;

  const courseTitle = modalData?.title || 'Applied AI & Machine Learning Specialization';
  const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Real PDF / Print Handler using browser print window formatted strictly for the certificate
  const handlePrintOrDownload = () => {
    const certElement = certificateRef.current;
    if (!certElement) return;

    const printWindow = window.open('', '_blank', 'width=1000,height=700');
    if (!printWindow) {
      showToast('Popup blocked! Please allow popups to download/print the certificate.', 'warning');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Nexus Academy Certificate - ${studentName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@400;600;700;800&display=swap');
            @page {
              size: A4 landscape;
              margin: 10mm;
            }
            body {
              margin: 0;
              padding: 20px;
              font-family: 'Inter', sans-serif;
              background-color: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 90vh;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .cert-box {
              width: 900px;
              padding: 45px 55px;
              border: 8px double #4338ca;
              border-radius: 20px;
              text-align: center;
              box-sizing: border-box;
              background: #ffffff;
              position: relative;
            }
            .header-bar {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #e0e7ff;
              padding-bottom: 15px;
              margin-bottom: 25px;
            }
            .logo-text {
              font-size: 14px;
              font-weight: 800;
              color: #4338ca;
              letter-spacing: 2px;
            }
            .cert-id {
              font-size: 11px;
              color: #64748b;
              font-family: monospace;
            }
            .cert-title {
              font-family: 'Playfair Display', serif;
              font-size: 34px;
              font-weight: 700;
              color: #0f172a;
              letter-spacing: 1px;
              margin: 10px 0;
            }
            .certify-text {
              font-size: 13px;
              color: #64748b;
              font-style: italic;
              margin: 10px 0;
            }
            .student-name {
              font-size: 30px;
              font-weight: 800;
              color: #3730a3;
              margin: 15px 0;
              text-decoration: underline;
              text-decoration-color: #a5b4fc;
            }
            .fulfillment-text {
              font-size: 13px;
              color: #475569;
              max-width: 550px;
              margin: 0 auto 12px;
              line-height: 1.6;
            }
            .course-title {
              font-size: 20px;
              font-weight: 800;
              color: #0f172a;
              margin-bottom: 35px;
            }
            .footer-bar {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              border-top: 1px solid #e2e8f0;
              padding-top: 25px;
              margin-top: 25px;
            }
            .sig-block {
              text-align: left;
            }
            .sig-name {
              font-size: 14px;
              font-weight: 700;
              color: #1e293b;
              margin: 0;
            }
            .sig-title {
              font-size: 11px;
              color: #64748b;
              margin: 2px 0 0;
            }
            .badge-verified {
              display: flex;
              align-items: center;
              gap: 6px;
              color: #059669;
              font-weight: 700;
              font-size: 12px;
            }
            .date-block {
              text-align: right;
            }
          </style>
        </head>
        <body>
          <div class="cert-box">
            <div class="header-bar">
              <span class="logo-text">NEXUS ACADEMY OF TECHNOLOGY</span>
              <span class="cert-id">VERIFICATION ID: ${certificateId}</span>
            </div>

            <div class="cert-title">CERTIFICATE OF COMPLETION</div>
            <div class="certify-text">This is proudly awarded to</div>
            <div class="student-name">${studentName}</div>

            <div class="fulfillment-text">
              has successfully fulfilled all course requirements, capstone projects, and rigorous assessments for the accredited professional curriculum of
            </div>
            <div class="course-title">${courseTitle}</div>

            <div class="footer-bar">
              <div class="sig-block">
                <p class="sig-name">Dr. Sarah Jenkins</p>
                <p class="sig-title">Academic Director & Dean</p>
              </div>

              <div class="badge-verified">
                ✓ Digitally Verifiable Credential
              </div>

              <div class="date-block">
                <p class="sig-name">${issueDate}</p>
                <p class="sig-title">Date of Conferment</p>
              </div>
            </div>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    showToast(`Generating printable PDF for ${studentName}... Choose "Save as PDF" in print dialog!`, 'success');
  };

  return (
    <div className="modal-backdrop overflow-y-auto py-6">
      <div className="modal-card max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden m-auto flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h3 className="text-base font-extrabold text-white">
                Official Verified Certificate
              </h3>
              <p className="text-xs text-slate-300">Official Sample Certificate Preview</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Area */}
        <div className="p-6 sm:p-8 bg-slate-100 dark:bg-slate-950 flex justify-center overflow-x-auto">
          <div
            ref={certificateRef}
            className="w-full max-w-2xl bg-white text-slate-900 p-8 sm:p-10 rounded-2xl border-4 border-double border-indigo-600 shadow-xl relative text-center space-y-6 shrink-0"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center border-b border-indigo-100 pb-4">
              <span className="text-xs font-black tracking-widest text-indigo-700 uppercase">
                NEXUS ACADEMY OF TECHNOLOGY
              </span>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded">
                ID: {certificateId}
              </span>
            </div>

            {/* Core Certificate Body */}
            <div className="space-y-3">
              <Award className="w-14 h-14 text-amber-500 mx-auto drop-shadow-sm" />
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
                CERTIFICATE OF COMPLETION
              </h2>
              <p className="text-xs text-slate-500 italic">This is proudly awarded to</p>
              
              <div className="relative inline-block">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 underline decoration-indigo-300">
                  {studentName}
                </h3>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                has successfully fulfilled all course requirements, capstone projects, and rigorous assessments for
              </p>
              <h4 className="text-base sm:text-lg font-black text-slate-900 px-4 py-1.5 bg-indigo-50/50 rounded-xl inline-block border border-indigo-100">
                {courseTitle}
              </h4>
            </div>

            {/* Signatures & Issue Metadata */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap justify-between items-end text-xs text-slate-500 gap-4">
              <div className="text-left space-y-1">
                <p className="font-extrabold text-slate-800 text-sm">Dr. Sarah Jenkins</p>
                <p className="text-[11px] text-slate-500">Academic Director & Dean</p>
              </div>

              <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4" /> Digitally Verifiable
              </div>

              <div className="text-right space-y-1">
                <p className="font-extrabold text-slate-800 text-sm">{issueDate}</p>
                <p className="text-[11px] text-slate-500">Issue Date</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-slate-600 font-medium">
            Official accredited sample certificate preview. High-resolution export available.
          </span>
          <div className="flex gap-2.5 ml-auto">
            <button
              onClick={handlePrintOrDownload}
              className="btn-primary px-5 py-2 text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download / Save as PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
