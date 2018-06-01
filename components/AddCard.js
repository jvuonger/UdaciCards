import React, { Component } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { black, white } from '../utils/colors'

class AddCard extends Component {
  static navigationOptions = {
    title: 'Add Card'
  }

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
      <View style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="Question"
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Answer"
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <TouchableOpacity
          onPress={this.submit}
          style={styles.submitButton}
        >
          <Text style={{color: white}}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

let windowWidth = Dimensions.get('window').width - 20

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  inputs: {
    width: windowWidth,
    height: 40,
    borderWidth: 1,
    backgroundColor: white,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 20
  },
  submitButton: {
    marginTop: 200,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    padding: 15,
    width: 200,
    backgroundColor: black
  }
})

export default AddCard