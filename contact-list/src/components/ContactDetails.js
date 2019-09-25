import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

export default function ContactDetails({ title, subtitle, icon }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        <MaterialIcons name={icon} size={22} color="white" />
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

ContactDetails.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30
  },
  subtitle: {
    color: "white",
    fontSize: 15,
    paddingLeft: 10
  },
  content: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
