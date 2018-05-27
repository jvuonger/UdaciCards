import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { white, black } from '../utils/colors'
class Deck extends Component {

  _onPressAddCard = () => {
    console.log('Add Card')
  }

  _onPressStartQuiz = () => {
    console.log('Start Quiz')
  }

  render() {
    const { navigation } = this.props
    const { deck } = navigation.state.params

    return (
      <View>
        <Text>{deck.key}</Text>
        <Text>{deck.questions.length} cards</Text>
        <Button
          onPress={this._onPressAddCard}
          title="Add Card"
          color={black}
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this._onPressStartQuiz}
          title="Start Quiz"
          color={white}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }
}

export default Deck