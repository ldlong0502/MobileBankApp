import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import ChangeAvatar from './ChangeAvatar';
import ChangeBackground from './ChangeBackground';
import ChangePassword from './ChangePassword';
import { COLORS, SIZES, FONTS, icons, images } from '../../constants';
import SmartOTP from './SmartOTP';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Data from '../Data/Data';
import OtherSetting from './OtherSetting';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export default function Setting() {
  const [showAvatar, setShowAvatar] = React.useState(false);
  const [showBackground, setShowBackground] = React.useState(false);
  const [showSmartOTP, setShowSmartOTP] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);
  const [otherSetting, setOtherSetting] = React.useState(false);
  const [transferred, setTransferred] = React.useState(0);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [avatar, setAvatar] = React.useState(Data.getDataUser.avatar);
  const PersonalData = [
    { id: 1, title: t('common:changeAvatar'), image: icons.avatar },
    { id: 2, title: t('common:changeBackground'), image: icons.image },
  ];
  const AdvancedData = [
    { id: 3, title: t('common:smartOTP'), image: icons.otp },
    { id: 4, title: t('common:phoneBook'), image: icons.phonebook },
    { id: 5, title: t('common:paymentForm'), image: icons.bill },
    { id: 6, title: t('common:changePassword'), image: icons.password },
    { id: 7, title: t('common:otherSetting'), image: icons.setting },
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
      await firestore().collection('users').doc(Data.getDataUser.id).update({
      avatar: url,
    });
    } catch (e) {
      console.error(e);
    }
  };
  const handleBackground = async fileStr => {
    const filename = String(fileStr).substring(String(fileStr).lastIndexOf('/') + 1);
    const task = storage().ref('/background/' + filename).putFile(fileStr);
    setTransferred(0);
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
      const url = await storage().ref('/background/' + filename).getDownloadURL();
      console.log(Data.getDataUser.id);
      await firestore().collection('users').doc(Data.getDataUser.id).update({
      background: url,
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
  };
  const InfoView = () => {
    return (
      <View style={styles.title}>
        <TouchableOpacity onPress={()=> {
          navigation.navigate('SignIn');
          Alert.alert('Log out successfully!!!');
        }} style={styles.button}>
          <Text style={{ color: 'green', fontWeight: 'bold', paddingLeft: 12 }}>
            {t('common:exit')}
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
              {t('common:welcome')}
            </Text>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>
              {Data.getDataUser.name.toUpperCase()}
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
          {t('common:personal')}
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
          {t('common:advancedSetting')}
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
      {showBackground && <ChangeBackground handleBackground={handleBackground} closePopup={closePopupBackground} />}
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
    marginLeft: '20%',
  },
  cardContainer: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingLeft: 10,
    alignItems: 'center',
  },
});
