import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import UserDetail from "../components/UserDetail";
import colors from "../utils/colors";

export default class Options extends Component {
  static navigationOptions = ({ navigation: { goBack } }) => ({
    title: "Options",
    headerLeft: (
      <MaterialIcons
        name="close"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => goBack()}
      />
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <UserDetail title="Update Profile" />
        <UserDetail title="Change Language" />
        <UserDetail title="Sign Out" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
