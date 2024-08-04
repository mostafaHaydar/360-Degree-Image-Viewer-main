function initializeViewer(image, container) {
  const panoramaImage = new PANOLENS.ImagePanorama(`${image}`);
  const imageContainer = document.querySelector(`.${container}`);
  const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: false,
    pointerLock: false,
    backgroundColor: 0x000000,
    renderStats: false,
  });
  viewer.add(panoramaImage);
}

function initializeViewerFullView(image, container, markers = []) {
  const panoramaImage = new PANOLENS.ImagePanorama(`${image}`);
  const imageContainer = document.querySelector(`.${container}`);
  const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: false,
    pointerLock: false,
    backgroundColor: 0x000000,
    renderStats: false,
  });
  viewer.add(panoramaImage);
  addMarkers(viewer, panoramaImage, markers);
}

function addMarkers(viewer, panoramaImage, markers) {
  markers = [
    {
      id: 1,
      position: { x: -20, y: -5, z: -8 },
    },
    {
      id: 2,
      position: { x: -10, y: -5, z: -8 },
    },
    {
      id: 3,
      position: { x: 0, y: -5, z: -8 },
    },
  ];
  imageUrl = "./images/graphics/chevron.png";

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Create and add markers to the panorama
  markers.forEach((markerData) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(4, 4, 1);
      sprite.position.set(
        markerData.position.x,
        markerData.position.y,
        markerData.position.z
      );
      // Store the marker ID in the sprite userData for identification
      sprite.userData = { id: markerData.id };
      panoramaImage.add(sprite);
    });
  });

  // Setup click event handling
  viewer.renderer.domElement.addEventListener("click", (event) => {
    // Convert click position to normalized device coordinates
    const rect = viewer.renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update raycaster
    raycaster.ray.origin.copy(viewer.camera.position);
    raycaster.ray.direction
      .set(mouse.x, mouse.y, 1)
      .unproject(viewer.camera)
      .sub(raycaster.ray.origin)
      .normalize();

    // Check for intersections
    const intersects = raycaster.intersectObjects(panoramaImage.children, true);
    intersects.forEach((intersect) => {
      // Identify which marker was clicked using userData
      const markerId = intersect.object.userData.id;
      if (markerId === 1) {
        console.log("Hi, I'm marker 1");
      } else if (markerId === 2) {
        console.log("Hi, I'm marker 2");
      } else if (markerId === 3) {
        console.log("Hi, I'm marker 3");
      }
    });
  });
}
