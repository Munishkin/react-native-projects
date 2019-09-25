import React, { Component } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { MapView } from "expo";
import { MessageShape } from "../utils/MessageUtils";

const keyExtractor = message => message.id.toString();

export default class MessageList extends Component {
  constructor() {
    super();
    this.handleRender = this.handleRender.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  handleRender({ item }) {
    const { pressMessageItem } = this.props;
    return (
      <View key={item.id} style={styles.item}>
        <TouchableOpacity onPress={() => pressMessageItem(item)}>
          {this.renderItem(item)}
        </TouchableOpacity>
      </View>
    );
  }

  renderItem({ type, text, uri, coordinates }) {
    switch (type) {
      case "text":
        return (
          <View style={styles.bubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );
      case "uri":
        return <Image style={styles.image} source={{ uri }} />;
      case "coordinates":
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinates,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04
            }}
          >
            <MapView.Marker coordinate={coordinates} />
          </MapView>
        );
      default:
        return null;
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={messages}
        keyExtractor={keyExtractor}
        renderItem={this.handleRender}
        inverted
        keyboardShouldPersistTaps="handled"
      />
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(MessageShape).isRequired,
  pressMessageItem: PropTypes.func
};

MessageList.defaultProps = {
  pressMessageItem: () => null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible"
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 60
  },
  bubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#3e7898",
    borderRadius: 10
  },
  text: {
    fontSize: 18,
    color: "#fff"
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10
  },
  map: {
    width: 250,
    height: 250,
    borderRadius: 10
  }
});
