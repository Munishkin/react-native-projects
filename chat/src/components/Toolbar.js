import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import PropTypes from "prop-types";

const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default class Toolbar extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isFocused } = this.props;
    if (nextProps.isFocused !== isFocused) {
      if (nextProps.isFocused) {
        this.input.focus();
      } else {
        this.input.blur();
      }
    }
  }

  setInputRef(ref) {
    this.input = ref;
  }

  handleBlur() {
    const { onChangeFocus } = this.props;
    onChangeFocus(false);
  }

  handleFocus() {
    const { onChangeFocus } = this.props;
    onChangeFocus(true);
  }

  handleSubmit() {
    const { text } = this.state;
    const { onSubmitText } = this.props;
    onSubmitText(text);
    this.setState({ text: "" });
  }

  handleTextChange(text) {
    this.setState({ text });
  }

  render() {
    const { onCameraPress, onLocationPress } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <ToolbarButton title="C" onPress={onCameraPress} />
        <ToolbarButton title="L" onPress={onLocationPress} />
        <View style={styles.inputTextContainer}>
          <TextInput
            style={styles.inputText}
            value={text}
            placeholder="Type here..."
            onChangeText={this.handleTextChange}
            onSubmitEditing={this.handleSubmit}
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            ref={this.setInputRef}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </View>
      </View>
    );
  }
}

Toolbar.propTypes = {
  onCameraPress: PropTypes.func,
  onLocationPress: PropTypes.func,
  onSubmitText: PropTypes.func,
  isFocused: PropTypes.bool,
  onChangeFocus: PropTypes.func
};

Toolbar.defaultProps = {
  onCameraPress: () => null,
  onLocationPress: () => null,
  onSubmitText: () => null,
  onChangeFocus: () => null,
  isFocused: false
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "#239f85",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    marginRight: 12
  },
  text: {
    fontSize: 18,
    color: "white"
  },
  inputText: {
    fontSize: 18,
    flex: 1
  },
  inputTextContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(0,0,0,0.05)"
  }
});
