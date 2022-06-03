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
const devieceHeight = Dimensions.get('window').height;
export default function ChangeBackground({ setBackground, closePopup }) {
  const ChangeBackgroundData = [
    { id: 1, title: 'Chụp ảnh' },
    { id: 2, title: 'Tải lên từ thư viện' },
    { id: 3, title: 'Ảnh có sẵn' },
    { id: 4, title: 'Hủy bỏ' },
  ];
  const ChangeBackground = index => {
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
    } else if (index === 4) {
      console.log(5);
      closePopup();
    }
  };
  const renderChangeAvatar = (e, index) => {
    return (
        <TouchableOpacity key={index} style={{flex: 1, borderBottomWidth: 1, borderColor: 'gray'}} onPress={() => ChangeBackground(e.id)}>
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
