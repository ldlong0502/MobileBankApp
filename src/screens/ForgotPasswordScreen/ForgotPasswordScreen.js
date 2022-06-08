import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import Data from '../../Data/Data';
import auth from '@react-native-firebase/auth';
const ForgotPasswordScreen = () => {
  const [phone, setPhone] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const navigation = useNavigation();
   const checkSignIn = () => {
     Data.getListUser().forEach(element => {
       if (element.phone === phone) {
         Data.getDataUser = element;
         console.log(Data.getDataUser);
         return true;
       }
     });
     return false;
   };

  const sendOTP = () => {
  auth()
  .verifyPhoneNumber('+84' + phone)
  .on(
    'state_changed',
    phoneAuthSnapshot => {
      switch (phoneAuthSnapshot.state) {
        case auth.PhoneAuthState.CODE_SENT:
          console.log('code sent',phoneAuthSnapshot);
          confirmResult => {console.log(confirmResult.verificationId);
          setVerificationId(confirmResult.verificationId);
          navigation.navigate('NewPassword', {verificationId: verificationId});
          };
          break;
        case auth.PhoneAuthState.ERROR: // or 'error'
          console.log('verification error', phoneAuthSnapshot);
          console.log(phoneAuthSnapshot.ERROR);
          Alert.alert('Error!Try Again');
          break;
      }
    },
    error => {
      console.log(error);
      console.log(error.verificationId);
    },
    phoneAuthSnapshot => {

      console.log('phoneAuthSnapshot', phoneAuthSnapshot);
    },
  );
  };
  const onSendPressed = () => {
    if (checkSignIn()){
      Alert.alert('SDT khong ton tai');
      return;
    }
    sendOTP();
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Phone"
          value={phone}
          setValue={setPhone}
        />

        <CustomButton text="Send" onPress={onSendPressed} />

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

export default ForgotPasswordScreen;
