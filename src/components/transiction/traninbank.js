import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Alert,
  Button,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../../../constants';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
class InBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      username: '',
      receiver: '',
      BAN: '',
      message: '',
      AmountOfMoney: 0,
    };
    this.loadTargetUser = this.loadTargetUser.bind(this);
this.MakeaTransaction= this.MakeaTransaction.bind(this);
    this.Debug = this.Debug.bind(this);
  }
  MakeaTransaction() {
    firestore()
      .collection('users')
      .doc('unJyNhOQtvZPlIkOHjOguTxlAFs1')
      .update({
         surplus:this.state.currentUser.surplus+this.state.AmountOfMoney
      })
      .then(() => {
        console.log('User updated!');
      });
  }
  loadReceiveUser(BAN){
    firestore()
    .collection('users')
    .get()
    .then(querySnapshot => {
     
  
      querySnapshot.forEach(documentSnapshot => {
        if(documentSnapshot.BAN ===BAN)
        {
          this.setState({receiver:documentSnapshot.name});
        }
      });
    });
  }
  loadTargetUser = async () => {
    const user = await firestore()
      .collection('users')
      .doc('unJyNhOQtvZPlIkOHjOguTxlAFs1')
      .get();
    this.setState({currentUser: user._data});
    
  };
  Debug() {
    console.log(this.state.currentUser);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.smallContainer}>
          <View
            style={{
              height: 50,
              width: 50,
              marginBottom: 5,
              borderRadius: 20,
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={icons.profile}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
                tintColor: 'pink',
              }}
            />
          </View>
          <Text style={styles.textt}>Tài khoản nguồn</Text>
          <Text style={styles.textt}>1924297498327498</Text>
          <Text style={styles.textt}> {this.state.username}</Text>
        </View>
        <View style={styles.biggerContainer}>
          <Text style={styles.heading}>Chuyển tiền nội bộ</Text>
          <TextInput
            value={this.state.BAN}
            style={styles.textInput}
            onChangeText={e => {
              this.setState({BAN: e});
            }}
            placeholder="số tài khoản ..."></TextInput>
          <Text style={styles.heading}>Tên người thụ hưởng </Text>
          <Text style={styles.textInput}>{this.state.receiver}</Text>
          <View style={styles.InOT}>
            <Text style={styles.heading}>Thông tin giao dịch</Text>

            <TextInput
              style={styles.textInput}
              onChangeText={e => {
                this.setState({AmountOfMoney: e});
              }}
              value={this.AmountOfMoney}
              placeholder="số tiền          vnđ"></TextInput>
            <TextInput
              onChangeText={e => {
                this.setState({message: e});
              }}
              value={this.message}
              style={styles.textInput}
              placeholder="nội dung chuyển tiền"></TextInput>
          </View>
        </View>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('ConfirmScreen')}>
          <Text
            style={{color: 'white', textTransform: 'capitalize', fontSize: 16}}>
            {' '}
            tiếp tục
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={this.loadTargetUser}>
          <Text
            style={{color: 'white', textTransform: 'capitalize', fontSize: 16}}>
            {' '}
         loadTargetUser
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.MakeaTransaction}>
          <Text
            style={{color: 'white', textTransform: 'capitalize', fontSize: 16}}>
            {' '}
          chuyển tiền
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  smallContainer: {
    backgroundColor: '#234F1E',
    padding: 20,
    margin: 10,
    width: '85%',
    height: '20%',
    borderRadius: 20,
  },
  biggerContainer: {
    backgroundColor: '#234F1E',
    padding: 20,
    margin: 20,
    width: '85%',
    height: '43%',
    borderRadius: 20,
  },
  heading: {
    alignSelf: 'flex-start',
    margin: 5,
    color: 'white',
    fontSize: 16,
  },

  textInput: {
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    fontSize: 12,
  },
  button: {
    display: 'flex',
    margin: 0,
    backgroundColor: '#74B340',
    height: 50,
    width: '80%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  InOT: {
    display: 'flex',

    padding: 0,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Arial',
  },
});

export default InBank;
