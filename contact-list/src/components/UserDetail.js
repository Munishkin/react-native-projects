import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import colors from "../utils/colors";

function renderIcon(icon) {
  return <MaterialIcons name={icon} size={32} />;
}
export default function UserDetail({ title, subtitle, icon }) {
  return (
    <View style={styles.container}>
      {icon && renderIcon(icon)}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}

UserDetail.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.string
};

UserDetail.defaultProps = {
  icon: null,
  subtitle: null,
  optionalIcon: null
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 24,
    paddingRight: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey,
    paddingVertical: 16,
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black
  },
  subtitle: {
    color: colors.blue,
    fontSize: 15,
    marginTop: 4
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15
  }
});
