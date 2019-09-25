import React, { Component } from "react";
import PropTypes from "prop-types";
import { Constants } from "expo";
import { View, StyleSheet, Platform } from "react-native";

export default class MeasureLayout extends Component {
  constructor() {
    super();
    this.state = {
      layout: null
    };
    this.handleLayout = this.handleLayout.bind(this);
  }

  handleLayout(event) {
    const {
      nativeEvent: { layout }
    } = event;

    this.setState({
      layout: {
        ...layout,
        y:
          layout.y + (Platform.OS === "android" ? Constants.statusBarHeight : 0)
      }
    });
  }

  render() {
    const { layout } = this.state;
    const { children } = this.props;

    if (!layout) {
      return <View onLayout={this.handleLayout} style={styles.container} />;
    }
    return children(layout);
  }
}

MeasureLayout.propTypes = {
  children: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
