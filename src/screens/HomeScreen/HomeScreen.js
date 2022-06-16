import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import { COLORS, SIZES, FONTS, icons, images } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Data from '../../Data/Data';
import NotificationService from '../../../NotificationService';
import { usesAutoDateAndTime } from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const featuresData = [
    {
      id: 1,
      icon: icons.reload,
      color: COLORS.purple,
      backgroundColor: COLORS.lightpurple,
      description: t('common:recharge'),
    },
    {
      id: 2,
      icon: icons.send,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightyellow,
      description: t('common:transfer'),
    },
    {
      id: 3,
      icon: icons.scan,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: t('common:scan'),
    },
    {
      id: 4,
      icon: icons.wallet,
      color: COLORS.red,
      backgroundColor: COLORS.lightRed,
      description: t('common:wallet'),
    },
    {
      id: 5,
      icon: icons.bill,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightyellow,
      description: t('common:bill_Payment'),
    },
    {
      id: 6,
      icon: icons.internet,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: t('common:internet_Payment'),
    },
    {
      id: 7,
      icon: icons.phone,
      color: COLORS.red,
      backgroundColor: COLORS.lightRed,
      description: t('common:phone_Payment'),
    },
    {
      id: 8,
      icon: icons.more,
      color: COLORS.purple,
      backgroundColor: COLORS.lightpurple,
      description: t('common:more'),
    },
  ];
  const specialPromoData = [
    {
      id: 1,
      img: images.promoBanner,
      title: 'Bonus Cashback1',
      description: "Don't miss it. Grab it now!",
    },
    {
      id: 2,
      img: images.promoBanner,
      title: 'Bonus Cashback2',
      description: "Don't miss it. Grab it now!",
    },
    {
      id: 3,
      img: images.promoBanner,
      title: 'Bonus Cashback3',
      description: "Don't miss it. Grab it now!",
    },
    {
      id: 4,
      img: images.promoBanner,
      title: 'Bonus Cashback4',
      description: "Don't miss it. Grab it now!",
    },
  ];

  const [features, setFeatures] = React.useState(featuresData);
  const [specialPromos, setSpecialPromos] = React.useState(specialPromoData);
  const getCurrentDate = () => {
     var date = new Date().getDate(); //Current Date
     var month = new Date().getMonth() + 1; //Current Month
     var year = new Date().getFullYear(); //Current Year
     var hours = new Date().getHours(); //Current Hours
     var min = new Date().getMinutes(); //Current Minutes
     var sec = new Date().getSeconds();
     return  date + '/' + month + '/' + year
      + ' ' + hours + ':' + min + ':' + sec;
  };
  useEffect(()=>{
     firestore().collection('users')
    .where('phone', '==', Data.getDataUser.phone)
    .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {

      if (change.type === 'added') {
        console.log('New user: ', change.doc.data());
      }
      if (change.type === 'modified') {
        if (change.doc.data().surplus === Data.getDataUser.surplus) {
          Data.getDataUser = change.doc.data();
          return;
        }
        console.log('Modified user: ', change.doc.data());
        let body = '';
        if (change.doc.data().surplus > Data.getDataUser.surplus){
          body = 'Tài khoản' + Data.getDataUser.bankID + ' tại LLTB +' +
          (change.doc.data().surplus -  Data.getDataUser.surplus) +
          ' VNĐ vào lúc ' + getCurrentDate() +
          '. Số dư: ' + change.doc.data().surplus + ' VNĐ';
        }
        else {
          body = 'Tài khoản' + Data.getDataUser.bankID + ' tại LLTB -' +
          (change.doc.data().surplus -  Data.getDataUser.surplus) +
          ' VNĐ vào lúc ' + getCurrentDate() +
          '. Số dư: ' + change.doc.data().surplus + ' VNĐ';
        }
        Data.getDataUser.surplus = change.doc.data().surplus;
        let value = {
          body: body,
          title: 'Thanh toán',
          token: Data.getTokenDeviceID,
        };
        console.log(value);
        NotificationService.sendSingleDeviceNotification(value);
        LogBox.ignoreLogs(['Require cycle:']);
      }
      if (change.type === 'removed') {
        console.log('Removed user: ', change.doc.data());
      }
    });
  });
  },[]);
  function renderHeader() {
    return (
      <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 2 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h1 }}>
            {t('common:titleHome')}
          </Text>
          <Text style={{ ...FONTS.body2, color: COLORS.gray }}>
            {t('common:appName')}
          </Text>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.lightGray,
            }}
          >
            <Image
              source={icons.bell}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.secondary,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                height: 10,
                width: 10,
                backgroundColor: COLORS.red,
                borderRadius: 5,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderBanner() {
    return (
      <View
        style={{
          height: 220,
          borderRadius: 20,
        }}
      >
        <Image
          source={images.banner}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
          }}
        />
      </View>
    );
  }

  function renderFeatures() {
    const Header = () =>
      <View style={{ marginBottom: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h3 }}>
          {t('common:feature')}
        </Text>
      </View>;

    const renderItem = ({ item }) =>
      <TouchableOpacity
        style={{
          marginBottom: SIZES.padding * 2,
          width: 60,
          alignItems: 'center',
        }}
        onPress={() => {
          console.log(item.description);
          navigation.navigate(item.description);
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            marginBottom: 5,
            borderRadius: 20,
            backgroundColor: item.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              height: 20,
              width: 20,
              tintColor: item.color,
            }}
          />
        </View>
        <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>
          {item.description}
        </Text>
      </TouchableOpacity>;
    return (
      <FlatList
        ListHeaderComponent={Header}
        data={features}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        style={{ marginTop: SIZES.padding * 2 }}
      />
    );
  }

  function renderPromos() {
    const HeaderComponent = () =>
      <View>
        {renderHeader()}
        {renderBanner()}
        {renderFeatures()}
        {renderPromoHeader()}
      </View>;

    const renderPromoHeader = () =>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: SIZES.padding,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h3 }}>Special Promos</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('View All')}>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
        </TouchableOpacity>
      </View>;

    const renderItem = ({ item }) =>
      <TouchableOpacity
        style={{
          marginVertical: SIZES.base,
          width: SIZES.width / 2.5,
        }}
        onPress={() => console.log(item.title)}
      >
        <View
          style={{
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
          }}
        >
          <Image
            source={images.promoBanner}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </View>

        <View
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.lightGray,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>
            {item.title}
          </Text>
          <Text style={{ ...FONTS.body4 }}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>;

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={specialPromos}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ marginBottom: 80 }} />}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderPromos()}
    </SafeAreaView>
  );
};
export default HomeScreen;
