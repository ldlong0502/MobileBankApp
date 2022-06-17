import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { FONTS, SIZES, theme } from '../../constants';
import Pin from 'react-native-pin-code-ui';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import Data from '../Data/Data';
export default function CofirmPin(props) {
    const navigation = useNavigation();
    const [pin, setPin] = React.useState(' ');
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const {numPin}  = props.route.params;
    const checkContinue = async () => {
        if (pin === numPin) {
          Alert.alert('Pin mới trùng pin cũ');
          return;
        }
        navigation.navigate('ConfirmPhoneAgain', {numPin: pin});
      };
  const renderForm = () => {
  return (
    <View style={{  marginTop: '5%' }}>
      <Text style={{ ...FONTS.h2, alignSelf: 'center', marginBottom: 20 }}>
       Nhập pin mới
      </Text>
       <Pin
        onChangeValue={ code => {
          setPin(code);
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
    const renderButton = () => {
    return (
      <TouchableOpacity
        onPress={()=> checkContinue()}
        style={{
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
  return (
    <View style={{flex: 1}}>
      {renderForm()}
     {renderButton()}
    </View>
  );
}
