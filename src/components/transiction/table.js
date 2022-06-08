import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Text,
  Button,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import TakenList from '../transiction/takenlist';
class Table extends Component {
  render() {
    return (
      <View style={styles.availableBalance}>
       

        <View>
         
          <View style={styles.box}>
            <Text> </Text>
            <TouchableOpacity style={styles.button}   onPress={() => this.props.navigation.navigate('InBank')}>
              <Text style={styles.text}>Chuyển khoản nội bộ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('FastTransition')} >
              <Text style={styles.text}>Chuyển khoản liên ngân hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Chuyển tiền mã QR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>something</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TakenList />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  availableBalance: {
    marginTop: 20,
    display: 'flex',
    height: '90%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center', 
  },
  title: {
    color: '#E9D5CA',
    fontWeight: 'normal',
    fontSize: 16,
  },
  money: {
    color: '#E9D5CA',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    display: 'flex',
    margin: 10,
    backgroundColor: '#234F1E',
    height: 100,
    width: 100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    height: '50%',
  },
  text: {
    color: 'white',
  },
});
export default Table;
