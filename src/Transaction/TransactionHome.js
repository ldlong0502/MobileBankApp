import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, FONTS, icons, images } from '../../constants';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Searchbar from './SearchBar';
import { useTranslation } from 'react-i18next';
import Data from '../Data/Data';
import HelpFunction from '../../HelpFunction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Chart from './Chart';
import { useIsFocused, useNavigation } from '@react-navigation/native';
export default function Transaction() {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [isAdd, setIsAdd] = useState(true);
  const [listDate, setListDate] = useState([]);
  const [listData, setListData] = useState([]);
  // const renderHeader = () => {
  //   return (
  //     <View
  //       style={{
  //         flex: 2,
  //         backgroundColor: 'white',
  //         paddingVertical: 5,
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         borderBottomColor: 'gray',
  //         borderBottomWidth: 5,
  //       }}
  //     >
  //       <Text
  //         style={{
  //           fontSize: 18,
  //           color: '#000000',
  //           alignSelf: 'center',
  //           ...FONTS.h3,
  //         }}
  //       >
  //         {t('common:titleTransaction')}
  //       </Text>
  //     </View>
  //   );
  // };
  const renderButton = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: '#F0FFF0',
          margin: 20,
          padding: 5,
          borderRadius: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => setIsAdd(!isAdd)}
          style={{
            flex: 1,
            alignSelf: 'center',
            height: '80%',
            marginLeft: '5%',
            borderRadius: 100,
            backgroundColor: isAdd ? '#DCDCDC' : null,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              ...FONTS.body4,
              color: isAdd ? COLORS.purple : COLORS.black,
              fontWeight: 'bold',
            }}
          >
            {t('common:in')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsAdd(!isAdd)}
          style={{
            flex: 1,
            alignSelf: 'center',
            height: '80%',
            marginRight: '5%',
            borderRadius: 10,
            backgroundColor: !isAdd ? '#DCDCDC' : null,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              ...FONTS.body4,
              color: !isAdd ? COLORS.purple : COLORS.black,
              fontWeight: 'bold',
            }}
          >
            {t('common:out')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderStatistic = () => {
    return <Chart isAdd={isAdd} />;
  };

  const RenderTransaction = () => {
    const now =
      String(new Date().getDate()).padStart(2,'0') +
      '/' +
      String((new Date().getMonth() + 1)).padStart(2,'0') +
      '/' +
      new Date().getFullYear();
    return (
      <View
        style={{
          flex: 30,
          marginTop: '20%',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderWidth: 2,
          backgroundColor: '#FFFFFF',
          borderColor: COLORS.transparent,
        }}
      >
        <View style={{ height: '15%', padding: 8 }}>
          <Text style={{ ...FONTS.h4, color: COLORS.purple, marginLeft: 10 }}>
            {t('common:transaction')}
          </Text>
        </View>
        <View style={{ flex: 17 }}>
          <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
            {listDate.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{ padding: 10, flexDirection: 'column' }}
                >
                  <Text style={{ ...FONTS.body4 }}>
                    {item === now ? t('common:today') : item}
                  </Text>
                  <View style={{ margin: 10, flexDirection: 'column' }}>
                    {listData.map((item1, index1) => { return (
                      item1.date === item
                        ? <TouchableOpacity
                            key={index1}
                            style={{
                              flexDirection: 'row',
                              backgroundColor: '#CCFFFF',
                              marginTop: 10,
                              borderRadius: 40,
                              padding: 20,
                            }}
                          >
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                              <Text style={{ color: '#330066', ...FONTS.h2 }}>
                                {item1.title}
                              </Text>
                              <Text>
                                {item1.time}
                              </Text>
                              <Text
                                style={{
                                  color: item1.isAdd ? 'orange' : COLORS.red,
                                  ...FONTS.body3,
                                }}
                              >
                                {item1.isAdd
                                  ? '+ ' + HelpFunction.formatMoney(item1.money)
                                  : '- ' + HelpFunction.formatMoney(item1.money)}
                              </Text>
                            </View>
                            <Image
                              style={{
                                height: 30,
                                width: 30,
                                alignSelf: 'center',
                              }}
                              source={item1.isAdd ? icons.loss : icons.profits}
                            />
                          </TouchableOpacity>
                        : null);
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  };
  useEffect(() => {
    if (isFocused){
    console.log(Data.getTransactionHistory().length);
    let date = [];
    Data.getTransactionHistory().forEach(element => {
      if (!date.includes(element.time.split(' ')[0])) {
        date.push(element.time.split(' ')[0]);
      }
    });
    date.sort((a, b) => {
      if (a < b) {
        return 1;
      } else if (a === b) {
        return 0;
      } else {
        return -1;
      }
    });
    console.log(date);
    setListDate(date);

    let data = [];
    Data.getTransactionHistory().forEach(element => {
      data.push({
        date: element.time.split(' ')[0],
        time: element.time.split(' ')[1],
        title: element.title,
        isAdd: element.isAdd,
        money: element.money,
      });
    });
    data.sort((a, b) => {
      if (a.time < b.time) {
        return 1;
      } else if (a.time === b.time) {
        return 0;
      } else {
        return -1;
      }
    });
    console.log(data);
    setListData(data);
  }
  }, [isFocused]);
  return (
    <View style={styles.container}>

      {renderButton()}
      {renderStatistic()}
      {RenderTransaction()}
    </View>
  );
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
