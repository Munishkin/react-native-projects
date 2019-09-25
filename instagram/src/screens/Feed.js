import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import CardList from "../components/CardList";
import { fetchImages } from "../api/api";

export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      loading: true,
      error: false
    };
  }

  async componentDidMount() {
    try {
      const items = await fetchImages();
      this.setState({ items, loading: false });
    } catch (e) {
      console.log(e);
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { items, loading, error } = this.state;
    const { onPressComment, comments } = this.props;
    if (loading) {
      return <ActivityIndicator />;
    }
    if (error) {
      return (
        <View>
          <Text>Error...</Text>
        </View>
      );
    }
    return (
      <CardList
        items={items}
        onPressComment={onPressComment}
        comments={comments}
      />
    );
  }
}

Feed.propTypes = {
  onPressComment: PropTypes.func.isRequired,
  comments: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};
