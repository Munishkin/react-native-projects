import React from "react";
import { SafeAreaView, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";
import NavigationBar from "../components/NavigationBar";

export default function Comments({ style, comments, onSubmit, onClose }) {
  return (
    <SafeAreaView style={style}>
      <NavigationBar
        leftText="Close"
        leftTextPress={onClose}
        title="Comments"
      />
      <CommentInput onSubmit={onSubmit} />
      <CommentList comments={comments} />
    </SafeAreaView>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  style: ViewPropTypes.style
};

Comments.defaultProps = {
  style: null
};
