import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function NavigationBar({ leftText, leftTextPress, title }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={leftTextPress} style={styles.leftText}>
        <Text>{leftText}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "center"
  },
  leftText: {
    position: "absolute",
    left: 20,
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold"
  }
});

NavigationBar.propTypes = {
  leftText: PropTypes.string.isRequired,
  leftTextPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};
