import { AsyncStorage } from 'react-native'
import { CARD_STORAGE_KEY } from './_cards'
import { listFormattedData } from '../utils/helpers'

export function getDecks() {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(listFormattedData)
}

export function getDeck() {
  
}

export function saveDeckTitle() {
  
}

export function addCardToDeck() {
  
}