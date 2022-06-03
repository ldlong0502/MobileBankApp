import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import ChangeAvatar from './ChangeAvatar';
import ChangeBackground from './ChangeBackground';
import ChangePassword from './ChangePassword';
import { COLORS, SIZES, FONTS, icons, images } from '../../constants';
import SmartOTP from './SmartOTP';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import User from '../../User';
import OtherSetting from './OtherSetting';

export default function Setting() {
  const [showAvatar, setShowAvatar] = React.useState(false);
  const [showBackground, setShowBackground] = React.useState(false);
  const [showSmartOTP, setShowSmartOTP] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);
  const [otherSetting, setOtherSetting] = React.useState(false);
  const [transferred, setTransferred] = React.useState(0);
  const [avatar, setAvatar] = React.useState(
    'https://cdn-icons-png.flaticon.com/512/7108/7108018.png'
  );
  const PersonalData = [
    { id: 1, title: 'Đổi ảnh đại diện', image: icons.avatar },
    { id: 2, title: 'Đổi ảnh nền', image: icons.image },
  ];
  const AdvancedData = [
    { id: 3, title: 'Smart OTP', image: icons.otp },
    { id: 4, title: 'Danh bạ chuyển tiền', image: icons.phonebook },
    { id: 5, title: 'Mẫu thanh toán', image: icons.bill },
    { id: 6, title: 'Đổi mật khẩu', image: icons.password },
    { id: 7, title: 'Cài đặt khác', image: icons.setting },
  ];
  const ClickItem = index => {
    if (index === 1) {
      setShowAvatar(true);
    } else if (index === 2) {
      setShowBackground(true);
    } else if (index === 3) {
      setShowSmartOTP(true);
    } else if (index === 6) {
      setChangePassword(true);
    }
    else {
      setOtherSetting(true);
    }
  };
  const handleAvatar = async fileStr => {
    setAvatar(fileStr);
    const filename = String(fileStr).substring(String(fileStr).lastIndexOf('/') + 1);
    const task = storage().ref('/avatar/' + filename).putFile(fileStr);
    setTransferred(0);
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
      const url = await storage().ref('/avatar/' + filename).getDownloadURL();
      await firestore().collection('users').doc(User.getCurrentUser()).update({
      avatar: url,
    });
    } catch (e) {
      console.error(e);
    }
  };
    const closePopupAvatar = () => {
      setShowAvatar(false);
    };
  const closePopupBackground = () => {
    setShowBackground(false);
  };
  const closeSmartOTP = () => {
    setShowSmartOTP(false);
  };
  const closeChangePassword = () => {
    setChangePassword(false);
  };
  const closeOtherSetting = () => {
    setOtherSetting(false);
  }
  React.useEffect(
    () => {
      loadAvatar();
    },
    [avatar]
  );
  const loadAvatar = async () => {
    await firestore()
      .collection('users')
      .doc(User.getCurrentUser())
      .onSnapshot(doc => {
        setAvatar(doc.data().avatar);
      });
  };
  const InfoView = () => {
    return (
      <View style={styles.title}>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: 'green', fontWeight: 'bold', paddingLeft: 12 }}>
            Thoát
          </Text>
          <Image style={styles.image} source={icons.right} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
          <Image
            style={{ height: 70, width: 70, marginLeft: 50, borderRadius: 35 }}
            source={{
              uri: avatar,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              padding: 10,
            }}
          >
            <Text style={{ color: 'green', fontWeight: 'bold' }}>
              Kính chào quý khách
            </Text>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>
              LU DINH LONG
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const renderItem = (item, index) => {
    return (
      <View key={index} style={styles.cardContainer}>
        <TouchableOpacity
          onPress={() => ClickItem(item.id)}
          style={{ flexDirection: 'row' }}
        >
          <View style={{ flex: 7 }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
              }}
            >
              {item.title}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                height: 30,
                width: 30,
              }}
              source={item.image}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const PersonalView = () => {
    return (
      <View
        style={{
          flex: 3,
          borderWidth: 1,
          borderColor: 'green',
          borderRadius: 10,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            padding: 10,
          }}
        >
          Cá nhân
        </Text>
        <View>
          {PersonalData.map((e, index) => renderItem(e, index))}
        </View>
      </View>
    );
  };
  const AdvanceSettingView = () => {
    return (
      <View
        style={{
          flex: 3,
          borderWidth: 1,
          borderColor: 'green',
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            padding: 10,
          }}
        >
          Cài đặt nâng cao
        </Text>
        <View>
          {AdvancedData.map((e, index) => renderItem(e, index))}
        </View>
      </View>
    );
  };

  return <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InfoView />
        <PersonalView />
        <AdvanceSettingView />
      </ScrollView>
      {showAvatar && <ChangeAvatar HandleAvatar={handleAvatar} closePopup={closePopupAvatar} />}
      {showBackground && <ChangeBackground setBackground={setShowBackground} closePopup={closePopupBackground} />}
      {changePassword && <ChangePassword close={closeChangePassword} />}
      {showSmartOTP && <SmartOTP close={closeSmartOTP} />}
      {otherSetting && <OtherSetting close={closeOtherSetting} />}
    </SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    flex: 2,
    flexDirection: 'column',
  },
  button: {
    height: 30,
    width: 80,
    backgroundColor: '#CCFF99',
    alignItems: 'center',
    marginLeft: 270,
    marginTop: 10,
    borderRadius: 20,
    flexDirection: 'row',
  },
  image: {
    height: 20,
    width: 20,
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingLeft: 10,
    alignItems: 'center',
  },
});
