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

  const { style: liStyle } = largeImage;

  liStyle.cssText = `
  top: calc(${y}px - 6.5px);
  left: calc(${x}px - 6.5px);
  opacity:1;
  `;

  largeImageContainer.style.cssText = `
   visibility:visible;
   background-color:rgba(0,0,0,.7);
  `;

  largeImage.appendChild(image);

  setTimeout(() => {
    largeImage.classList.add("image-shown");
  }, 200);
};

const resizeBase64Img = (base64, width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  const processPromise = new Promise((resolve, reject) => {
    const loadImage = async () => {
      const img = document.createElement("img");
      img.src = `data:image/gif;base64,${base64.slice(22)}`;

      return img;
    };

    loadImage()
      .then((res) => {
        context.scale(width / res.width, height / res.height);
        context.drawImage(res, 0, 0);
        resolve(canvas.toDataURL());
      })
      .catch((err) => {
        reject(err);
        console.error(err);
      });
  });
  return processPromise;
};

export { convertToBase64, showLargeImage, resizeBase64Img };
