import Webcam from 'react-webcam';

export function WebcamView({ webcamRef }) {
  return (
    <div className="relative">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg"
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: "user"
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   border-4 border-blue-500 rounded-full w-64 h-80 pointer-events-none
                   border-dashed opacity-50"
      />
    </div>
  );
}