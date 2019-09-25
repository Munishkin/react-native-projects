import React from "react";
import { Image, ColorPropType, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

export default function Avatar({
  size,
  borderColor,
  borderWidth,
  uri,
  onPress
}) {
  const ViewContainer = onPress ? TouchableOpacity : View;
  return (
    <ViewContainer onPress={onPress}>
      <Image
        style={{
          width: size,
          height: size,
          borderColor,
          borderWidth,
          borderRadius: size / 2
        }}
        source={{ uri }}
      />
    </ViewContainer>
  );
}

Avatar.propTypes = {
  size: PropTypes.number,
  borderColor: ColorPropType,
  borderWidth: PropTypes.number,
  uri: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

Avatar.defaultProps = {
  size: 90,
  borderColor: "white",
  borderWidth: 2,
  onPress: null
};
