import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "./cameraUtils";

export async function detectFaceLandmarks(videoRef, onResultsCallback) {
  const faceMesh = new FaceMesh({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  faceMesh.onResults(onResultsCallback);

  const camera = new Camera(videoRef.current, {
    onFrame: async () => {
      await faceMesh.send({ image: videoRef.current });
    },
    width: 640,
    height: 480,
  });

  camera.start();
}
