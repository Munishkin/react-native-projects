import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PropTypes from "prop-types";

export default function CommentList({ comments }) {
  return (
    <ScrollView>
      {comments.map((comment, key) => (
        <View key={key} style={styles.comment}>
          <Text>{comment}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  comment: {
    marginLeft: 20,
    paddingVertical: 20,
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)"
  }
});

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired
};
