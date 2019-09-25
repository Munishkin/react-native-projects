import React, { Component } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text
} from "react-native";
import Avatar from "../components/Avatar";
import store from "../../store";
import { fetchUsers } from "../utils/fetchUsers";

const keyExtractor = item => item.phone;

export default class Favourites extends Component {
  static navigationOptions = {
    title: "Favourites"
  };

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error
  };

  async componentDidMount() {
    const { contacts } = this.state;
    this.unsubscribe = store.onChange(() => {
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error
      });
    });
    if (contacts.length === 0) {
      try {
        const fetchedContacts = await fetchUsers();
        store.setState({
          contacts: fetchedContacts,
          isFetchingContacts: false
        });
      } catch (e) {
        store.setState({
          error: true,
          isFetchingContacts: false
        });
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderItem = ({ item: { uri, id } }) => (
    <View style={styles.item}>
      <Avatar
        uri={uri}
        size={74}
        onPress={() => this.props.navigation.navigate("Profile", { id })}
      />
    </View>
  );

  render() {
    const { contacts, error, loading } = this.state;
    const favourites = contacts.filter(contact => contact.favourite);
    if (error) {
      return (
        <View>
          <Text>Error loading contacts</Text>
        </View>
      );
    }

    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={favourites}
          renderItem={this.renderItem}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  list: {
    alignItems: "center"
  },
  item: {
    paddingVertical: 30,
    marginHorizontal: 15
  }
});
