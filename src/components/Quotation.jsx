import React from 'react';
import html2pdf from 'html2pdf.js';

const Quotation = ({ quotation }) => {
  // const printRef = useRef();

  const handlePrint = () => {
    // Show title if needed (though we made it visible in previous steps)
    const titleElement = document.querySelector(".pdf-title");
    if (titleElement) titleElement.classList.remove("hidden");
    
    // Set the date
    const dateInput = document.querySelector('.date');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }

    // Remove old break divs
    document.querySelectorAll(".pdf-page-break").forEach(el => el.remove());

    // Inject page-break style
    const styleId = 'pdf-gen-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            .pdf-page-break {
                display: block;
                page-break-before: always;
                break-before: page;
                height: 0;
                margin: 0;
                padding: 0;
            }
            @media print {
                .pdf-page-break {
                    display: block;
                    page-break-before: always;
                }
            }
            tr { page-break-inside: avoid; page-break-after: auto; }
            td, th { page-break-inside: avoid; }
            .pdf-footer-section { page-break-inside: avoid; page-break-before: auto; }
        `;
        document.head.appendChild(style);
    }

    // Insert page-break div just before the footer container
    const footerSection = document.querySelector(".pdf-footer-section");
    if (footerSection && !footerSection.previousElementSibling?.classList?.contains("pdf-page-break")) {
        const breakDiv = document.createElement("div");
        breakDiv.className = "pdf-page-break";
        // Only insert if necessary - for now let's avoid forcing it unless we want a tailored break
        // footerSection.parentNode.insertBefore(breakDiv, footerSection);
    }

    // Apply table styling
    applyTHStyles();

    // Wait for layout to settle, then export PDF
    setTimeout(() => {
        const element = document.getElementById("pdf-target");
        const originalClass = element.className;
        
        // Remove UI specific styles for print
        element.classList.remove("shadow-md", "rounded-md");
        element.classList.add("w-full");

        const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

        html2pdf().set({
            margin: [10, 10, 10, 10],
            filename: `quotation_${today}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            pagebreak: { mode: ['css', 'legacy'] },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff",
                scrollY: 0
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        }).from(element).save().then(() => {
             // Restore
             element.className = originalClass;
             const styleEl = document.getElementById(styleId);
             if (styleEl) styleEl.remove();
             // Remove added breaks
             document.querySelectorAll(".pdf-page-break").forEach(el => el.remove());
        });
    }, 100);
  };

  const applyTHStyles = () => {
    document.querySelectorAll(".cd").forEach(cd => cd.classList.remove("border"));

    const target = document.getElementById("pdf-target");
    if (!target) return;

    target.querySelectorAll("th").forEach(th => {
        th.style.backgroundColor = "#f3f4f6";
        th.style.color = "#374151";
        // User requested more padding
        th.style.padding = "8px"; 
        th.style.border = "1px solid #e5e7eb";
        th.style.textAlign = "left";
    });

    target.querySelectorAll("td").forEach(td => {
        if (!td.classList.contains("gt")) {
            td.style.padding = "8px"; // User requested more padding
            td.style.border = "1px solid #e5e7eb";
        }
    });

    target.querySelectorAll("table").forEach(table => {
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";
    });
  };

  return (
    <div className="flex flex-col m-4 lg:m-0 bg-white">
      <div id="pdf-target" className="max-w-[210mm] mx-auto p-4 lg:p-8 bg-white text-black text-sm font-sans shadow-md rounded-md print:shadow-none print:w-full">
        
        {/* Unified Title */}
        <h1 className="text-xl font-bold mb-4 text-center uppercase tracking-widest">QUOTATION</h1>

        <div className="grid grid-cols-2 gap-6 mb-4 text-xs">
            <div>
                <h2 className="font-semibold">From:</h2>
                <p>CINEMA FOCUS (INDIA) PRIVATE LIMITED</p>
                <p>No.71, Dr. Radhakrishnan Salai,</p>
                <p>Mylapore,</p>
                <p>Chennai - 600 004</p>
                <p>GSTIN/UIN : 33AAECC3036B1ZF</p>
                <p>State Name : Tamil Nadu, Code : 33</p>
            </div>
            <div>
                <h2 className="font-semibold mb-2">To:</h2>
                <div className="space-y-1">
                    <p className="font-medium"><strong>Name :</strong> {quotation.customerName || '-'}</p>
                    <p><strong>E-Mail :</strong> {quotation.customerEmail || '-'}</p>
                    <p><strong>Phone :</strong> {quotation.customerPhone || '-'}</p>
                    <p><strong>Date :</strong> {quotation.quotationDate || '-'}</p>
                </div>
            </div>
        </div>

        {/* Details Table */}
        <table className="w-full table-auto border border-collapse mb-4 text-left text-xs">
            <tbody>
                <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100 w-1/2">Signature Screen</th>
                    <td className="p-2">{quotation.series}</td>
                </tr>
                <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100">Screen W x H</th>
                    <td className="p-2">{quotation.whpanels}</td>
                </tr>
                <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100">Panel Count</th>
                    <td className="p-2">{quotation.totalPanels} {quotation.extraPanels > 0 && `(+${quotation.extraPanels} Spares)`}</td>
                </tr>
                {quotation.extraPanels > 0 && (
                    <tr className="border border-gray-300">
                        <th className="p-2 bg-gray-100">Total Panels (with Spares)</th>
                        <td className="p-2">{quotation.grandTotalPanels}</td>
                    </tr>
                )}
                <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100">Diagonal</th>
                    <td className="p-2">{quotation.diagonal} inches</td>
                </tr>
                <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100">Area (sq.ft)</th>
                    <td className="p-2">{quotation.areaft} ft²</td>
                </tr>
                
                <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100">W/H (mm) (With Wood Work)</th>
                    <td className="p-2">{quotation.wwMmStr} mm</td>
                </tr>
                 <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100">W/H (in) (With Wood Work)</th>
                    <td className="p-2">{quotation.wwInStr} in</td>
                </tr>
                 <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100">W/H (mm) (Without Wood Work)</th>
                    <td className="p-2">{quotation.hwMmStr} mm</td>
                </tr>
                 <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100">W/H (in) (Without Wood Work)</th>
                    <td className="p-2">{quotation.hwInStr} in</td>
                </tr>

                <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100">Resolution</th>
                    <td className="p-2">{quotation.resolution}</td>
                </tr>
                <tr className="border border-gray-300">
                    <th className="p-2 bg-gray-100">Total Pixels</th>
                    <td className="p-2">{quotation.pixels}</td>
                </tr>
            </tbody>
        </table>

        {/* Pricing Table */}
        <table className="w-full table-auto border border-collapse text-left mb-4 text-xs">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 border border-gray-300">Item</th>
                    <th className="p-2 border border-gray-300">Details</th>
                    <th className="p-2 border border-gray-300">Amount (excl GST)</th>
                    <th className="p-2 border border-gray-300">Amount (incl GST)</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border border-gray-300">
                    <td className="p-2 border border-gray-300">Signature Screen</td>
                    <td className="p-2 border border-gray-300"></td>
                     <td className="p-2 border border-gray-300">{quotation.panelprice}</td>
                    <td className="p-2 border border-gray-300">{quotation.extraPanels > 0 ? '' : quotation.panelGST}</td>
                </tr>
                 {quotation.extraPanels > 0 && (
                    <tr className="border border-gray-300">
                        <td className="p-2 border border-gray-300">Additional Panels (Spares)</td>
                        <td className="p-2 border border-gray-300">{quotation.extraPanels} Nos</td>
                        <td className="p-2 border border-gray-300">{quotation.extraPanelsCost}</td>
                        <td className="p-2 border border-gray-300"></td>
                    </tr>
                )}
                {quotation.hasProcessor && (
                    <tr className="border border-gray-300">
                        <td className="p-2 border border-gray-300">Processor</td>
                        <td className="p-2 border border-gray-300">{quotation.processor}</td>
                        <td className="p-2 border border-gray-300">{quotation.processorCost}</td>
                        <td className="p-2 border border-gray-300">{quotation.processorGST}</td>
                    </tr>
                )}
                 {quotation.hasInstall && (
                    <tr className="border border-gray-300">
                        <td className="p-2 border border-gray-300">Installation</td>
                        <td className="p-2 border border-gray-300"></td>
                        <td className="p-2 border border-gray-300">{quotation.installCost}</td>
                        <td className="p-2 border border-gray-300">{quotation.installGST}</td>
                    </tr>
                )}
                

                
                <tr className="border border-gray-300 font-bold">
                    <td className="p-2 border border-gray-300">Grand Total</td>
                    <td className="p-2 border border-gray-300"></td>
                    <td className="p-2 border border-gray-300">{quotation.totalCost}</td>
                    <td className="p-2 border border-gray-300"></td>
                </tr>
                <tr className="border border-gray-300 font-bold">
                     <td className="p-2 border border-gray-300" colSpan="3">Grand Total incl GST</td>
                     <td className="p-2 border border-gray-300 text-base">{quotation.totalGST}</td>
                </tr>
            </tbody>
        </table>


        <div className="mt-2 pdf-footer-section break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <h1 className="text-base font-bold text-gray-800 mb-2">Terms & Conditions</h1>
            <div className="text-xs text-gray-600 space-y-2">
                <div>
                    <strong>Delivery Details:</strong><br/>
                    • Delivery within 30 to 45 days from the date of order confirmation.
                </div>
                <div>
                    <strong>Payment Terms:</strong><br/>
                    • 60% Advance Payment – upon order confirmation.<br/>
                    • 20% on Material Handover – after delivery of all materials.<br/>
                    • 20% on Completion – after full installation and final handover.
                </div>
                <div>
                    <strong>Warranty Details:</strong><br/>
                    • 1 Year Signature Warranty.<br/>
                    • Additional 2 Years of Free Service Warranty (Total: 3 Years).<br/>
                    • <em>Optional:</em> 4 Years Full Warranty available at 5% of the total cost ({quotation.optionalWarrantyCost}).
                </div>
                <div>
                     <strong>Note:</strong><br/>
                     • Woodwork(18mm Plywood), and Power supply should be provided by the customer.
                </div>
            </div>
        </div>

      </div>

      <div className="flex flex-col m-4 bg-white p-3 gap-2 rounded-2xl shadow-2xl mb-20 dark:bg-gray-700 dark:text-white print:hidden">
         <button 
            onClick={handlePrint}
            className="bg-blue-200 p-3 rounded-xl shadow border border-black flex justify-center items-center font-medium dark:bg-gray-600 dark:text-white dark:border-white hover:bg-blue-300 transition-colors"
         >
            Download PDF
         </button>
      </div>

    </div>
  );
};

export default Quotation;
