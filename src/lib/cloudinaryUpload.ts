// src/lib/cloudinaryUpload.ts

export async function uploadPDFToCloudinary(
    pdfBase64: string,
    fileName: string
  ): Promise<string | null> {
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  
      if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration missing');
      }
  
      // Convert base64 to blob
      const blob = base64ToBlob(pdfBase64, 'application/pdf');
      
      // Create form data
      const formData = new FormData();
      formData.append('file', blob, fileName);
      formData.append('upload_preset', uploadPreset);
      formData.append('resource_type', 'raw'); // Important for PDFs
      formData.append('folder', 'zenith-calculator-reports');
  
      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error('Cloudinary upload failed');
      }
  
      const data = await response.json();
      
      console.log('PDF uploaded to Cloudinary:', data.secure_url);
      return data.secure_url; // Return the URL
  
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return null;
    }
  }
  
  // Helper: Convert base64 to Blob
  function base64ToBlob(base64: string, mimeType: string): Blob {
    // Remove data URI prefix if present
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
    
    // Decode base64
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }