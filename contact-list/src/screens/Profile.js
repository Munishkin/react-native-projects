import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import capitalize from "../utils/capitalize";
import Avatar from "../components/Avatar";
import UserDetail from "../components/UserDetail";
import colors from "../utils/colors";
import ContactDetails from "../components/ContactDetails";
import store from "../../store";

export default class Profile extends Component {
  static navigationOptions = ({
    navigation: {
      state: { params }
    }
  }) => {
    const { id } = params;
    const { firstName } = store
      .getState()
      .contacts.find(contact => contact.id === id);
    return {
      title: capitalize(firstName),
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.blue
      }
    };
  };

  state = store.getState();

  render() {
    const { id } = this.props.navigation.state.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      cell,
      uri
    } = store.getState().contacts.find(contact => contact.id === id);
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Avatar uri={uri} />
          <ContactDetails
            title={`${capitalize(firstName)} ${capitalize(lastName)}`}
            subtitle={phone}
            icon="phone"
          />
        </View>
        <View style={styles.bottomContainer}>
          <UserDetail title="Email" subtitle={email} icon="email" />
          <UserDetail title="Work" subtitle={phone} icon="phone" />
          <UserDetail
            title="Personal"
            subtitle={cell}
            icon="stay-current-portrait"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue
  },
  bottomContainer: {
    flex: 1
  }
});
