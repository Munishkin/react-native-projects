import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  TouchableHighlight,
  Image,
  BackHandler
} from "react-native";
import Status from "./src/components/Status";
import MessageList from "./src/components/MessageList";
import {
  CreateMessage,
  CreateImage,
  CreateLocation
} from "./src/utils/MessageUtils";
import Toolbar from "./src/components/Toolbar";
import ImageGrid from "./src/components/ImageGrid";
import MeasureLayout from "./src/components/MeasureLayout";
import KeyboardState from "./src/components/KeyboardState";
import MessagingContainer, {
  INPUT_METHOD
} from "./src/components/MessagingContainer";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [
        CreateImage("https://unsplash.it/300/300"),
        CreateMessage("Hello"),
        CreateMessage("Munishkin"),
        CreateLocation({
          latitude: 37.78825,
          longitude: -122.4324
        })
      ],
      fullScreenImageId: null,
      isFocused: false,
      inputMethod: INPUT_METHOD.NONE
    };
    this.handlePressMessage = this.handlePressMessage.bind(this);
    this.renderFullScreenImage = this.renderFullScreenImage.bind(this);
    this.dismissFullScreenImage = this.dismissFullScreenImage.bind(this);
    this.handleCameraPress = this.handleCameraPress.bind(this);
    this.handleLocationPress = this.handleLocationPress.bind(this);
    this.handleSubmitText = this.handleSubmitText.bind(this);
    this.handleChangeFocus = this.handleChangeFocus.bind(this);
    this.handleImagePress = this.handleImagePress.bind(this);
    this.handleInputMethodChange = this.handleInputMethodChange.bind(this);
    this.renderIME = this.renderIME.bind(this);
  }

  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const { fullScreenImageId } = this.state;
        if (fullScreenImageId) {
          this.dismissFullScreenImage();
          return true;
        }
        return false;
      }
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  handleInputMethodChange(inputMethod) {
    this.setState({ inputMethod });
  }

  handleCameraPress() {
    this.setState({
      inputMethod: INPUT_METHOD.CUSTOM,
      isFocused: false
    });
  }

  handleLocationPress() {
    navigator.geolocation.getCurrentPosition(position => {
      const {
        coords: { latitude, longitude }
      } = position;
      console.log(latitude, longitude);
      const { messages } = this.state;
      this.setState({
        messages: [CreateLocation({ longitude, latitude }), ...messages]
      });
    });
  }

  handleSubmitText(text) {
    const { messages } = this.state;
    this.setState({ messages: [CreateMessage(text), ...messages] });
  }

  handleChangeFocus(focus) {
    this.setState({ isFocused: focus });
  }

  handlePressMessage({ type, id }) {
    switch (type) {
      case "text":
        Alert.alert(
          "Delete message?",
          "Are you sure you want to delete this message permenantly?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                const { messages } = this.state;
                this.setState({
                  messages: messages.filter(message => message.id !== id)
                });
              }
            }
          ]
        );
        break;
      case "uri":
        this.setState({ fullScreenImageId: id, isFocused: false });
        break;
      default:
        return null;
    }
  }

  dismissFullScreenImage() {
    this.setState({ fullScreenImageId: null });
  }

  handleImagePress(uri) {
    const { messages } = this.state;
    this.setState({ messages: [CreateImage(uri), ...messages] });
  }

  renderFullScreenImage() {
    const { messages, fullScreenImageId } = this.state;
    if (!fullScreenImageId) return null;
    const { uri } = messages.filter(
      message => message.id === fullScreenImageId
    )[0];

    if (!uri) return null;
    return (
      <TouchableHighlight
        onPress={this.dismissFullScreenImage}
        style={styles.fullScreenImageContainer}
      >
        <Image source={{ uri }} style={styles.fullScreenImage} />
      </TouchableHighlight>
    );
  }

  renderMessageList() {
    const { messages } = this.state;
    return (
      <View style={styles.messageList}>
        <MessageList
          pressMessageItem={this.handlePressMessage}
          messages={messages}
        />
      </View>
    );
  }

  renderToolbar() {
    const { isFocused } = this.state;
    return (
      <View style={styles.toolbar}>
        <Toolbar
          onCameraPress={this.handleCameraPress}
          onLocationPress={this.handleLocationPress}
          onSubmitText={this.handleSubmitText}
          onChangeFocus={this.handleChangeFocus}
          isFocused={isFocused}
        />
      </View>
    );
  }

  renderIME() {
    return (
      <View style={styles.IME}>
        <ImageGrid onImagePress={this.handleImagePress} />
      </View>
    );
  }

  render() {
    const { inputMethod } = this.state;
    return (
      <View style={styles.container}>
        <Status />
        <MeasureLayout>
          {layout => (
            <KeyboardState layout={layout}>
              {keyboardInfo => (
                <MessagingContainer
                  {...keyboardInfo}
                  inputMethod={inputMethod}
                  onChangeInputMethod={this.handleInputMethodChange}
                  renderInputMethodEditor={this.renderIME}
                >
                  {this.renderMessageList()}
                  {this.renderToolbar()}
                </MessagingContainer>
              )}
            </KeyboardState>
          )}
        </MeasureLayout>
        {this.renderFullScreenImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  messageList: {
    flex: 1,
    backgroundColor: "#fff"
  },
  toolbar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.2)",
    backgroundColor: "#fff"
  },
  IME: {
    flex: 1,
    backgroundColor: "#fff"
  },
  fullScreenImage: {
    flex: 1,
    resizeMode: "contain"
  },
  fullScreenImageContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    zIndex: 2
  }
});
