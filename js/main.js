function initializeViewer(image, container, interactive = false) {
  const panoramaImage = new PANOLENS.ImagePanorama(
    `./images/panorama/${image}`
  );
  const imageContainer = document.querySelector(`.${container}`);

  // Create the viewer instance
  const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: false,
    pointerLock: false,
    backgroundColor: 0x000000,
    renderStats: false,
  });

  // Add the panorama image to the viewer
  viewer.add(panoramaImage);

  // Access the controls and update their properties
  viewer.controls.enable = interactive;
  viewer.controls.enablePan = interactive;
  viewer.controls.enableZoom = interactive;

  // Optionally disable pointer events on the container if needed
  if (!interactive) {
    imageContainer.style.pointerEvents = "none";
  } else {
    imageContainer.style.pointerEvents = "";
  }
}

function initializeViewerFullView(image, container, markers = [], homeID) {
  const panoramaImage = new PANOLENS.ImagePanorama(`/images/panorama/${image}`);
  const imageContainer = document.querySelector(`.${container}`);
  const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: true,
    pointerLock: false,
    backgroundColor: 0x000000,
    renderStats: false,
  });
  viewer.add(panoramaImage);
  addMarkers(viewer, panoramaImage, markers, homeID);
}

function addMarkers(viewer, panoramaImage, markers, homeID) {
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
      sprite.position.set(markerData.x, markerData.y, markerData.z);
      sprite.userData = { id: markerData.leading_to_room_id };
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

    const intersects = raycaster.intersectObjects(panoramaImage.children, true);
    intersects.forEach((intersect) => {
      const markerId = intersect.object.userData.id;
      if (`/description.html?homeID=${homeID}&roomID=${markerId}`) {
        window.location.href = `/description.html?homeID=${homeID}&roomID=${markerId}`;
      }
    });
  });
}
