import React, { Component } from "react";
import { FlatList, Dimensions, PixelRatio, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class Grid extends Component {
  constructor() {
    super();
    this.handleRenderItem = this.handleRenderItem.bind(this);
  }

  handleRenderItem(info) {
    const { index } = info;
    const { margin, numColumns, renderItem } = this.props;
    const { width } = Dimensions.get("window");
    const size = PixelRatio.roundToNearestPixel(
      (width - margin * (numColumns - 1)) / numColumns
    );
    const marginLeft = index % numColumns === 0 ? 0 : margin;
    const marginTop = index < numColumns ? 0 : margin;
    return renderItem({ ...info, marginLeft, marginTop, size });
  }

  render() {
    return <FlatList {...this.props} renderItem={this.handleRenderItem} />;
  }
}

Grid.propTypes = {
  renderItem: PropTypes.func.isRequired,
  margin: PropTypes.number,
  numColumns: PropTypes.number
};

Grid.defaultProps = {
  margin: StyleSheet.hairlineWidth,
  numColumns: 4
};
