const images = [
  "bgimg_1.jpg",
  "bgimg_2.jpg",
  "bgimg_3.png",
  "bgimg_4.jpg",
  "bgimg_5.jpg",
  "bgimg_6.png",
  "bgimg_7.jpg",
  "bgimg_8.jpg",
  "bgimg_9.jpg",
  "bgimg_10.webp",
  "bgimg_11.webp",
  "bgimg_12.avif",
  "bgimg_13.avif",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];
const image = document.createElement("img");
image.src = `img/${chosenImage}`;
image.id = "background";
image.alt = "background";
document.body.appendChild(image);
