import React, { Component } from "react";
import {
  Platform,
  UIManager,
  LayoutAnimation,
  BackHandler,
  View
} from "react-native";
import PropTypes from "prop-types";
import { isIphoneX } from "react-native-iphone-x-helper";

export const INPUT_METHOD = {
  KEYBOARD: "KEYBOARD",
  CUSTOM: "CUSTOM",
  NONE: "NONE"
};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class MessagingContainer extends Component {
  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const { onChangeInputMethod, inputMethod } = this.props;
        if (inputMethod === INPUT_METHOD.CUSTOM) {
          onChangeInputMethod(INPUT_METHOD.NONE);
          return true;
        }
        return false;
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const { keyboardVisible, onChangeInputMethod, inputMethod } = this.props;
    const { animationDuration } = nextProps;

    if (!keyboardVisible && nextProps.keyboardVisible) {
      onChangeInputMethod(INPUT_METHOD.KEYBOARD);
    } else if (
      keyboardVisible &&
      !nextProps.keyboardVisible &&
      inputMethod !== INPUT_METHOD.CUSTOM
    ) {
      onChangeInputMethod(INPUT_METHOD.NONE);
    }

    const animation = LayoutAnimation.create(
      animationDuration,
      Platform.OS === "android"
        ? LayoutAnimation.Types.easeInEaseOut
        : LayoutAnimation.Types.keyboard,
      LayoutAnimation.Properties.opacity
    );
    LayoutAnimation.configureNext(animation);
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    const {
      containerHeight,
      contentHeight,
      keyboardHeight,
      keyboardWillShow,
      keyboardVisible,
      inputMethod,
      children,
      renderInputMethodEditor,
      keyboardWillHide
    } = this.props;
    console.log("content height", contentHeight);
    const isKeyboardHidden =
      inputMethod === INPUT_METHOD.NONE && !keyboardWillShow;
    const isKeyboardHiding =
      keyboardWillHide && inputMethod === INPUT_METHOD.KEYBOARD;

    const useContentHeight =
      keyboardWillShow || inputMethod === INPUT_METHOD.KEYBOARD;
    const containerStyle = {
      height: useContentHeight ? contentHeight : containerHeight
    };

    const showCustomInput =
      inputMethod === INPUT_METHOD.CUSTOM && !keyboardWillShow;
    const inputStyle = {
      height: showCustomInput ? keyboardHeight || 250 : 0,
      marginTop: isIphoneX() && (isKeyboardHidden || isKeyboardHiding) ? 24 : 0
    };

    return (
      <View style={containerStyle}>
        {children}
        <View style={inputStyle}>{renderInputMethodEditor()}</View>
      </View>
    );
  }
}

MessagingContainer.propTypes = {
  keyboardHeight: PropTypes.number.isRequired,
  keyboardWillHide: PropTypes.bool.isRequired,
  keyboardWillShow: PropTypes.bool.isRequired,
  keyboardVisible: PropTypes.bool.isRequired,
  animationDuration: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  contentHeight: PropTypes.number.isRequired,
  renderInputMethodEditor: PropTypes.func.isRequired,
  inputMethod: PropTypes.oneOf(Object.values(INPUT_METHOD)).isRequired,
  onChangeInputMethod: PropTypes.func,
  children: PropTypes.node
};

MessagingContainer.defaultProps = {
  onChangeInputMethod: () => null,
  children: null
};
