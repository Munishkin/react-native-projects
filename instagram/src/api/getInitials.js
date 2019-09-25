export const getInitials = (name) => {
  const match = name.match(/(\w)?\w*\s*(\w)?/);
  return match ? match.slice(1).join('') : '';
}