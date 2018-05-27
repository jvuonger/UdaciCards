import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { init_card_data } from '../utils/_cards'
import { listFormattedData } from '../utils/helpers'
import { getDecks } from '../utils/api'

class DeckList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      decks: []
    }
  }

  componentDidMount() {   
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._fetchDecksOnFocus
    );
  }

  componentWillUnmount() {
    this._sub.remove();
  }

  _fetchDecksOnFocus = () => {
    getDecks().then( decks => {
      this.setState({
        decks
      })
    })
  }

  _onPress = (item) => {
    this.props.navigation.navigate(
      'Deck',
      {deck: item}
    )
  }

  renderItem = ({item, separators}) => {
    return (
      <TouchableOpacity onPress={() => this._onPress(item)} style={styles.deck}>
        <Text style={styles.deckTitle}>{item.title}</Text>
        <Text style={styles.deckCardCount}>{item.questions.length} cards</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.decks}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  deck : {
    flex: 1,
    padding: 30,
    borderBottomColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  deckTitle : {
    fontSize: 28,
    textAlign: 'center',
  },
  deckCardCount : {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#444'
  }
})

export default DeckList