import React, { useState } from 'react';
import axios from 'axios';
import { showToast } from '../components/ui/Toast';

const CloudinaryUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Mycloudinary'); // 🔁 Replace
    formData.append('cloud_name', 'dmcuvthdy');       // 🔁 Replace

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dmcuvthdy/image/upload',
        formData
      );
      const imageUrl = res.data.secure_url;
      setPreviewUrl(imageUrl);
      onUploadSuccess(imageUrl);
      showToast('Image uploaded successfully!', 'success');
    } catch (err) {
      console.error('Upload failed:', err);
      showToast('Image upload failed!', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploading && <p>Uploading...</p>}
      {previewUrl && (
        <div style={{ marginTop: '10px' }}>
          <img src={previewUrl} alt="preview" style={{ width: '150px' }} />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;