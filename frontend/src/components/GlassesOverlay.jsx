import React, { useEffect } from "react";
import { useProductContext } from "../context/productcontext";
import { useParams } from "react-router-dom";

const API = "/api/v1/product";

export function GlassesOverlay({ videoRef, landmarks }) {
  const { id } = useParams();
  const { getSingleProduct, singleProduct } = useProductContext();

  useEffect(() => {
    if (id && !singleProduct?._id) {
      getSingleProduct(`${API}/${id}`);
    }
  }, [id, singleProduct, getSingleProduct]);

  if (!landmarks || !videoRef?.current || !singleProduct?.productImg)
    return null;

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

  const glassesPosition = calculateGlassesPositionAndRotation();

  return (
    <img
      src={singleProduct.productImg}
      alt={singleProduct.productName || "Glasses"}
      className="absolute opacity-80 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        top: glassesPosition.top,
        left: glassesPosition.left,
        width: glassesPosition.width,
        transform: `translate(-50%, -50%) rotate(${glassesPosition.rotation}deg)`,
      }}
    />
  );
}
