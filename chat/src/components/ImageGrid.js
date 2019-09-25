import React, { Component } from "react";
import { Image, CameraRoll, TouchableOpacity, StyleSheet } from "react-native";
import { Permissions } from "expo";
import PropTypes from "prop-types";
import Grid from "./Grid";

const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends Component {
  isLoading = false;

  cursor = null;

  constructor() {
    super();
    this.state = {
      images: []
    };
    this.handleRenderItem = this.handleRenderItem.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.getNextPhotos = this.getNextPhotos.bind(this);
  }

  componentDidMount() {
    this.getPhotos();
  }

  getNextPhotos() {
    if (!this.cursor) return;
    this.getPhotos(this.cursor);
  }

  async getPhotos(after) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      console.log("Camera access denied");
      return;
    }
    const { images } = this.state;
    if (this.isLoading) return;
    this.isLoading = true;
    const results = await CameraRoll.getPhotos({ first: 20, after });
    const {
      edges,
      page_info: { has_next_page, end_cursor }
    } = results;
    const newImages = edges.map(item => ({ uri: item.node.image.uri }));
    this.setState(
      {
        images: images.concat(newImages)
      },
      () => {
        this.cursor = has_next_page ? end_cursor : null;
        this.isLoading = false;
      }
    );
  }

  handleRenderItem({ item: { uri }, marginLeft, marginTop, size }) {
    const { onImagePress } = this.props;
    const imageStyle = {
      width: size,
      height: size,
      marginLeft,
      marginTop
    };
    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        style={imageStyle}
        onPress={() => onImagePress(uri)}
      >
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  }

  render() {
    const { images } = this.state;
    return (
      <Grid
        data={images}
        renderItem={this.handleRenderItem}
        keyExtractor={keyExtractor}
        onEndReached={this.getNextPhotos}
      />
    );
  }
}

ImageGrid.propTypes = {
  onImagePress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  image: {
    flex: 1
  }
});
