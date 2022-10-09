const convertToBase64 = (file = "") =>
  new Promise((resolve, reject) => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    }
  });

const showLargeImage = ({ x, y, src }) => {
  const largeImageContainer = document.getElementById("large-image-container"),
    largeImage = document.getElementById("large-image"),
    image = document.createElement("img");

  image.src = src;
  image.alt = "Large image";

  console.dir(image);

  const imagePosTranform = `calc(${x}px - 5.25%) , calc(${y}px - 5.25%)`;

  const { style: liStyle } = largeImage;

  liStyle.cssText = `
  transform:translate(${imagePosTranform});
  opacity:1;
  `;

  largeImageContainer.style.cssText = `
   visibility:visible;
   background-color:rgba(0,0,0,.7);
  `;

  largeImage.appendChild(image);

  setTimeout(() => {
    image.style.cssText = "opacity: 1";
    largeImage.classList.add("image-shown");

    liStyle.width = image.clientWidth + "px";
    liStyle.height = image.clientHeight + "px";
  }, 200);
};

export { convertToBase64, showLargeImage };
