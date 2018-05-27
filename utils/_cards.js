import { AsyncStorage } from 'react-native'

export const CARD_STORAGE_KEY = 'UdaciCards:cards'

export const init_card_data = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Testing: {
    title: 'Testing',
    questions: []
  }
}

export function listFormattedData(obj) {
  let dataArray = []
  for (const [key, value] of Object.entries(obj)) {
    dataArray.push({key,...value})
  }
  return dataArray
}