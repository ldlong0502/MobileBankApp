import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { FONTS, SIZES, theme } from '../../constants';
import Pin from 'react-native-pin-code-ui';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import Data from '../Data/Data';
export default function ConfirmCodeAgain(props) {
    const navigation = useNavigation();
    const [pin, setPin] = React.useState(' ');
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const {numPin}  = props.route.params;
    const checkContinue = async () => {
        if ( pin !== numPin) {
           Alert.alert('Pin nhập lại không trùng');
           return;
        }
        await firestore().collection('users').doc(Data.getDataUser.id).update({
          pin: pin,
        });
        Data.getDataUser.pin = pin;
        Alert.alert('Đổi Pin thành công!!!');
        navigation.navigate('BottomTabs');
  };
  const renderForm = () => {
  return (
    <View style={{  marginTop: '5%' }}>
      <Text style={{ ...FONTS.h2, alignSelf: 'center', marginBottom: 20 }}>
       Nhập lại pin mới
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
      Xác nhận
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