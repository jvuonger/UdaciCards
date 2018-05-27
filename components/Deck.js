import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { white, black, red } from '../utils/colors'
import { deleteDeck } from '../utils/api'

class Deck extends Component {

  _onPressAddCard = (deck) => {
    this.props.navigation.navigate(
      'AddCard',
      {
        deck: deck 
      }
    )
  }

  _onPressStartQuiz = (deck) => {
    this.props.navigation.navigate(
      'DeckQuiz',
      {
        deck: deck 
      }
    )
  }

  _onPressDeleteDeck = (deck) => {
    console.log('Delete Deck')
    deleteDeck(deck.key)
    this.props.navigation.goBack()
  }

  render() {
    const { navigation } = this.props
    const { deck } = navigation.state.params

    return (
      <View>
        <Text>{deck.key}</Text>
        <Text>{deck.questions.length} cards</Text>
        <Button
          onPress={() => this._onPressAddCard(deck)}
          title="Add Card"
          color={black}
        />
        <Button
          onPress={() => this._onPressStartQuiz(deck)}
          title="Start Quiz"
          color={white}
        />
        <Button
          onPress={() => this._onPressDeleteDeck(deck)}
          title="Delete Deck"
          color={red}
        />
      </View>
    )
  }
}

export default Deck