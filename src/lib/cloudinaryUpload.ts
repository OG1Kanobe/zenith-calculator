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
  
      // Ensure base64 has proper data URI prefix
      const base64WithPrefix = pdfBase64.startsWith('data:') 
        ? pdfBase64 
        : `data:application/pdf;base64,${pdfBase64}`;
  
      // Ensure fileName has .pdf extension
      const fileNameWithExt = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
  
      // Create form data
      const formData = new FormData();
      formData.append('file', base64WithPrefix);
      formData.append('upload_preset', uploadPreset);
      formData.append('public_id', fileNameWithExt.replace('.pdf', '')); // Without extension
      formData.append('filename_override', fileNameWithExt); // With .pdf extension
  
      // Use 'raw' endpoint for PDFs
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Cloudinary error:', data);
        throw new Error(`Cloudinary upload failed: ${data.error?.message || 'Unknown error'}`);
      }
      
      console.log('PDF uploaded to Cloudinary:', data.secure_url);
      return data.secure_url;
  
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return null;
    }
  }