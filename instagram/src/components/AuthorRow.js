import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import { getColorByName } from "../api/getColorByName";
import { getInitials } from "../api/getInitials";

export default function AuthorRow({ fullname, comments, onPressComment }) {
  return (
    <View style={styles.container}>
      <Avatar
        initials={getInitials(fullname)}
        color={getColorByName(fullname)}
        size={35}
      />
      <View style={styles.fullname}>
        <Text>{fullname}</Text>
      </View>
      <TouchableOpacity onPress={onPressComment}>
        <Text>{`${comments} Comments`}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  fullname: {
    flex: 1,
    paddingHorizontal: 10
  }
});

AuthorRow.propTypes = {
  fullname: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  onPressComment: PropTypes.func.isRequired
};
