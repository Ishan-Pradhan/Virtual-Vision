import { useCallback, useRef, useState, useEffect } from "react";
import { CameraButton } from "./CameraButton";
import { WebcamView } from "./WebcamView";
import { detectFaceLandmarks } from "../utils/faceLandmarkDetector";
import { GlassesOverlay } from "./GlassesOverlay";

export function Camera({ glassesType }) {
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const videoRef = useRef(null);
  const [landmarks, setLandmarks] = useState(null);

  useEffect(() => {
    if (isWebcamOn && videoRef.current) {
      const onResults = (results) => {
        if (
          results.multiFaceLandmarks &&
          results.multiFaceLandmarks.length > 0
        ) {
          setLandmarks(results.multiFaceLandmarks[0]); // Get the first face's landmarks
        }
      };

      detectFaceLandmarks(videoRef, onResults);
    }
  }, [isWebcamOn]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Webcam feed */}
      {isWebcamOn && (
        <div className="relative">
          <video
            ref={videoRef}
            className="rounded-lg max-w-[640px]"
            autoPlay
            playsInline
            muted
          />
          {/* Real-time Glasses Overlay */}
          <GlassesOverlay
            videoRef={videoRef}
            landmarks={landmarks}
            glassesType={glassesType}
          />
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-4">
        <CameraButton
          isWebcamOn={isWebcamOn}
          onClick={() => setIsWebcamOn(!isWebcamOn)}
        />
      </div>
    </div>
  );
}
