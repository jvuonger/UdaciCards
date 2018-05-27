import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { init_card_data, listFormattedData } from '../utils/_cards'

class DeckList extends Component {
  data = listFormattedData(init_card_data)

  renderItem = ({item, separators}) => {
    console.log(separators)
    return (
      <View style={styles.deck}>
        <Text style={styles.deckTitle}>{item.title}</Text>
        <Text style={styles.deckCardCount}>{item.questions.length} cards</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Testing</Text>
        <FlatList 
          data={this.data}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  deck : {
    flex: 1,
    padding: 30,
    borderBottomColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  deckTitle : {
    fontSize: 24,
    textAlign: 'center',
  },
  deckCardCount : {
    fontSize: 12,
    textAlign: 'center',
  }
})

export default DeckList