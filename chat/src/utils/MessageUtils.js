import PropTypes from "prop-types";

export const MessageShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["text", "uri", "coordinates"]),
  text: PropTypes.string,
  uri: PropTypes.string,
  coordinates: PropTypes.shape({
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired
  })
});

let id = 0;

function getNextId() {
  id += 1;
  return id;
}

export const CreateMessage = text => ({
  id: getNextId(),
  type: "text",
  text
});

export const CreateImage = uri => ({
  id: getNextId(),
  type: "uri",
  uri
});

export const CreateLocation = coordinates => ({
  id: getNextId(),
  type: "coordinates",
  coordinates
});
