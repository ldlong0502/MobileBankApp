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
import { COLORS, SIZES, FONTS, icons, images } from '../../constants';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Searchbar from './SearchBar';
import { useTranslation } from 'react-i18next';
import Data from '../Data/Data';

export default function Transaction() {
  const { t } = useTranslation();
  const formatMoney = value => {
    return (value.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')).split('.')[0] + ' VNĐ';
  };
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
      money: formatMoney(500000),
    },
     {
      time: '10:30',
      purpose: 'Nhận tiền từ Admin',
      isIn: true,
      money: formatMoney(70000),
    },
  ];

  const renderHeader = () => {
    return <View style={{ flex: 1, flexDirection: 'row', marginTop: SIZES.padding - 5 }}>
        <TouchableOpacity style={{ flex: 1, alignSelf: 'center', paddingLeft: 5 }}>
          <Image style={{ height: 30, width: 30 }} source={icons.back} />
        </TouchableOpacity>
        <Text style={{ flex: 7, fontSize: 18, color: '#FFFFFF', alignSelf: 'center', marginLeft: 80, ...FONTS.h3 }}>
          {t('common:titleTransaction')}
        </Text>
        <TouchableOpacity  style={{ flex: 1, alignSelf: 'center' }}>
          <Image style={{ height: 25, width: 25 }} source={icons.home} />
        </TouchableOpacity>
      </View>;
  };
  const renderCurrentMoney = () => {
    return <View style={{
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
     }}>
        <Text style={{
            ...FONTS.body2,
            color: COLORS.white,
        }}> {t('common:surplus')}</Text>
        <Text style={{
            ...FONTS.body1,
            color: COLORS.white,
        }}>{formatMoney(Data.getDataUser.surplus)}</Text>
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
    return <View style={{
        flex: 14,
        marginTop: 10,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
        borderColor: COLORS.transparent }}>
        <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
            <Text style={{flex: 1,...FONTS.h4, color: COLORS.purple}}> {t('common:transaction')}</Text>
            <Text style={{...FONTS.h5, color: COLORS.purple}}> {t('common:sort')}</Text>
        </View>
        <Searchbar updateSearch={updateSearch} style={{flex: 3}} />
        <View style={{flex: 17}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          { listDate.map((item,index) => {
             return (
             <View key={index} style={{ padding: 10, flexDirection: 'column' }} >
                 <Text style={{...FONTS.body4}}>{item.date === now ?  t('common:today') : item.date}</Text>
                 <View style={{margin: 10, flexDirection: 'column'}}>
                  {listData.map((item1, index1) => {
                    return <TouchableOpacity key= {index1}
                    style={{ flexDirection: 'row',
                            backgroundColor: '#CCFFFF',
                            marginTop: 10,
                            borderRadius: 40,
                            padding: 20,
                          }}>
                       <View style={{flexDirection: 'column' , flex: 1}}>
                         <Text style={{
                           color: '#330066',
                           ...FONTS.h2,
                         }}>
                          {item1.purpose}
                        </Text>
                        <Text>
                          {item1.time}
                        </Text>
                        <Text style={{
                          color: item1.isIn ? 'orange' : COLORS.red,
                          ...FONTS.body3,
                        }}>
                          {item1.isIn ? '+ ' + item1.money : '- ' + item1.money}
                        </Text>
                       </View>
                       <Image
                       style ={{height: 30, width: 30, alignSelf: 'center'}}
                       source={item1.isIn ? icons.loss : icons.profits} />
                      </TouchableOpacity>;
                  })}
                 </View>
             </View>
            );
          })
          }
          </ScrollView>
        </View>
      </View>;
  };

  return <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderCurrentMoney()}
      {renderTransaction()}
    </SafeAreaView>;
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
