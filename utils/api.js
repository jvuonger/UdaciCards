import { AsyncStorage } from 'react-native'
import { CARD_STORAGE_KEY } from './_cards'
import { listFormattedData } from '../utils/helpers'

export function getDecks() {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(results => listFormattedData(results))
}

export function getDeck() {
  
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

export function addCardToDeck() {
  
}

export function deleteDeck(deckKey) {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(results => {
      decks = JSON.parse(results)
      delete decks[deckKey]
      AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(decks))
    })
}