import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import Data from '../../Data/Data';



const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [isUserName, setIsUserName] = useState('');
  const [isPhone, setISPhone] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const [isPasswordRepeat, setIsPasswordRepeat] = useState('');
  const navigation = useNavigation();
  const { t } = useTranslation();
  const check = '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$';
   // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // Handle the button press
  async function signUpWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber('+84' + phoneNumber);
    console.log(confirmation);
    setConfirm(confirmation);
    var user = {
        name: username,
        phone: phone,
        password: password,
      };
    navigation.navigate('ConfirmPhone', {user: user, confirm: confirmation});
  }
  const onRegisterPressed =  () => {
    try {
      if (username.length === 0) {
        setIsUserName('Tên người dùng không được để trống');
        return;
      }
      else {setIsUserName('');}
      if (isNaN(phone) || phone.length !== 10) {
        setISPhone('SĐT phải có 10 chữ số');
        return;
      }
      else {setISPhone('');}
      if (Data.getListUser().includes(phone)) {
        setISPhone('SĐT đã tồn tại');
        return;
      }
      else {setISPhone('');}
      if ( !password.match(check)) {
        setIsPassword(t('common:passTitle2'));
        return;
      }
      else {setIsPassword('');}
      if (passwordRepeat !== password) {
        setIsPasswordRepeat('Mk không trùng khớp');
        return;
      }
      else {setIsPasswordRepeat('');}
      signUpWithPhoneNumber(phone);
    }
    catch (err){
      console.log(err);
    }

  };

  const onSignInPress = () => {

    navigation.navigate('SignIn');

  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Tạo tài khoản</Text>

        <CustomInput
          placeholder="Tên người dùng"
          value={username}
          setValue={setUsername}
        />
        {isUserName.length > 0 ? <Text style={{color: 'red', alignSelf: 'flex-start'}}>{isUserName}</Text> : null}
        <CustomInput placeholder="Phone" value={phone} setValue={setPhone} />
        {isPhone.length > 0 ? <Text style={{color: 'red', alignSelf: 'flex-start'}}>{isPhone}</Text> : null}
        <CustomInput
          placeholder="Nhập mật khẩu"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        { isPassword.length > 0 ? <Text style={{color: 'red', alignSelf: 'flex-start'}} >{isPassword}</Text> : null}
        <CustomInput
          placeholder="Nhập lại mật khẩu"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
        />
        {isPasswordRepeat.length > 0 ? <Text style={{color: 'red', alignSelf: 'flex-start'}}>{isPasswordRepeat}</Text> : null}
        <CustomButton text="Đăng ký" onPress={onRegisterPressed} />

        <Text style={styles.text}>
          Bằng cách đăng ký, bạn xác nhận rằng bạn chấp nhận{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Điều khoản sử dụng
          </Text>{' '}
          và{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Chính sách bảo mật
          </Text>
        </Text>


        <CustomButton
          text="Đã có tài khoản? Đăng nhập."
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

export default SignUpScreen;
