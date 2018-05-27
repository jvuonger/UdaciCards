import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { addCardToDeck } from '../utils/api'

class AddCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      question: '',
      answer: ''
    }
  }

  submit = () => {
    const { deck } = this.props.navigation.state.params

    addCardToDeck(
      deck.key,
      this.state.question,
      this.state.answer
    )
    
    this.reset()
    this.toHome()
  }

  reset = () => {
    this.setState({
      question: '',
      answer: ''
    })
  }

  toHome = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { deck } = this.props.navigation.state.params

    return (
      <View>
        <Text>Add Card to {deck.title}</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Question"
          onChangeText={(title) => this.setState({title})}
          value={this.state.question}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Answer"
          onChangeText={(title) => this.setState({title})}
          value={this.state.answer}
        />
        <Button 
          onPress={this.submit} 
          title="Add Card"
        /> 
      </View>
    )
  }
}

export default AddCard