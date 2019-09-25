import React from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";
import Card from "./Card";
import { fetchImageById } from "../api/api";

export default function CardList({ items, onPressComment, comments }) {
  function renderItem({ item: { id, author } }) {
    return (
      <Card
        fullname={author}
        comments={comments[id] ? comments[id].length : 0}
        image={{ uri: fetchImageById(id) }}
        onPressComment={() => onPressComment(id)}
      />
    );
  }

  function keyExtractor({ id }) {
    return id.toString();
  }
  return (
    <FlatList
      data={items}
      extraData={comments}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}

CardList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired
    })
  ).isRequired,
  onPressComment: PropTypes.func.isRequired,
  comments: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};
