import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS, icons, images } from '../../constants';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Searchbar from './SearchBar';
import { useTranslation } from 'react-i18next';
import Data from '../Data/Data';
import HelpFunction from '../../HelpFunction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function Transaction() {
  const { t } = useTranslation();
  const listDate = [
    {
      date: '3/6/2022',
      id: 1,
    },
    {
      date: '2/6/2022',
      id: 2,
    },
  ];
  const listData = [
    {
      time: '17:30',
      purpose: 'Chuyển tiền đến An',
      isIn: false,
      money: HelpFunction.formatMoney(500000),
    },
     {
      time: '10:30',
      purpose: 'Nhận tiền từ Admin',
      isIn: true,
      money: HelpFunction.formatMoney(70000),
    },
  ];

  const renderHeader = () => {
    return <View style={{ flex: 1,backgroundColor: 'white',paddingVertical: 10 ,flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomColor: 'gray', borderBottomWidth: 5}}>
        <Text style={{ fontSize: 18, color: '#000000', alignSelf: 'center', ...FONTS.h3 }}>
          {t('common:titleTransaction')}
        </Text>
      </View>;
  };
  const updateSearch = () => {};
  const renderTransaction = () => {
     const now = new Date(Date.now()).getDate()
                + '/'
                + ( new Date(Date.now()).getMonth() + 1)
                + '/'
                + new Date(Date.now()).getFullYear();
    console.log(now);
    return <View style={{ flex: 30, marginTop: 20, borderTopLeftRadius: 40, borderTopRightRadius: 40, borderWidth: 2, backgroundColor: '#FFFFFF', borderColor: COLORS.transparent }}>
        <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
          <Text style={{ flex: 1, ...FONTS.h4, color: COLORS.purple }}>
            {t('common:transaction')}
          </Text>
        </View>
        <KeyboardAvoidingView>
          <Searchbar updateSearch={updateSearch} />
        </KeyboardAvoidingView>

        <View style={{ flex: 17 }}>

            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
              {listDate.map((item, index) => {
                return <View key={index} style={{ padding: 10, flexDirection: 'column' }}>
                    <Text style={{ ...FONTS.body4 }}>
                      {item.date === now ? t('common:today') : item.date}
                    </Text>
                    <View style={{ margin: 10, flexDirection: 'column' }}>
                      {listData.map((item1, index1) => {
                        return <TouchableOpacity key={index1} style={{ flexDirection: 'row', backgroundColor: '#CCFFFF', marginTop: 10, borderRadius: 40, padding: 20 }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                              <Text style={{ color: '#330066', ...FONTS.h2 }}>
                                {item1.purpose}
                              </Text>
                              <Text>
                                {item1.time}
                              </Text>
                              <Text style={{ color: item1.isIn ? 'orange' : COLORS.red, ...FONTS.body3 }}>
                                {item1.isIn ? '+ ' + item1.money : '- ' + item1.money}
                              </Text>
                            </View>
                            <Image style={{ height: 30, width: 30, alignSelf: 'center' }} source={item1.isIn ? icons.loss : icons.profits} />
                          </TouchableOpacity>;
                      })}
                    </View>
                  </View>;
              })}
            </ScrollView>
        </View>
      </View>;
  };

  return <View style={styles.container}>
      {renderHeader()}
      {renderTransaction()}
    </View>;




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43CD80',
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
