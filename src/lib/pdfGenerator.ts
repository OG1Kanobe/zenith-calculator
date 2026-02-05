// src/lib/pdfGenerator.ts

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generateResultsPDFBase64(elementId: string): Promise<string | null> {
  try {
    // Get the element to capture
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    console.log('Generating PDF...');

    // Capture the element as canvas with high quality
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#010112', // Match your dark background
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Convert canvas to image
    const imgData = canvas.toDataURL('image/png');

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Return base64 string (without data:application/pdf;base64, prefix)
    const pdfBase64 = pdf.output('dataurlstring').split(',')[1];
    
    console.log('PDF generated successfully!');
    return pdfBase64;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return null;
  }
}