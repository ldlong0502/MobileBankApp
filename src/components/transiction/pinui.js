import React, {Component} from 'react';
import {

  StyleSheet,
  Text,
  View,
  TouchableOpacity,Alert,

} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Pin from 'react-native-pin-code-ui';
import { COLORS, FONTS } from '../../../constants';
import HelpFunction from '../../../HelpFunction';

export default class Pinui extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      pin: '',
      realpin: this.props.route.params.package.pin,
      username: this.props.route.params.package.username,
      rcName: this.props.route.params.package.rcName,
      idrc: this.props.route.params.package.idrc,
      money: this.props.route.params.package.money,
      BANS: this.props.route.params.package.BANS,
      BANRC: this.props.route.params.package.BANRC,
      message: this.props.route.params.package.message,
      surplus: this.props.route.params.package.surplus,
      surplusrc: this.props.route.params.package.surplusrc,
      pin: this.props.route.params.package.pin,
      ids: this.props.route.params.package.ids,
      transactionFee: 1000,
    };
    this.checkPin = this.checkPin.bind(this);

  }

  async checkPin() {
    console.log(this.state);

    if (this.state.pin === this.state.realpin) {
      firestore()
        .collection('users')
        .doc(this.state.idrc)
        .update({
          surplus: this.state.surplusrc + parseInt(this.state.money),
        })
        .then(() => {
          console.log('Userc updated!');
        });
        firestore()
        .collection('users')
        .doc(this.state.ids)
        .update({
          surplus: this.state.surplus - parseInt(this.state.money) - this.state.transactionFee,
        })
        .then(() => {
          console.log('Users updated!');
        });
      await firestore().collection('historyTransaction').doc().set({
        isAdd: false,
        money: parseInt(this.state.money) + this.state.transactionFee,
        time: HelpFunction.getCurrentDate(),
        title: 'Chuyển tiền đến ' + this.state.rcName,
        userId: this.state.ids,
        content: 'Nội dung giao dich: ' + this.state.message + '\n Thời điểm giao dịch: ' + HelpFunction.getCurrentDate(),
        toBankId: this.state.BANRC,
        fromBankId: '',
        idService: 1,
      });
      await firestore().collection('historyTransaction').doc().set({
        isAdd: true,
        money: parseInt(this.state.money) ,
        time: HelpFunction.getCurrentDate(),
        title: 'Nhận tiền từ ' + this.state.username,
        userId: this.state.idrc,
        content: 'Nội dung giao dịch: ' + this.state.message + '\n Thời điểm giao dịch: ' + HelpFunction.getCurrentDate(),
        fromBankId: this.state.BANS,
        toBankId: '',
        idService: 1,
      });

      Alert.alert('Thông báo','Giao dịch thành công', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);

      this.props.navigation.navigate('ConfirmScreen', {data:this.state});
    } else {
      alert('wrong pin');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Pin
          ref="pin"
          onChangeValue={value => {
            this.setState({pin: value});
          }}
          onChangeStatus={status => {
            this.setState({buttonDisabled: !status});
          }}
          styleEmptyBox={{borderColor: 'red'}}
          styleFullBox={{borderColor: 'green'}}
          styleText={{...FONTS.body2}}
          styleButton={{backgroundColor: 'red'}}
        />
        <View style={{justifyContent: 'center', marginTop: '10%'}}>
          <TouchableOpacity
            onPress={() => {
              this.checkPin();
            }}
            disabled={this.state.buttonDisabled}
            style={styles.button}>
            <Text style={{...FONTS.body3, color: COLORS.white}}>Xác nhận </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 5,
    height: 50,
    width: 120,
    backgroundColor: '#43CD80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
