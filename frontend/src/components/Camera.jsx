import { useRef, useState, useEffect } from "react";
import { detectFaceLandmarks } from "../utils/faceLandmarkDetector";
import { GlassesOverlay } from "./GlassesOverlay";

export function Camera({ glassesType }) {
  const videoRef = useRef(null);
  const [landmarks, setLandmarks] = useState(null);

  useEffect(() => {
    let mediaStream = null;

    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error starting camera:", error);
      }
    };

    const stopCamera = () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };

    const onResults = (results) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        setLandmarks(results.multiFaceLandmarks[0]);
      } else {
        setLandmarks(null);
      }
    };

    startCamera();
    detectFaceLandmarks(videoRef, onResults);

    // Cleanup function to stop the camera
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <div className="relative">
        <video
          ref={videoRef}
          className="rounded-lg max-w-[640px]"
          autoPlay
          playsInline
          muted
        />
        <GlassesOverlay
          videoRef={videoRef}
          landmarks={landmarks}
          glassesType={glassesType}
        />
      </div>
    </div>
  );
}
