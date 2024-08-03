function initializeViewer(image, container, options = {}) {
  const panoramaImage = new PANOLENS.ImagePanorama(`${image}`);
  const imageContainer = document.querySelector(`.${container}`);

  const defaultOptions = {
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: true,
    pointerLock: false,
    backgroundColor: 0x000000,
    renderStats: false,
  };

  const viewerOptions = { ...defaultOptions, ...options };

  const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: viewerOptions.autoRotate,
    autoRotateSpeed: viewerOptions.autoRotateSpeed,
    controlBar: viewerOptions.controlBar,
    pointerLock: viewerOptions.pointerLock,
    backgroundColor: viewerOptions.backgroundColor,
    renderStats: viewerOptions.renderStats,
  });

  viewer.add(panoramaImage);
}
