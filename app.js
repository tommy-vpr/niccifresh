let prev = document.getElementById("prev");
let next = document.getElementById("next");
let image = document.querySelector(".images");
let items = document.querySelectorAll(".images .item");
let contents = document.querySelectorAll(".content .item");
const bg = document.querySelector(".bg");

let imgRotate = 0;
let rotate = 0;
let active = 0;
let countItem = items.length;
let rotateAdd = 360 / countItem;

function nextSlider() {
  active = (active + 1) % countItem;
  rotate += rotateAdd;
  show();
}

function prevSlider() {
  active = (active - 1 + countItem) % countItem;
  rotate -= rotateAdd;
  show();
}

function resetImageRotation() {
  imgRotate = 0;
  items.forEach((item) => {
    const img = item.querySelector("img");
    img.style.setProperty("transform", `rotate(${imgRotate}deg)`);
  });
}

function show(initialized = false) {
  // Rotate the main container
  image.style.setProperty("--rotate", `${rotate}deg`);

  // Rotate each img element by 360 degrees if not initialized
  items.forEach((item) => {
    const img = item.querySelector("img");
    if (!initialized) {
      imgRotate += 360;
    }
    img.style.setProperty("transform", `rotate(${imgRotate}deg)`);
  });

  // Toggle active class for content elements
  contents.forEach((content, key) => {
    content.classList.toggle("active", key === active);

    // Reset all .item-title colors
    const itemTitle = content.querySelector(".item-title");
    if (itemTitle) {
      itemTitle.style.color = ""; // Reset color
    }
  });

  // Change background and item title color only for active index
  const activeContent = contents[active];
  const activeTitle = activeContent.querySelector(".item-title");

  if (activeTitle) {
    switch (active) {
      case 1:
        activeTitle.style.color = "#138145";
        bg.style.background =
          "radial-gradient(circle farthest-side at center bottom, #fff 25%, #a7d1bb 50%, #138145)";
        break;
      case 2:
        activeTitle.style.color = "#7757A4";
        bg.style.background =
          "radial-gradient(circle farthest-side at center bottom, #fff 25%, #a08ec0 50%, #7757A4)";
        break;
      case 3:
        activeTitle.style.color = "#EF495F";
        bg.style.background =
          "radial-gradient(circle farthest-side at center bottom, #fff 25%, #f49ea5 50%, #EF495F)";
        break;
      case 4:
        activeTitle.style.color = "#009047";
        bg.style.background =
          "radial-gradient(circle farthest-side at center bottom, #fff 25%, #8bcf93 50%, #009047)";
        break;
      default:
        activeTitle.style.color = "#DE4522";
        bg.style.background =
          "radial-gradient(circle farthest-side at center bottom, #fff 25%, #f1a187 50%, #DE4522)";
    }
  } else {
    console.warn("Element with class 'item-title' not found for active item.");
  }

  // Update the filter for the background image
  const bgImage = document.querySelector(".bg img");
  if (bgImage) {
    const hueValue = active * 90;
    bgImage.style.setProperty("filter", `hue-rotate(${hueValue}deg)`);
  } else {
    console.warn("Background image not found in '.bg' container.");
  }
}

// Event listeners for navigation buttons
next.onclick = nextSlider;
prev.onclick = prevSlider;

// Initialize
resetImageRotation();
show(true);
