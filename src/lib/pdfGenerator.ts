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

    // Capture the element as canvas with LOWER quality to reduce file size
    const canvas = await html2canvas(element, {
      scale: 1.5, // REDUCED from 2 to 1.5 (lower quality = smaller file)
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 0,
      removeContainer: true,
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Convert canvas to image with JPEG compression (smaller than PNG)
    const imgData = canvas.toDataURL('image/jpeg', 0.75); // JPEG at 75% quality

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // Return base64 string (without data:application/pdf;base64, prefix)
    const pdfBase64 = pdf.output('dataurlstring').split(',')[1];
    
    const sizeInMB = (pdfBase64.length * 0.75) / (1024 * 1024); // Approximate size
    console.log(`PDF generated successfully! Size: ~${sizeInMB.toFixed(2)} MB`);
    
    return pdfBase64;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return null;
  }
}