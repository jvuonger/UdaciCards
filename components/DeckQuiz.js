import React, { Component } from 'react'
import { View, Text } from 'react-native'

class DeckQuiz extends Component {
  render() {

    const { navigation } = this.props
    const { deck } = navigation.state.params

    return (
      <View>
        <Text>Deck Quiz</Text>
      </View>
    )
  }
}

export default DeckQuiz