import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import { FONTS, icons, SIZES, theme } from '../../constants';
import { useTranslation } from 'react-i18next';
export default function ChangePassword({ close }) {
  const {t} = useTranslation();
  const [username, setUsername] = React.useState('09999999999');
  const [password, setPassword] = React.useState('L123456@');
  const [oldPass, setOldPass] = React.useState('');
  const [newPass, setNewPass] = React.useState('');
  const [againPass, setAgainPass] = React.useState('');
  const condition = t('common:passTitle1');
  const text = t('common:passTitle2');

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding - 5,
          paddingHorizontal: SIZES.padding,
          borderBottomWidth: 5,
          borderBottomColor: 'gray',
        }}
      >
        <TouchableOpacity onPress={close} style={{ marginLeft: 10 }}>
          <Image style={{ height: 30, width: 30 }} source={icons.back} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            color: '#000000',
            alignSelf: 'center',
            marginLeft: 80,
            ...FONTS.h3,
          }}
        >
         {t('common:changePassword')}
        </Text>
        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 80 }}>
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
          />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  };
  const renderButton = () => {
    return (
      <TouchableOpacity
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
