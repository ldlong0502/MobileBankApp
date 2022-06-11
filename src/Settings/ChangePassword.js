import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import { FONTS, icons, SIZES, theme } from '../../constants';
import { useTranslation } from 'react-i18next';
import Data from '../Data/Data';
import HelpFunction from '../../HelpFunction';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
export default function ChangePassword({ close }) {
  const {t} = useTranslation();
  const [username, setUsername] = React.useState('09999999999');
  const [password, setPassword] = React.useState('L123456@');
  const [oldPass, setOldPass] = React.useState('');
  const [newPass, setNewPass] = React.useState('');
  const [againPass, setAgainPass] = React.useState('');
  const condition = t('common:passTitle1');
  const text = t('common:passTitle2');
  const navigation = useNavigation();
  const completePress = async () => {
    if (oldPass !== Data.getDataUser.password) {
      Alert.alert('Mk cũ sai');
      return;
    }
     if (!newPass.match(HelpFunction.check)) {
      Alert.alert('Mk mơi không thỏa yêu cầu');
      return;
    }
    if (newPass === oldPass) {
      Alert.alert('Mk mới trùng mk cũ!!!');
      return;
    }
    if (newPass !== againPass) {
      Alert.alert('Mk không trùng khớp!!!');
      return;
    }
    await firestore().collection('users').doc(Data.getDataUser.id).update({
      password: newPass,
    }).then( () => {
      Alert.alert('Đổi mk thành công!Log in Again');
      close();
      navigation.navigate('SignIn');
    });

  };
  const renderHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: SIZES.padding - 5,
          paddingHorizontal: SIZES.padding,
          borderBottomWidth: 5,
          borderBottomColor: 'gray',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={close} style={{ flex: 1, alignItems: 'center' }}>
          <Image style={{ height: 30, width: 30 }} source={icons.back} />
        </TouchableOpacity>
        <View style={{flex: 10, justifyContent: 'center',
            alignItems: 'center'}}>
          <Text
          style={{
            fontSize: 18,
            color: '#000000',
            alignSelf: 'center',
            ...FONTS.h3,
          }}
        >
         {t('common:changePassword')}
        </Text>
        </View>
        <TouchableOpacity style={{ alignSelf: 'center', flex: 1 }}>
          <Image style={{ height: 25, width: 25 }} source={icons.home} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderForm = () => {
    return (
      <View style={{ flex: 10 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              margin: 10,
              borderColor: '#66CC66',
              borderWidth: 2,
              borderRadius: 20,
            }}
            placeholder={t('common:oldPassword')}
            value={oldPass}
            onChangeText={value => setOldPass(value)}
          />
        </View>
        <View
          style={{
            flex: 2,
            borderColor: '#66CC66',
            borderWidth: 2,
            borderRadius: 20,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#EEEEEE',
            margin: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: '#000000',
              padding: 10,
            }}
          >
            {condition}
          </Text>
          <Text style={{ fontSize: 15, padding: 5, color: '#000000' }}>
            {text}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              margin: 10,
              borderColor: '#66CC66',
              borderWidth: 2,
              borderRadius: 20,
            }}
            placeholder={t('common:newPassword')}
            value={newPass}
            onChangeText={value => setNewPass(value)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              margin: 10,
              borderColor: '#66CC66',
              borderWidth: 2,
              borderRadius: 20,
            }}
            placeholder={t('common:againNewPassword')}
            value={againPass}
            onChangeText={value => setAgainPass(value)}
          />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  };
  const renderButton = () => {
    return (
      <TouchableOpacity
        onPress={completePress}
        style={{
          flex: 1,
          backgroundColor: theme.COLORS.green,
          borderRadius: 30,
          marginTop: SIZES.padding * 7,
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 15,
            color: '#000',
            marginVertical: 15,
          }}
        >
         {t('common:complete')}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={true}
      onRequestClose={close}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView>
          {renderHeader()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
