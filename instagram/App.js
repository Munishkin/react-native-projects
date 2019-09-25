import React from "react";
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  AsyncStorage,
  Modal
} from "react-native";
import { Constants } from "expo";
import Comments from "./src/screens/Comments";
import Feed from "./src/screens/Feed";

const STORED_COMMENTS = "Comments_Storage";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: {},
      showModal: false,
      selectedImageId: null
    };
    this.handleCommentPress = this.handleCommentPress.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.closeComments = this.closeComments.bind(this);
  }

  async componentDidMount() {
    try {
      const commentsLoaded = await AsyncStorage.get(STORED_COMMENTS);
      this.setState({
        comments: commentsLoaded ? JSON.parse(commentsLoaded) : {}
      });
    } catch (e) {
      console.log(e);
    }
  }

  closeComments() {
    this.setState({
      showModal: false,
      selectedImageId: null
    });
  }

  handleCommentPress(id) {
    this.setState({ showModal: true, selectedImageId: id });
  }

  submitComment(comment) {
    try {
      const { comments, selectedImageId } = this.state;
      const commentsForItem = comments[selectedImageId] || [];
      const updated = {
        ...comments,
        [selectedImageId]: [...commentsForItem, comment]
      };
      this.setState({ comments: updated });
      AsyncStorage.setItem(STORED_COMMENTS, JSON.stringify(updated));
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { showModal, comments, selectedImageId } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Feed onPressComment={this.handleCommentPress} comments={comments} />
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={this.closeComments}
        >
          <Comments
            comments={comments[selectedImageId] || []}
            onSubmit={this.submitComment}
            onClose={this.closeComments}
            style={styles.container}
          />
        </Modal>
      </SafeAreaView>
    );
  }
}

const platformVersion =
  Platform.OS === "ios" ? parseInt(Platform.Version, 10) : Platform.Version;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop:
      Platform.OS === "android" || platformVersion < 11
        ? Constants.statusBarHeight
        : 0
  }
});
