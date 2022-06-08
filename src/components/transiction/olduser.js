import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
class ListTaken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {name: 'lu dinh long', stk: 123},
        {name: 'dang thai tai', stk: 123},
        {name: 'nguyen thi bao ', stk: 123},
      ],
    };
  }

  render() {
    return (
      <ScrollView style={styles.listTaken}>
        <Text>Danh sách thụ hưởng </Text>
        {this.state.list.map(person => {
          return (
            <View key={person.id}>
              <Text style={styles.name}>{person.name}</Text>
              <Text style={styles.stk}>---{person.stk}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  listTaken: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    width: '90%',
    backgroundColor: '#85C113',
    padding: 20,
  },
  stk: {
    fontStyle: 'italic',
    color: '#E9D5CA',
    textAlign: 'left',
    lineHeight: 30,
    textDecoration: 'underline',
  },
  name: {
    fontStyle: 'normal',
    color: '#E9D5CA',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 30,
    textDecoration: 'underline',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
export default ListTaken;
