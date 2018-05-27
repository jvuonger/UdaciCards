import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import DeckQuiz from './components/DeckQuiz'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { white, purple } from './utils/colors'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

const RouteConfigs = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
}

const BottomTabNavigatorConfig = {
  initialRouteName: 'Decks'
}

const Tabs = createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  DeckQuiz: {
    screen: DeckQuiz
  }
})