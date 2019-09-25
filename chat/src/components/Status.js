import React, { Component } from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Platform,
  NetInfo
} from "react-native";
import { Constants } from "expo";

export default class Status extends Component {
  constructor() {
    super();
    this.state = {
      status: null
    };
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
  }

  async componentWillMount() {
    const connection = await NetInfo.getConnectionInfo();
    this.setState({ status: connection.type });
    this.currentStatus = NetInfo.addEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  componentWillUnmount() {
    this.currentStatus.remove();
  }

  handleConnectionChange(connection) {
    this.setState({ status: connection.type });
  }

  render() {
    const { status } = this.state;
    const isConnected = status !== "none";
    const backgroundColor = isConnected ? "white" : "red";
    const statusBar = (
      <View style={styles.container} pointerEvents="none">
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>Connection error...</Text>
          </View>
        )}
        <StatusBar
          barStyle={isConnected ? "dark-content" : "light-content"}
          backgroundColor={backgroundColor}
          animated={false}
        />
      </View>
    );
    if (isIOS) {
      return (
        <View style={[styles.statusBarContainer, { backgroundColor }]}>
          {statusBar}
        </View>
      );
    }
    return statusBar;
  }
}
const isIOS = Platform.OS === "ios";
const statusHeight = isIOS ? Constants.statusBarHeight : 0;
const styles = StyleSheet.create({
  statusBarContainer: {
    zIndex: 1,
    height: statusHeight
  },
  container: {
    alignItems: "center"
  },
  bubble: {
    position: "absolute",
    top: statusHeight + 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "red",
    borderRadius: 20
  },
  text: {
    color: "white"
  }
});
