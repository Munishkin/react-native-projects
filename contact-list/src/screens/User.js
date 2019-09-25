import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Avatar from "../components/Avatar";
import ContactDetails from "../components/ContactDetails";
import capitalize from "../utils/capitalize";
import colors from "../utils/colors";
import { fetchUser } from "../utils/fetchUsers";
import store from "../../store";

export default class User extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: "Me",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: colors.blue
    },
    headerRight: (
      <MaterialIcons
        name="settings"
        size={24}
        style={{ color: "white", marginRight: 10 }}
        onPress={() => navigate("Options")}
      />
    )
  });

  state = {
    user: store.getState().user,
    loading: store.getState().isFetchingUser,
    error: store.getState().error
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() => {
      this.setState({
        user: store.getState().user,
        loading: store.getState().isFetchingUser,
        error: store.getState().error
      });
    });
    try {
      const fetchedUser = await fetchUser();
      store.setState({
        user: fetchedUser,
        isFetchingUser: false
      });
    } catch (e) {
      store.setState({
        isFetchingUser: false,
        error: true
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {
      user: { firstName, lastName, phone, uri },
      loading,
      error
    } = this.state;
    if (error) {
      return (
        <View>
          <Text>Error loading...</Text>
        </View>
      );
    }
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View style={styles.container}>
        <Avatar uri={uri} />
        <ContactDetails
          title={`${capitalize(firstName)} ${capitalize(lastName)}`}
          subtitle={phone}
          icon="phone"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center"
  }
});
