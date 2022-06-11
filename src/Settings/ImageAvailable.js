import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, FONTS, icons, images, SIZES, theme } from '../../constants';
import { useTranslation } from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadOptions } from '@babel/core';
import Data from '../Data/Data';
export default function ImageAvailable({ close }) {
  const { t } = useTranslation();
  const [indexBackground, setIndexBackground] = React.useState(1);
  const [listBackground, setListBackground] = React.useState([
    { id: 1, source: images.bg1 , uri: 'https://firebasestorage.googleapis.com/v0/b/bankapp-4377c.appspot.com/o/background%2Fbg1.jpg?alt=media&token=bf96715f-5073-4761-a410-83c94b052705' },
    { id: 2, source: images.bg2 , uri: 'https://firebasestorage.googleapis.com/v0/b/bankapp-4377c.appspot.com/o/background%2Fbk2.jpg?alt=media&token=f230f506-304f-43de-a984-991c3816d83b'},
    { id: 3, source: images.bg3 , uri: 'https://firebasestorage.googleapis.com/v0/b/bankapp-4377c.appspot.com/o/background%2Fbk3.jpg?alt=media&token=3e237dd5-8e2d-4d49-9a15-dbc83f24bbf5'},
    { id: 4, source: images.bg4 , uri: 'https://firebasestorage.googleapis.com/v0/b/bankapp-4377c.appspot.com/o/background%2Fbk4.jpg?alt=media&token=0df29fcc-e057-4888-bbfb-95493ababeb9'},
    { id: 5, source: images.bg5 , uri: 'https://firebasestorage.googleapis.com/v0/b/bankapp-4377c.appspot.com/o/background%2Fbk5.jpg?alt=media&token=665e3362-d064-45ec-bf26-eaf4fc6d64cb'},
    { id: 6, source: images.bg6 , uri: 'https://firebasestorage.googleapis.com/v0/b/bankapp-4377c.appspot.com/o/background%2Fbk6.jpg?alt=media&token=440b9857-e764-4d99-a404-309151d2993b'},
  ]);
  const storageIndexBackground = async index => {
    try {
      await AsyncStorage.setItem('indexImageBackground', index);
    } catch (error) {
      // Error saving data
    }
  };
  const getIndexBackground = async () => {
    try {
      const index = await AsyncStorage.getItem('indexImageBackground');
      if (index !== null) {
        setIndexBackground(Number(index));
      } else {
        setIndexBackground(1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: SIZES.padding - 5,
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
          {t('common:chooseBackGround')}
        </Text>
        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 80 }}>
          <Image style={{ height: 25, width: 25 }} source={icons.home} />
        </TouchableOpacity>
      </View>
    );
  };
  const handleChangeBackground = item => {
    storageIndexBackground(String(item.id));
    let element = [...listBackground];
    element[indexBackground - 1].isChoose = false;
    setListBackground(Array.from(element));
    setIndexBackground(item.id);
    let element1 = [...listBackground];
    element1[item.id - 1].isChoose = true;
    setListBackground(Array.from(element1));
  };

  useEffect(
    () => {
      getIndexBackground();
    },[indexBackground, listBackground]);

  const saveBackground = async () => {
    try {
      await firestore().collection('users').doc(Data.getDataUser.id).update({

      background: listBackground[indexBackground - 1].uri,
    });
    } catch (e) {
      console.error(e);
    }
  close();
  };
  const renderBackground = () => {
    return (
      <View
        style={{
          height: '50%',
          width: '100%',
          alignSelf: 'flex-end',
          backgroundColor: COLORS.white,
          borderColor: 'white',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          borderWidth: 2,
        }}
      >
        <View
          style={{
            flex: 1,
            marginTop: 20,
            alignItems: 'center',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {listBackground.map((item, index) => {
            return (
              item.id <= 3 &&
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeBackground(item)}
              >
                <ImageBackground
                  style={{
                    width: 90,
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  source={item.source}
                >
                  {item.source === listBackground[indexBackground - 1].source
                    ? <Image
                        style={{
                          height: 30,
                          width: 30,
                          alignSelf: 'center',
                        }}
                        source={icons.tickwhite}
                      />
                    : null}
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            alignItems: 'center',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {listBackground.map((item, index) => {
            return (
              item.id > 3 &&
              item.id <= 6 &&
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeBackground(item)}
              >
                <ImageBackground
                  style={{
                    width: 90,
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  source={item.source}
                >
                  {item.source === listBackground[indexBackground - 1].source
                    ? <Image
                        style={{
                          height: 30,
                          width: 30,
                          alignSelf: 'center',
                        }}
                        source={icons.tickwhite}
                      />
                    : null}
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <TouchableOpacity
            onPress={() => saveBackground()}
            style={{
              backgroundColor: COLORS.purple,
              width: '40%',
              alignItems: 'center',
              borderRadius: 20,
            }}
          >
            <Text style={{ ...FONTS.body2, color: 'white' }}>
              {t('common:save')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={true}
      onRequestClose={close}
    >
      <View style={styles.container}>
        {renderHeader()}
        <ImageBackground
          source={listBackground[indexBackground - 1].source}
          resizeMode="cover"
          style={styles.image}
        >
          {renderBackground()}
        </ImageBackground>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    height: '70%',
  },
});
