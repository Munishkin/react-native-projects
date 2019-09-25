import React, { Component } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import ContactListItem from "../components/ContacListItem";
import capitalize from "../utils/capitalize";
import store from "../../store";
import { fetchUsers } from "../utils/fetchUsers";

const keyExtractor = contact => contact.phone;

export default class ContactList extends Component {
  static navigationOptions = {
    title: "Contacts"
  };

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error
      });
    });

    const contacts = await fetchUsers();
    store.setState({ contacts, isFetchingContacts: false });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderItem = ({ item: { uri, firstName, lastName, phone, id } }) => {
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <ContactListItem
        uri={uri}
        name={`${capitalize(firstName)} ${capitalize(lastName)}`}
        phone={phone}
        onPress={() => navigate("Profile", { id })}
      />
    );
  };

  render() {
    const { contacts, loading, error } = this.state;
    if (error) {
      return (
        <View>
          <Text>Error loading</Text>
        </View>
      );
    }
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <FlatList
        keyExtractor={keyExtractor}
        data={contacts}
        renderItem={this.renderItem}
      />
    );
  }
}
