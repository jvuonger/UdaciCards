import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions } from 'react-navigation'

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
    
    this.toHome()
  }

  toHome = () => {
    this.props.navigation.goBack()
  }

  render() {
   
    return (
      <View>
        <Text>Add Deck</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Set Deck Title"
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <Button 
          onPress={this.submit} 
          title="Create Deck"
        /> 
      </View>
    )
  }
}

export default AddDeck