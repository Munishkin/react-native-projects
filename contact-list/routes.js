import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ContactList from "./src/screens/ContactList";
import Profile from "./src/screens/Profile";
import Favourites from "./src/screens/Favourites";
import colors from "./src/utils/colors";
import User from "./src/screens/User";
import Options from "./src/screens/Options";

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const ContactsScreen = createStackNavigator(
  {
    Contacts: {
      screen: ContactList
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Contacts",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("list")
    }
  }
);

const FavouritesScreen = createStackNavigator(
  {
    Favourites: {
      screen: Favourites
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Favourites",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("star")
    }
  }
);

const UserScreen = createStackNavigator(
  {
    User: {
      screen: User
    },
    Options: {
      screen: Options
    }
  },
  {
    mode: "modal",
    initialRouteName: "User",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("person")
    }
  }
);
const TabNavigator = createBottomTabNavigator(
  {
    Contacts: {
      screen: ContactsScreen
    },
    Favourites: {
      screen: FavouritesScreen
    },
    User: {
      screen: UserScreen
    }
  },
  {
    initialRouteName: "Contacts",
    tabBarOptions: {
      style: {
        backgroundColor: colors.grey
      },
      showLabel: false,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark
    }
  }
);

export default createAppContainer(TabNavigator);
