import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, LogBox} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth  from '@react-native-firebase/auth';
import Data from '../../Data/Data';
const ConfirmPhoneScreen = (props) => {
  const [code, setCode] = useState('');
  const [check, setCheck] = useState('');
  const navigation = useNavigation();
  const { user } = props.route.params;
  const { confirm } = props.route.params;
  const AutoCreateBankID = () => {
    let bankID = '';
    let flag = true;
    while (flag) {
      for (var  i = 0; i < 10; i++){
        bankID += (Math.floor(Math.random() * 10 + 1)).toString();
      }
      bankID = bankID.substring(0,9);
      Data.getListUser().forEach(item => {
      if (item.bankID === bankID) {
        flag = true;
      }
      });
      flag = false;
    }
    return bankID;
  };
  const onConfirmPressed = async () => {
    try {
      await confirm.confirm(code);
      await firestore().collection('users').doc(auth().currentUser.uid).set({
        avatar: 'https://cdn-icons.flaticon.com/png/512/924/premium/924915.png?token=exp=1655486595~hmac=d22bfc8f1f749ffc30c9dee7c41d19d3',
        background: 'https://firebasestorage.googleapis.com/v0/b/bankapp-4377c.appspot.com/o/background%2Fbg1.jpg?alt=media&token=bf96715f-5073-4761-a410-83c94b052705',
        name: user.name,
        phone: user.phone,
        surplus: 5000000,
        password: user.password,
        bankID: AutoCreateBankID(),
        list: [],
        pin: user.pin,
        banktype: 1,
      });
      Alert.alert('Đăng ký thành công! Vui lòng đăng nhập lại');
      navigation.navigate('SignIn');
      console.log(auth().currentUser.uid);
    }
    catch (err) {
      console.log(err);
      setCheck('Code is not invalid');
    }
  };
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onResendPress = () => {
    console.warn('onResendPress');
  };
  useEffect(()=>{
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
  },[]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          placeholder="Enter your confirmation code"
          value={code}
          setValue={setCode}
        />
        {check.length > 0 ? <Text style={{color: 'red', alignSelf: 'flex-start'}}>{check}</Text> : null}

        <CustomButton text="Confirm" onPress={onConfirmPressed} />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmPhoneScreen;
