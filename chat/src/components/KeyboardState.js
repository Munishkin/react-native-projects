import React, { Component } from "react";
import { Keyboard, Platform } from "react-native";
import PropTypes from "prop-types";

const INITIAL_ANIMATION_DURATION = 250;

export default class KeyboardState extends Component {
  constructor(props) {
    super(props);
    const {
      layout: { height }
    } = this.props;
    this.state = {
      contentHeight: height,
      keyboardHeight: 0,
      keyboardWillShow: false,
      keyboardWillHide: false,
      keyboardVisible: false,
      animationDuration: INITIAL_ANIMATION_DURATION
    };
    this.handleKeyboardDidHide = this.handleKeyboardDidHide.bind(this);
    this.handleKeyboardDidShow = this.handleKeyboardDidShow.bind(this);
    this.handleKeyboardWillHide = this.handleKeyboardWillHide.bind(this);
    this.handleKeyboardWillShow = this.handleKeyboardWillShow.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === "ios") {
      this.subscriptions = [
        Keyboard.addListener("keyboardDidShow", this.handleKeyboardDidShow),
        Keyboard.addListener("keyboardDidHide", this.handleKeyboardDidHide),
        Keyboard.addListener("keyboardWillShow", this.handleKeyboardWillShow),
        Keyboard.addListener("keyboardWillHide", this.handleKeyboardWillHide)
      ];
    } else {
      this.subscriptions = [
        Keyboard.addListener("keyboardDidShow", this.handleKeyboardDidShow),
        Keyboard.addListener("keyboardDidHide", this.handleKeyboardDidHide)
      ];
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(listener => listener.remove());
  }

  measure(event) {
    const { layout } = this.props;
    const {
      endCoordinates: { height, screenY },
      duration = INITIAL_ANIMATION_DURATION
    } = event;
    this.setState({
      contentHeight: screenY - layout.y,
      keyboardHeight: height,
      animationDuration: duration
    });
  }

  handleKeyboardDidHide() {
    this.setState({ keyboardWillHide: false, keyboardVisible: false });
  }

  handleKeyboardDidShow(event) {
    this.setState({ keyboardWillShow: false, keyboardVisible: true });
    this.measure(event);
  }

  handleKeyboardWillHide(event) {
    this.setState({ keyboardWillHide: true });
    this.measure(event);
  }

  handleKeyboardWillShow(event) {
    this.setState({ keyboardWillShow: true });
    this.measure(event);
  }

  render() {
    const { layout, children } = this.props;
    const {
      contentHeight,
      keyboardHeight,
      keyboardWillHide,
      keyboardWillShow,
      keyboardVisible,
      animationDuration
    } = this.state;
    return children({
      containerHeight: layout.height,
      contentHeight,
      keyboardHeight,
      keyboardWillHide,
      keyboardWillShow,
      keyboardVisible,
      animationDuration
    });
  }
}

KeyboardState.propTypes = {
  layout: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired
  }).isRequired,
  children: PropTypes.func.isRequired
};
