import { AsyncStorage } from 'react-native'
import { CARD_STORAGE_KEY } from './_cards'
import { listFormattedData, LAST_QUIZ_DATE_KEY } from '../utils/helpers'

// Save the last time this user took a quiz
export function logTodaysQuizDate() {
  const todaysDate = new Date()
  todaysDate.setHours(0,0,0,0)
  AsyncStorage.setItem(LAST_QUIZ_DATE_KEY, JSON.stringify({'lastQuizDate': todaysDate}))
}

export function getLastQuizDate() {
  return AsyncStorage.getItem(LAST_QUIZ_DATE_KEY)
    .then(result => {
      let data = JSON.parse(result)
      if(data && data !== 'null' && data.hasOwnProperty('lastQuizDate')){
        return new Date(Date.parse(data.lastQuizDate))
      } else {
        return null
      }
    })
}

export function getDecks() {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(results => listFormattedData(results))
}

export function getDeck(deckKey) {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(results => {
      let decks = JSON.parse(results)
      return decks[deckKey]
    })
}

export function saveDeckTitle(title) {
  if((typeof title !== 'string') || title.trim() === '') {
    return undefined
  }

  return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
    [title] : {
      "key" : title,
      "questions" : [],
      "title" : title
    }
  }))

}

export function addCardToDeck(deckKey, question, answer) {
  console.log('Add Card to Deck')
  console.log(question)
  console.log(answer)
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(results => {
      decks = JSON.parse(results)
      decks[deckKey].questions.push({question, answer})
      AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(decks))
    })
}

export function deleteDeck(deckKey) {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(results => {
      decks = JSON.parse(results)
      delete decks[deckKey]
      AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(decks))
    })
}