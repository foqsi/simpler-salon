'use client';

import { useState } from 'react';

interface ImageUploaderProps {
  label: string;
  onUpload: (file: File) => void;
}

export default function ImageUploader({ label, onUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div className="form-control w-full max-w-md">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="file"
        accept="image/*"
        className="file-input file-input-bordered w-full"
        onChange={handleFileChange}
      />
      {preview && (
        <img src={preview} alt="Preview" className="mt-4 rounded-lg w-full h-auto object-cover" />
      )}
    </div>
  );
}
