export class Camera {
  constructor(videoElement, options) {
    this.video = videoElement;
    this.onFrame = options.onFrame;
    this.width = options.width || 640;
    this.height = options.height || 480;
  }

  async start() {
    // Request access to the user's camera
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: this.width, height: this.height },
    });

    // Set the video element source
    this.video.srcObject = stream;
    await this.video.play();

    // Process frames
    this.processFrame();
  }

  async processFrame() {
    if (this.onFrame) {
      await this.onFrame();
    }
    requestAnimationFrame(() => this.processFrame());
  }
}
