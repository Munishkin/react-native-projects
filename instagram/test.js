function getAvatarColor(name) {
  const hexCode = name
    .split('')
    .reduce((acc, char) => {
      console.log(acc, char);
     return (acc * char.charCodeAt(0)) % 0xffffff
    }, 1)
    .toString(16);
    console.log(hexCode);
  return `#${'0'.repeat(6 - hexCode.length) + hexCode}`;
}
const getColorByName = (name) => {
  const hexColor = name.split('')
  .reduce((acc, char) => {
    console.log(acc, char);
    return (acc * char.charCodeAt(0)) % 1000000}, 1)
  .toString(16);
  console.log(hexColor);
  return '#' + '0'.repeat(6 - hexColor.length) + hexColor;
}

const getInitials = (name) => {
  const match = name.match(/(\w)?\w*\s*(\w)?/);
  console.log(match.slice(1));
  return match ? match.slice(1).join('') : '';
}

getInitials('Munira Begmuratova');