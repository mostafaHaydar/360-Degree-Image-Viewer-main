function addLike(element) {
    // Check if the image has been liked before
    const isLiked = element.getAttribute('data-liked') === 'true';
  
    if (isLiked) {
      // If liked, change the image to the unliked version and update the state
      element.src = './images/graphics/heart.svg'; // Path to the unliked image
      element.setAttribute('data-liked', 'false');
    } else {
      // If not liked, change the image to the liked version and update the state
      element.src = './images/graphics/heart_check.svg'; // Path to the liked image
      element.setAttribute('data-liked', 'true');
    }
  
    // Optionally, you can also save the liked state to localStorage
    // localStorage.setItem('likedImage', element.src);
  }