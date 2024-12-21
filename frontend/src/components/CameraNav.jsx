import { useRef, useState, useEffect } from "react";
import { detectFaceLandmarks } from "../utils/faceLandmarkDetector";
import { GlassOverlayNav } from "./GlassOverlayNav";

export function CameraNav({ glassesType }) {
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
      if (
        results &&
        results.multiFaceLandmarks &&
        results.multiFaceLandmarks.length > 0
      ) {
        console.log("Detected landmarks:", results.multiFaceLandmarks[0]);
        setLandmarks(results.multiFaceLandmarks[0]);
      } else {
        setLandmarks(null);
      }
    };

    startCamera();
    detectFaceLandmarks(videoRef, onResults);

    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="h-[500px] w-[500px] flex flex-col justify-center items-center gap-4">
      <div className="relative">
        <video
          ref={videoRef}
          className="rounded-lg max-w-[640px]"
          autoPlay
          playsInline
          muted
        />
        {landmarks && (
          <GlassOverlayNav
            videoRef={videoRef}
            landmarks={landmarks}
            glassesType={glassesType}
          />
        )}
      </div>
    </div>
  );
}
