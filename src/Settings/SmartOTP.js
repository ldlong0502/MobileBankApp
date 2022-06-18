import {
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import React from 'react';
import { FONTS, icons, SIZES, theme, COLORS } from '../../constants';
import Data from '../Data/Data';
import Pin from 'react-native-pin-code-ui';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function SmartOTP({ close }) {
  const [pin, setPin] = React.useState(' ');
  const navigation = useNavigation();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const renderForm = () => {
  return (
    <View style={{ flex: 1, marginTop: '5%' }}>
      <Text style={{ ...FONTS.h2, alignSelf: 'center', marginBottom: 20 }}>
        Nhập pin cũ
      </Text>
       <Pin
        onChangeValue={value => {
          setPin(value);
        }}
        onChangeStatus={status => {
          setButtonDisabled(!buttonDisabled);
        }}
        styleEmptyBox={{ borderColor: 'red' }}
        styleFullBox={{ borderColor: 'green' }}
        styleText={{ ...FONTS.body2 }}
        styleButton={{ backgroundColor: 'red' }}
      />
    </View>
  );
};
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
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
          Smart OTP
        </Text>
        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 100 }}>
          <Image style={{ height: 25, width: 25 }} source={icons.home} />
        </TouchableOpacity>
      </View>
    );
  };

  const checkContinue = () => {
      console.log(Data.getDataUser.pin);
      console.log(pin);
      if ( pin === Data.getDataUser.pin) {
        close();
        navigation.navigate('ConfirmPin',{numPin: pin});
      }
      else {
        Alert.alert('Pin sai');
      }


  };
  const renderButton = () => {
    return (
      <TouchableOpacity
        onPress={()=> checkContinue()}
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
            color: '#FFFFFF',
            marginVertical: 15,
          }}
        >
      Tiếp tục
        </Text>
      </TouchableOpacity>
    );
  };
  return <Modal animationType={'slide'} transparent={false} visible={true} onRequestClose={close}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView>
          {renderForm()}
          {renderButton()}
          <TouchableOpacity onPress={close} style ={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: 'blue'}}>Quay về</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>;
}