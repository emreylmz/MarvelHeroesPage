export const prepareImagePath = (image) => {
  if (!image) return '';
  return `${image.path}/standard_xlarge.${image.extension}`;
};
