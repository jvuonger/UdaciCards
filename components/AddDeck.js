import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { white, black } from '../utils/colors'
import { getDeck } from '../utils/api'

class AddDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title : ''
    }
  }

  componentWillFocus() {
    console.log('back to the deck list view')
  }

  submit = () => {
    saveDeckTitle(this.state.title)

    this.setState({
      title: ''
    })
    
    this.props.navigation.goBack()

    getDeck(this.state.title)
      .then(deck => this.props.navigation.navigate('Deck', {deck}))

  }

  render() {
   
    return (
      <View style={styles.container}>
        <Text style={styles.newDeckText}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.inputs}
          placeholder="Deck Title"
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <TouchableOpacity
          onPress={this.submit}
          style={styles.submitButton}
        >
          <Text style={{color: white}}>Create Deck</Text>
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
  newDeckText: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20
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

export default AddDeck