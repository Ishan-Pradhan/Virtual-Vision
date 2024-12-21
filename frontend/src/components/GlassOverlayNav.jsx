import React, { useEffect, useRef, useState } from "react";

export function GlassOverlayNav({ videoRef, landmarks, glassesType }) {
  const [glassesPosition, setGlassesPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    rotation: 0,
  });

  const glassesImg = useRef(new Image());

  useEffect(() => {
    if (glassesType) {
      glassesImg.current.src = glassesType.productImg;
      console.log("Glasses Image URL:", glassesType.productImg);
    }
  }, [glassesType]);

  const calculateGlassesPositionAndRotation = () => {
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];

    const videoWidth = videoRef.current.videoWidth || 640;
    const videoHeight = videoRef.current.videoHeight || 480;

    const centerX = ((leftEye.x + rightEye.x) / 2) * videoWidth;
    const centerY = ((leftEye.y + rightEye.y) / 2) * videoHeight;
    const glassesWidth = Math.abs(rightEye.x - leftEye.x) * videoWidth * 1.5;

    const deltaX = (rightEye.x - leftEye.x) * videoWidth;
    const deltaY = (rightEye.y - leftEye.y) * videoHeight;
    const rotationAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    return {
      top: `${centerY}px`,
      left: `${centerX}px`,
      width: `${glassesWidth}px`,
      rotation: rotationAngle,
    };
  };

  const glassesPositions = calculateGlassesPositionAndRotation();

  if (!glassesPositions.width) {
    return null;
  }

  return (
    <img
      src={glassesImg.current.src}
      alt="Glasses"
      className="absolute opacity-80 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        top: glassesPositions.top,
        left: glassesPositions.left,
        width: glassesPositions.width,
        transform: `translate(-50%, -50%) rotate(${glassesPositions.rotation}deg)`,
      }}
    />
  );
}
