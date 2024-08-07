function addLike(element) {
  const isLiked = element.getAttribute("data-liked") === "true";
  if (isLiked) {
    element.src = "./images/graphics/heart.svg";
    element.setAttribute("data-liked", "false");
  } else {
    element.src = "./images/graphics/heart_check.svg";
    element.setAttribute("data-liked", "true");
  }
}

function ownerPhoneNumber(event) {
  event.lastElementChild.style.display = "block";
  event.setAttribute("onclick", "hiddeOwnerPhoneNumber(this)");
  event.style.animationName = "grow";
  event.style.width = "250px";
}

function hiddeOwnerPhoneNumber(event) {
  event.lastElementChild.style.display = "none";
  event.setAttribute("onclick", "ownerPhoneNumber(this)");
  event.style.animationName = "shrink";
  event.style.width = "50px";
}
