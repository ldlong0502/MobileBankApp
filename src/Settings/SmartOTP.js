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
} from 'react-native';
import React from 'react';
import { FONTS, icons, SIZES, theme } from '../../constants';
export default function SmartOTP({ close }) {


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
  const renderForm = () => {
    return (
      <Text>Tình trạng: </Text>
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
          Hoàn tất
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
