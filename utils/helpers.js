import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const NOTIFICATION_KEY = 'UdaciCards:notifications'
export const LAST_QUIZ_DATE_KEY = 'UdaciCards:lastQuiz'

export function dateIsToday(date) {
  const todaysDate = new Date()
  todaysDate.setHours(0,0,0,0)

  return todaysDate.valueOf() === date.valueOf()
}

export function listFormattedData(results) {
  let obj = JSON.parse(results)
  let dataArray = []

  if(obj === null || obj === 'undefined') return []
  
  for (const [key, value] of Object.entries(obj)) {
    dataArray.push({key,...value})
  }

  return dataArray
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Time to Study!',
    body: "👋 don't forget to study and take a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let today = new Date()
              today.setHours(20)
              today.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: today,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}