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
export default function ChangeAvatar({HandleAvatar, closePopup}) {

  const ChangeAvatarData = [
    { id: 1, title: 'Từ Camera' },
    { id: 2, title: 'Từ Thư viện' },
    { id: 3, title: 'Hủy' },
  ];
  const renderChangeAvatar = (e, index) => {
    return <View key={e.id} style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => changeAvatar(e.id)}>
          {(e.id === 1 || e.id === 2) && <Text style={{ fontSize: 18, color: 'blue', alignSelf: 'center', padding: 10 }}>
              {e.title}
            </Text>}
          {e.id === 3 && <Text style={{ fontSize: 18, color: 'red', alignSelf: 'center', padding: 10 }}>
              {e.title}
            </Text>}
        </TouchableOpacity>
      </View>;
  };

  const changeAvatar = index => {
    if (index === 1) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(_image => {
        console.log(_image.path);
        HandleAvatar(_image.path);
        closePopup();
      });
    } else if (index === 2) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(_image => {
        HandleAvatar(_image.path);
        closePopup();
      });
    } else if (index === 3) {
        console.log(5);
      closePopup();
    }
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
            height: devieceHeight * 0.3,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>
              Chỉnh sửa ảnh đại diện
            </Text>
          </View>
        {ChangeAvatarData.map((e, index) => renderChangeAvatar(e, index))}
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
