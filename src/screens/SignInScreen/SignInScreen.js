import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/card-service.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Data from '../../Data/Data';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const SignInScreen = () => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState('');
  const {t} = useTranslation();
  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  let checkSignIn = () => {
    let flag = false;
    Data.getListUser().forEach(element => {
      if (element.phone === phone && element.password === password) {
        Data.getDataUser = element;
        console.log(Data.getDataUser);
        flag = true;
        return;
      }
    });
    return flag;
  };
  const onSignInPressed = () => {
   console.log(Data.getListUser());
   console.log(checkSignIn());
  if (!checkSignIn()) {
    Alert.alert('SĐT hoặc mật khẩu không hợp lệ');
    return;
  }
  Alert.alert('Đăng nhập thành công!Chào mừng quý khách');
  navigation.navigate('BottomTabs');

  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };
  const loadListUser = async () => {
  Data.getListUser().splice(0,Data.getListUser().length);
  await firestore().collection('users').get().then(snapshot => {
    snapshot.forEach(doc => {
      Data.setListUser({id: doc.id,
        phone: doc.data().phone,
        password: doc.data().password,
        avatar: doc.data().avatar,
        background: doc.data().background,
        surplus: doc.data().surplus,
        name: doc.data().name,

      });
    });
  });
  };
  useEffect(() => {
    loadListUser();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <Text style={styles.title}>{t('common:appName')}</Text>

        <CustomInput
          placeholder= {t('common:phone')}
          value={phone}
          setValue={setPhone}
        />
        <CustomInput
          placeholder={t('common:password')}
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomButton text={t('common:login')} onPress={onSignInPressed} />

        <CustomButton
          text={t('common:forgotPassword')}
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
          text={t('common:loginTitlte1')}
          onPress={onSignUpPress}
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
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
