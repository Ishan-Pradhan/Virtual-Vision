import { Camera, CameraOff } from 'lucide-react';

export function CameraButton({ isWebcamOn, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      {isWebcamOn ? (
        <>
          <CameraOff size={20} />
          Close Camera
        </>
      ) : (
        <>
          <Camera size={20} />
          Open Camera
        </>
      )}
    </button>
  );
}