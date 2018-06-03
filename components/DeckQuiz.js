import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { white, black, red, green, blue } from '../utils/colors'
import { logTodaysQuizDate } from '../utils/api'
import { clearLocalNotification } from '../utils/helpers'

class DeckQuiz extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      questions: [],
      currentCard: 0,
      totalCards: 0,
      isShowingQuestion: true,
      numCorrect: 0
    }
  }

  componentDidMount() {
    this._resetQuiz()
  }

  _resetQuiz = () => {
    const { deck } = this.props.navigation.state.params

    this.setState({
      questions: deck.questions,
      currentCard: 1,
      totalCards: deck.questions.length,
      numCorrect: 0
    })
  }

  _toggleQuestionOrAnswer = () => {
    this.setState((prevState) => {
      return {isShowingQuestion: !prevState.isShowingQuestion}
    })
  }

  _onPressCorrect = () => {
    this.setState((prevState) => {
      return {
        currentCard: ++prevState.currentCard,
        numCorrect: ++prevState.numCorrect 
      }   
    })
  }

  _onPressIncorrect = () => {
    this.setState((prevState) => {
      return {
        currentCard: ++prevState.currentCard
      }   
    })
  }

  _getPercentageCorrect = () => {
    const floatNumCorrect = parseFloat(this.state.numCorrect) / parseFloat(this.state.totalCards)
    const percentageCorrect = floatNumCorrect.toFixed(4) * 100
    return percentageCorrect
  }

  _getCardQuestion = (currentCard) => {
    if(currentCard === 0 || typeof this.state.questions[currentCard - 1] === 'undefined') {
      return null
    }
    return this.state.questions[currentCard - 1]
  }

  render() {

    const { navigation } = this.props
    const { deck } = navigation.state.params
    const { questions, currentCard, totalCards, isShowingQuestion, numCorrect } = this.state
    const currentQuestion = this._getCardQuestion(currentCard)

    // No Cards in Deck
    if(totalCards === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.noCardsText}>
            Sorry, you cannot take a quiz because there are no cards in the deck.
          </Text>
        </View>
      )
    }

    // End of Quiz, return results
    if(currentCard > totalCards) {

      logTodaysQuizDate()
      clearLocalNotification()

      return (
        <View style={styles.container}>
          <Text style={styles.quizScoreText}>
            You scored a {this._getPercentageCorrect()}%
          </Text>
          <TouchableOpacity
            onPress={this._resetQuiz}
            style={styles.restartQuizButton}
          >
            <Text style={{color:white}}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack() }
            style={styles.backToDeckButton}
          >
            <Text style={{color:white}}>Back to Deck</Text>
          </TouchableOpacity>

        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.cardCountText}>
          {currentCard} / {totalCards}
        </Text>

        <View style={styles.middleContainer}>
          <Text style={styles.contentText}>
            { isShowingQuestion   
              ? currentQuestion.question
              : currentQuestion.answer
            }
          </Text>

          <TouchableOpacity
            onPress={this._toggleQuestionOrAnswer}
            style={styles.answerButton}
          >
            <Text style={{color: red}}>
              { isShowingQuestion   
                ? 'Answer'
                : 'Question'
              }
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={this._onPressCorrect}
            style={styles.correctButton}
          >
            <Text style={{color: white}}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this._onPressIncorrect}
            style={styles.incorrectButton}
          >
            <Text style={{color: white}}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  restartQuizButton: {
    alignItems: 'center',
    borderRadius: 4,
    padding: 15,
    width: 200,
    backgroundColor: blue,
    marginBottom: 20
  },
  backToDeckButton: {
    alignItems: 'center',
    borderRadius: 4,
    padding: 15,
    width: 200,
    backgroundColor: black,
    marginBottom: 20
  },
  quizScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  noCardsText: {
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
  },
  cardCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    alignSelf: 'flex-start'
  },
  contentText: {
    fontSize: 28
  },
  answerButton: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 4,
    padding: 15,
    width: 200,
    marginTop: 20
  },
  correctButton: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 4,
    padding: 15,
    width: 200,
    backgroundColor: green,
    marginBottom: 20
  },
  incorrectButton: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 4,
    padding: 15,
    width: 200,
    backgroundColor: red
  }
})

export default DeckQuiz