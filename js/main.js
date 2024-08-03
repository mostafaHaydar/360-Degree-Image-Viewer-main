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

  // return { viewer, panoramaImage, imageContainer };
}

// function getLatLonFromCursor(event, viewer, panoramaImage, imageContainer) {
//   const rect = imageContainer.getBoundingClientRect();
//   const x = event.clientX - rect.left;
//   const y = event.clientY - rect.top;

//   const width = rect.width;
//   const height = rect.height;

//   // Convert screen coordinates to normalized device coordinates (NDC)
//   const ndcX = (x / width) * 2 - 1;
//   const ndcY = -(y / height) * 2 + 1;

//   // Convert NDC to 3D coordinates
//   const vector = new THREE.Vector3(ndcX, ndcY, 1).unproject(viewer.camera);

//   // Compute the ray from the camera to the 3D point
//   const ray = new THREE.Raycaster(
//     viewer.camera.position,
//     vector.sub(viewer.camera.position).normalize()
//   );
//   const intersects = ray.intersectObject(panoramaImage);

//   if (intersects.length > 0) {
//     const intersection = intersects[0].point;

//     // Calculate latitude and longitude from the 3D point on the sphere
//     const radius = panoramaImage.radius; // Assuming panoramaImage has a radius property
//     const lat = Math.asin(intersection.y / radius) * (180 / Math.PI);
//     const lon = Math.atan2(intersection.z, intersection.x) * (180 / Math.PI);

//     // console.log(`Latitude: ${lat}, Longitude: ${lon}`);
//     return { lat, lon };
//   }

//   console.log("No intersection found");
//   return null;
// }

// function calculatePanoramaRadius(imageUrl, callback) {
//   const image = new Image();

//   image.onload = function () {
//     const width = image.width;
//     const height = image.height;
//     const radius = height / 2;
//     callback(radius);
//   };
//   image.onerror = function () {
//     // console.error("Failed to load image.");
//     callback(null);
//   };
//   image.src = imageUrl;
// }

//  Latitude: [−90,+90][−90  ,+90  ]Longitude: [−180,+180][−180  ,+180  ]

// function addImageMarker(
//   viewer,
//   panoramaImage,
//   lat,
//   lon,
//   imageUrl,
//   radius,
//   markerSize = 100 // Size of the marker in world units
// ) {
//   const angle = lon * (Math.PI / 180);
//   const verticalAngle = lat * (Math.PI / 180);

//   const x = radius * Math.cos(verticalAngle) * Math.sin(angle);
//   const y = radius * Math.sin(verticalAngle);
//   const z = radius * Math.cos(verticalAngle) * Math.cos(angle);

//   // Create a texture from the image URL
//   const textureLoader = new THREE.TextureLoader();
//   textureLoader.load(imageUrl, (texture) => {
//     // Create a material with the loaded texture
//     const material = new THREE.MeshBasicMaterial({
//       map: texture,
//       transparent: true,
//     });

//     // Create a plane geometry and mesh with the material
//     const geometry = new THREE.PlaneGeometry(markerSize, markerSize);
//     const marker = new THREE.Mesh(geometry, material);

//     marker.position.set(x, y, z);
//     panoramaImage.add(marker);

//     // Add event listener to handle click events
//     viewer.addEventListener("click", (event) => {
//       const rect = viewer.renderer.domElement.getBoundingClientRect();
//       const mouse = new THREE.Vector2(
//         (event.clientX / rect.width) * 2 - 1,
//         -(event.clientY / rect.height) * 2 + 1
//       );

//       const raycaster = new THREE.Raycaster();
//       raycaster.setFromCamera(mouse, viewer.camera);

//       const intersects = raycaster.intersectObject(marker);

//       if (intersects.length > 0) {
//         // Perform the action (e.g., redirect to a URL)
//         window.location.href = "https://example.com"; // Replace with your URL
//       }
//     });

//     console.log(
//       `Marker added at position: (${x}, ${y}, ${z}) with size: ${markerSize}`
//     );
//   });
// }

// const imageUrl = "/images/image1.jpeg";
// calculatePanoramaRadius(imageUrl, function (radius) {
//   if (radius !== null) {
//     addImageMarker(
//       viewer,
//       panoramaImage,
//       -10,
//       -110,
//       "/images/red_circle.png",
//       radius
//     );
//   } else {
//     console.log("Could not calculate the radius.");
//   }
// });
