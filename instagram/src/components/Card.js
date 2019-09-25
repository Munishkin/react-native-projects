import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import AuthorRow from "./AuthorRow";

export default class Card extends Component {
  shouldComponentUpdate(nextProps) {
    const { comments } = this.props;
    return comments !== nextProps.comments;
  }

  render() {
    const { fullname, comments, image, onPressComment } = this.props;
    return (
      <View>
        <AuthorRow
          fullname={fullname}
          comments={comments}
          onPressComment={onPressComment}
        />
        <Image source={image} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});

Card.propTypes = {
  fullname: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  onPressComment: PropTypes.func.isRequired,
  image: Image.propTypes.source.isRequired
};
