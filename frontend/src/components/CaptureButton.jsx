import { Camera } from 'lucide-react';

export function CaptureButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
    >
      <Camera size={20} />
      Take Photo
    </button>
  );
}