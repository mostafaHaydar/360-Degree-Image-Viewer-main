function viewer(image, container, options = {}) {
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

  function addImageMarker(lat, lon, imageUrl) {
    const radius = 100; // Adjust based on your panorama size
    const angle = lon * (Math.PI / 180); // Convert longitude to radians
    const verticalAngle = lat * (Math.PI / 180); // Convert latitude to radians

    // Calculate marker position in 3D space
    const x = radius * Math.cos(verticalAngle) * Math.sin(angle);
    const y = radius * Math.sin(verticalAngle);
    const z = radius * Math.cos(verticalAngle) * Math.cos(angle);

    console.log(`Adding marker at latitude: ${lat}, longitude: ${lon}`);
    console.log(`Calculated position: (${x}, ${y}, ${z})`);

    // Load the image texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      // Create a sprite material with the loaded texture
      const material = new THREE.SpriteMaterial({ map: texture });

      // Create the sprite (image marker)
      const marker = new THREE.Sprite(material);
      marker.scale.set(10, 10, 1); // Adjust these values to control the size of the marker

      marker.position.set(x, y, z);
      panoramaImage.add(marker);

      console.log(`Marker added at position: (${x}, ${y}, ${z})`);
    });
  }

  function getLatLonFromCursor(event) {
    const rect = imageContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Convert screen coordinates to normalized device coordinates
    const ndcX = (x / width) * 2 - 1;
    const ndcY = -(y / height) * 2 + 1;

    // Convert to 3D coordinates
    const vector = new THREE.Vector3(ndcX, ndcY, 1).unproject(viewer.camera);
    const ray = new THREE.Raycaster(
      viewer.camera.position,
      vector.sub(viewer.camera.position).normalize()
    );
    const intersects = ray.intersectObject(panoramaImage);

    if (intersects.length > 0) {
      const intersection = intersects[0];
      const normal = intersection.face.normal;
      const lat = Math.asin(normal.y) * (180 / Math.PI);
      const lon = Math.atan2(normal.z, normal.x) * (180 / Math.PI);

      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      return { lat, lon };
    }

    console.log("No intersection found");
    return null;
  }

  // Add event listener for mouse clicks to get latitude and longitude
  imageContainer.addEventListener("click", getLatLonFromCursor);

  // Example coordinates (latitude and longitude) and image URL
  addImageMarker(-93, -2, "/images/chevron.png");
}
