exports.handler = async (event) => {

  const IMAGE_TYPES = ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'gif', 'avif', 'apng', 'png', 'tif', 'tiff', 'bmp', 'svg', 'webp', 'ico', 'cur'];
  const fileName = event.s3.object.key;
  const typeIndex = fileName.lastIndexOf('.') + 1;
  const fileType = typeIndex > 0 ? fileName.substring(typeIndex).toLowerCase() : null;

  return IMAGE_TYPES.indexOf(fileType) > -1;
};
