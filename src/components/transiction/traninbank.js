import React, {useState, useEffect} from 'react';
import Data from '../../Data/Data';
import auth from '@react-native-firebase/auth';
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
  KeyboardAvoidingView,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../../../constants';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import {t} from 'i18next';
class InBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: new Date(),
      transactionFee:1000,
      username: Data.getDataUser.name,
      rcName: '',
      idrc: '',
      money: 0,
      BANS: Data.getDataUser.bankID,
      BANRC: 0,
      message: '',
      surplus: Data.getDataUser.surplus,
      surplusrc: 0,
      pin: Data.getDataUser.pin,
      phone: Data.getDataUser.phone,
      ids:Data.getDataUser.id,
    };

    this.loadTargetUser = this.loadTargetUser.bind(this);
    this.MakeaTransaction = this.MakeaTransaction.bind(this);
    this.otp = this.otp.bind(this);
    this.love = this.love.bind(this);
    // this.comfirmphone = this.comfirmphone.bind(this);
  }
  love() {
    this.loadTargetUser();
  }

  // comfirmphone = async () => {
  //   try {
  //     response = ;
  //     alert(Json.stringify(response));
  //   } catch (e) {
  //     alert(JSON.stringify(e));
  //   }
  // };

  otp = async () => {
    const confirmations = await auth().signInWithPhoneNumber('+84 854 673 021');
    this.setState({comfirm: confirmations});
  };

  MakeaTransaction() {
    firestore()
      .collection('users')
      .doc(this.state.idrc)
      .update({
        surplus: this.state.surplusrc + parseInt(this.state.money),
      })
      .then(() => {
        console.log('User updated!');
      });
  }

  loadTargetUser = async () => {
    await firestore()
      .collection('users')
      .get()
      .then(collectionSnapshot => {
        collectionSnapshot.forEach(documentSnapshot => {
          if (documentSnapshot._data.bankID === this.state.BANRC) {
            this.setState({
              idrc: documentSnapshot.id,
              rcName: documentSnapshot._data.name,
              surplusrc: documentSnapshot._data.surplus,
            });
          }
        });
      });
  };

  render() {
    return <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.smallContainer1}>
              <Text style={styles.bigtext}>Chuyển từ</Text>

              <Text style={styles.smtext}>
                {this.state.username}
              </Text>
              <Text style={styles.smtext}>
                {' '}{this.state.BANS}
              </Text>
              <Text style={styles.smtext}>
                {' '}{this.state.surplus} VND
              </Text>
            </View>
            <View style={styles.smallContainer2}>
              <Text style={styles.bigtext}>Chuyển tới</Text>
              <TextInput value={this.state.BANRC} style={styles.inputtext} onBlur={this.love} onChangeText={e => {
                  this.setState({ BANRC: e });
                }} placeholder="Số tài khoản ..." />
              <Text style={styles.smtext}>Tên người thụ hưởng </Text>
              <Text style={styles.smtext}>
                {this.state.rcName}
              </Text>
            </View>

            <View style={styles.smallContainer3}>
              <Text style={styles.bigtext}>Thông tin giao dịch</Text>

              <TextInput style={styles.inputtext} onChangeText={e => {
                  this.setState({ money: e });
                }} value={this.money} keyboardType="numeric" placeholder="Số tiền    ...    vnđ" />
              <TextInput onChangeText={e => {
                  this.setState({ message: e });
                }} value={this.message} style={styles.inputtext} placeholder="Nội dung chuyển tiền" />
            </View>
            <View style={styles.reallySmallContainer}>
              <Text style={styles.smtext}>
                Ngày chuyển : Hôm nay, {this.state.day.getDate()}/
                {this.state.day.getMonth()}/{this.state.day.getFullYear()}
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {
                if (parseInt(this.state.money) > this.state.surplus + 50000) {
                  alert(' số dư  không đủ ');
                  this.setState({ money: 0 });
                } else if (this.state.rcName === '') {
                  alert('chưa nhập số tài khoản ');
                } else {
                  this.props.navigation.navigate('pin', {
                    package: this.state,
                  });
                }
              }}>
              <Text style={{ color: 'white', textTransform: 'capitalize', fontSize: 16 }}>
                {' '}tiếp tục
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.button} onPress={this.MakeaTransaction}>
          <Text
            style={{
              color: 'white',
              textTransform: 'capitalize',
              fontSize: 16,
            }}>
            {' '}
            chuyển tiền
          </Text>
        </TouchableOpacity> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>;
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  smallContainer1: {
    backgroundColor: 'white',
    padding: 10,
    margin: 6,
    width: '100%',
    height: '18%',
    borderRadius: 20,
  },
  smallContainer2: {
    backgroundColor: 'white',
    padding: 10,
    margin: 6,
    width: '100%',
    height: '23%',
    borderRadius: 20,
  },
  smallContainer3: {
    backgroundColor: 'white',
    padding: 10,
    margin: 6,
    width: '100%',
    height: '26%',
    borderRadius: 20,
  },
  reallySmallContainer: {
    backgroundColor: 'white',

    marginBottom: 5,
    width: '100%',
    height: '6%',
    borderRadius: 20,
  },
  button: {
    display: 'flex',
    margin: 4,
    backgroundColor: '#43CD80',
    height: 50,
    width: '80%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },

  smtext: {
    color: '#000000',
    marginLeft: 30,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  bigtext: {
    color: '#A54175',
    fontSize: 20,
    fontWeight: '400',
    margin: 2,
  },
  inputtext: {
    marginLeft: 15,
    marginBottom: 10,
    color: '#A54175',
    fontSize: 15,
    width: '90%',
    fontWeight: '400',
    borderBottomWidth: 1,
  },
});

export default InBank;
