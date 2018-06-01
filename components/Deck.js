import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { white, black, red } from '../utils/colors'
import { getDeck, deleteDeck } from '../utils/api'

class Deck extends Component {

  static navigationOptions = ({navigation}) => {
    return {title: navigation.getParam('deck').title}
  }

  constructor(props) {
    super(props)
    this.state = {
      deck : {}
    }
  }

  componentDidMount() {
    const { deck } = this.props.navigation.state.params
    this._fetchDeckOnFocus(deck)
    this.sub = this.props.navigation.addListener(
      'didFocus',
      () => {
        this._fetchDeckOnFocus(deck)
      }
    );
    
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  _fetchDeckOnFocus = (deck) => {
    console.log('fetchdeck')
    getDeck(deck.title)
      .then( deck => {
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
      <View style={styles.container}>
        { (typeof deck !== "undefined") && Object.keys(deck).length !== 0 && <View>
          <Text style={styles.deckTitle}>{deck.key}</Text>
          <Text style={styles.deckCardCount}>{deck.questions.length} cards</Text>
        </View>}
        
        <TouchableOpacity
          onPress={() => this._onPressAddCard(deck)}
          title="Add Card"
          style={styles.addCardButton}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._onPressStartQuiz(deck)}
          style={styles.startQuizButton}
        >
          <Text style={{color: white}}>Start Quiz</Text>
        </TouchableOpacity>

        <Button
          onPress={() => this._onPressDeleteDeck(deck)}
          title="Delete Deck"
          color={red}
        />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  deckTitle : {
    fontSize: 28,
    textAlign: 'center',
  },
  deckCardCount : {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 120,
    textAlign: 'center',
    color: '#444'
  },
  addCardButton: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    padding: 15,
    width: 200,
    backgroundColor: white,
    marginBottom: 20
  },
  startQuizButton: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    padding: 15,
    width: 200,
    backgroundColor: black
  }
})

export default Deck