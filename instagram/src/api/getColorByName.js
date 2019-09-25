export const getColorByName = (name) => {
  const hexColor = name.split('')
  .reduce((acc, char) => (acc * char.charCodeAt(0)) % 1000000, 1)
  .toString(16);
  return '#' + '0'.repeat(6 - hexColor.length) + hexColor;
}
