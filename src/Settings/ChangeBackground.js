import {
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { useTranslation } from 'react-i18next';
import ImageAvailable from './ImageAvailable';
const devieceHeight = Dimensions.get('window').height;
export default function ChangeBackground({ setBackground, closePopup }) {
  const {t} = useTranslation();
  const ChangeBackgroundData = [
    { id: 1, title: t('common:takePhoto') },
    { id: 2, title: t('common:loadFromLibrary') },
    { id: 3, title: t('common:imageAvailable') },
    { id: 4, title: t('common:cancel2') },
  ];
  const [showImageAvailable, setShowImageAvailable] = React.useState(false);
  const ChangeBackGround = index => {
    if (index === 1) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(_image => {
        setBackground(_image.path);
        closePopup();
      });
    } else if (index === 2) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(_image => {
        setBackground(_image.path);
        closePopup();
      });
    } else if (index === 3) {
      setShowImageAvailable(true);
    } else if (index === 4) {
      console.log(5);
      closePopup();
    }
  };
  const renderChangeAvatar = (e, index) => {
    return (
        <TouchableOpacity key={index} style={{flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'gray'}} onPress={() => ChangeBackGround(e.id)}>
          {(e.id === 1 || e.id === 2 || e.id === 3) &&
            <Text  style={{ fontSize: 18, color: 'blue', alignSelf: 'center', padding: 15 }}>
              {e.title}
            </Text>}
          {e.id === 4 &&
            <Text style={{ fontSize: 18, alignSelf:'center', padding: 15 }}>
              {e.title}
            </Text>}
        </TouchableOpacity>
    );
  };
  const CloseImageAvailable = () => {
    setShowImageAvailable(false);
  };
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
            height: devieceHeight * 0.4,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}
        >
            {ChangeBackgroundData.map((e, index) =>
              renderChangeAvatar(e, index)
            )}
        </View>
      </View>
      {showImageAvailable && <ImageAvailable close={CloseImageAvailable} />}
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
