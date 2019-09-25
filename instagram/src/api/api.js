export const fetchImages = async () => {
  const response = await fetch("https://picsum.photos/list");
  const images = await response.json();
  return images;
};

export const fetchImageById = id =>
  `https://unsplash.it/${600}/${600}?image=${id}`;
