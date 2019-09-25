import React, { Component } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class CommentInput extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(text) {
    this.setState({ text });
  }

  handleSubmit() {
    const { onSubmit } = this.props;
    const { text } = this.state;
    onSubmit(text);
    this.setState({ text: "" });
  }

  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          value={text}
          placeholder="Leave a comment..."
          onChangeText={this.handleChange}
          onSubmitEditing={this.handleSubmit}
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "silver"
  },
  input: {
    flex: 1
  }
});

CommentInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
