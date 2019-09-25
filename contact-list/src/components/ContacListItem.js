import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import colors from "../utils/colors";

export default function ContactListItem({ uri, name, phone, onPress }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.wrapper}
      underlayColor={colors.grey}
    >
      <View style={styles.container}>
        <View>
          <Avatar size={44} borderWidth={0} uri={uri} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{phone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

ContactListItem.propTypes = {
  uri: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 24,
    alignSelf: "stretch"
  },
  container: {
    flexDirection: "row",
    paddingRight: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey,
    paddingVertical: 16
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.black
  },
  subtitle: {
    color: colors.blue,
    fontSize: 15,
    marginTop: 4
  },
  contentContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "stretch"
  }
});
