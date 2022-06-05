import {
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { icons } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
const devieceHeight = Dimensions.get('window').height;
export default function ChangeLanguageForm({ HandleAvatar, closePopup }) {
  const { t, i18n } = useTranslation();
  const [isVn, setIsVn] = React.useState(null);
  const [isEn, setIsEn] = React.useState(null);
  const [code, setCode] = React.useState(null);
  const ChangeData = [
    { id: 1, title: t('common:vietnamese'), code: 'vn' },
    { id: 2, title: t('common:english'), code: 'en'},
  ];
  const setLanguage = _code => {
    return i18n.changeLanguage(_code);
  };
  const getDataLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem('user-language');
      if (value !== null) {
        setCode(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const renderChangeData = (e, index) => {
    return <View key={e.id} style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => changeLanguage(e.id)} style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 18, color: 'blue', alignSelf: 'center', padding: 10 }}>
            {e.title}
          </Text>
          {e.id === 1 && <Image style={{ height: 30, width: 30 }} source={isVn ? icons.check : icons.nocheck} />}
          {e.id === 2 && <Image style={{ height: 30, width: 30 }} source={isEn ? icons.check : icons.nocheck} />}
        </TouchableOpacity>
      </View>;
  };

  const changeLanguage = index => {
    if (index === 1){
        setIsVn(true);
        setIsEn(false);
        setLanguage('vn');
    }
    else {
        setIsVn(false);
        setIsEn(true);
        console.log(isEn);
        setLanguage('en');
    }
    closePopup();
  };
  useEffect(() =>  {
    getDataLanguage();
    if (code === 'vn'){
      setIsEn(false);
      setIsVn(true);
    }
    else {
       setIsEn(true);
       setIsVn(false);
    }
  },[code,setIsEn,setIsVn]);
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={true}
      onRequestClose={closePopup}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableWithoutFeedback onPress={closePopup} style={{ flex: 1 }}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: devieceHeight * 0.3,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
              {t('common:chooseLanguage')}
            </Text>
          </View>
          {ChangeData.map((e, index) => renderChangeData(e, index))}
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {},
});
