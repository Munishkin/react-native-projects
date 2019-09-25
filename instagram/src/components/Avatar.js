import React from "react";
import { View, Text, StyleSheet, ColorPropType } from "react-native";
import PropTypes from "prop-types";

export default function Avatar({ initials, color, size }) {
  const style = {
    height: size,
    width: size,
    backgroundColor: color,
    borderRadius: size / 2
  };
  return (
    <View style={[style, styles.container]}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  }
});

Avatar.propTypes = {
  initials: PropTypes.string.isRequired,
  color: ColorPropType.isRequired,
  size: PropTypes.number.isRequired
};
