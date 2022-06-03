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
import ImagePicker from 'react-native-image-crop-picker';
import { icons } from '../../constants';
const devieceHeight = Dimensions.get('window').height;
export default function ChangeLanguageForm({ HandleAvatar, closePopup }) {
  const [isVn, setIsVn] = React.useState(null);
  const [isEn, setIsEn] = React.useState(null);
  const ChangeData = [
    { id: 1, title: 'Tiếng Việt', code: 'vn' },
    { id: 2, title: 'Tiếng Anh', code: 'en'},
  ];
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
    }
    else {
        setIsVn(false);
        setIsEn(true);
        console.log(isEn);
    }
    closePopup();
  };
  useEffect(()=> {
    setIsEn(false);
    setIsVn(true);
  },[isEn,isVn]);
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
              Chọn ngôn ngữ
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
