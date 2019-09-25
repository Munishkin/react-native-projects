import uuid from "uuid/v4";

export const fetchUsers = async () => {
  const result = await fetch(
    "https://randomuser.me/api/?results=20&seed=fullstackio"
  );
  const contacts = await result.json();
  return contacts.results.map(mapUserData);
};

export const fetchUser = async () => {
  const result = await fetch("https://randomuser.me/api/?seed=lera");
  const details = await result.json();
  return mapUserData(details.results[0]);
};

const mapUserData = ({ name, email, phone, cell, picture }) => ({
  id: uuid(),
  favourite: Math.random() >= 0.5,
  firstName: name.first,
  lastName: name.last,
  uri: picture.large,
  email,
  phone,
  cell
});
