import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { white, black, red } from '../utils/colors'
import { getDeck, deleteDeck } from '../utils/api'

class Deck extends Component {

  constructor(props) {
    super(props)
    this.state = {
      deck : {}
    }
  }

  componentDidMount() {
    const { deck } = this.props.navigation.state.params

    getDeck(deck.title)
      .then((deck) => {
        this.setState({
          deck
        })
      })
  }

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

    deleteDeck(deck.key)
    this.props.navigation.goBack()
  }

  render() {
    const { deck } = this.state

    return (
      <View>
        {Object.keys(deck).length !== 0 && <View>
          <Text>{deck.key}</Text>
          <Text>{deck.questions.length} cards</Text>
        </View>}
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