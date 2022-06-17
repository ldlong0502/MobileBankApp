import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  LogBox,
  ImageBackground,
  Alert,
} from 'react-native';
import { COLORS, SIZES, FONTS, icons, images } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Data from '../../Data/Data';
import NotificationService from '../../../NotificationService';
import { usesAutoDateAndTime } from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HelpFunction from '../../../HelpFunction';
import Clipboard from '@react-native-clipboard/clipboard';
import { useIsFocused } from '@react-navigation/native';
const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [see, setSee] = useState();
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
      icon: icons.phone,
      color: COLORS.red,
      backgroundColor: COLORS.lightRed,
      description: t('common:phone_Payment'),
    },
    {
      id: 7,
      icon: icons.transaction,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: t('common:transaction'),
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
      img: 'https://img.freepik.com/free-vector/realistic-cooked-chicken-plate-white-background-vector_532963-1938.jpg?w=2000',
      title: t('common:food'),
      description: t('common:foodBody'),
    },
    {
      id: 2,
      img: 'https://brouwhoeve.es/wp-content/uploads/2022/02/istockphoto-1128262881-612x612-1.jpg',
      title: t('common:gift'),
      description: t('common:giftBody'),
    },
    {
      id: 3,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNxDLP_Jl5zuiDIHqUSkbeRV7RhRbxDSQvyg&usqp=CAU',
      title: t('common:hotel'),
      description: t('common:hotelBody'),
    },
    {
      id: 4,
      img: 'https://img.freepik.com/free-vector/gold-coin-with-dollar-sign-white-background_149267-970.jpg?w=2000',
      title: t('common:invest'),
      description: t('common:investBody'),
    },
  ];

  const [features, setFeatures] = React.useState(featuresData);
  const [specialPromos, setSpecialPromos] = React.useState(specialPromoData);
  const [surplus, SetSurPlus] = React.useState(Data.getDataUser.surplus);
  const [background, SetBackground] = React.useState(Data.getDataUser.background);
  const isFocused = useIsFocused();

  useEffect(()=>{
    if (!isFocused){
      return;
    }
    setSee(false);
     firestore().collection('users')
    .where('phone', '==', Data.getDataUser.phone)
    .onSnapshot(querySnapshot => {
    console.log(querySnapshot.docChanges().length);
    querySnapshot.docChanges().forEach(change => {

      if (change.type === 'added') {
        console.log('New user: ', change.doc.data());
        SetSurPlus(change.doc.data().surplus);
        SetBackground(change.doc.data().background);
      }
      if (change.type === 'modified') {
        if (change.doc.data().surplus === Data.getDataUser.surplus) {
          var temp = Data.getDataUser.id;
          Data.getDataUser = change.doc.data();
          Data.getDataUser.id = temp;
          return;
        }
        console.log('Modified user: ', change.doc.data());
        let body = '';
        if (change.doc.data().surplus > Data.getDataUser.surplus){
          body = 'Tài khoản ' + Data.getDataUser.bankID + ' tại LLTB +' +
          (change.doc.data().surplus -  Data.getDataUser.surplus) +
          ' VNĐ vào lúc ' + HelpFunction.getCurrentDate() +
          '. Số dư: ' + change.doc.data().surplus + ' VNĐ';
        }
        else {
          body = 'Tài khoản ' + Data.getDataUser.bankID + ' tại LLTB ' +
          (change.doc.data().surplus -  Data.getDataUser.surplus) +
          ' VNĐ vào lúc ' + HelpFunction.getCurrentDate() +
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
        SetSurPlus(Data.getDataUser.surplus);
        LogBox.ignoreLogs(['Require cycle:']);
      }
      if (change.type === 'removed') {
        console.log('Removed user: ', change.doc.data());
      }
    });
  });
 HelpFunction.getListTransaction();
  },[isFocused]);
  function renderHeader() {
    return (
      <View style={{ flexDirection: 'row', marginVertical: '10%', paddingHorizontal: SIZES.padding * 3 }}>
        <View style={{ flex: 1 }}>
          <View style={{flexDirection: 'row'}}>
                   <Text style={{ ...FONTS.h1, color:'white' }}>
            {t('common:titleHome')}
          </Text>
        </View>
        <View style={{height: 200, width: 250 , alignSelf: 'center'}}/>
        </View>
      </View>
    );
  }

  function renderBanner() {
    console.log(Data.getDataUser.bankID);
    return <View style={{ height: 220, borderRadius: 20, backgroundColor: '#7CFC00', marginHorizontal: SIZES.padding * 3 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', margin: 20, ...FONTS.body2 }}>
          {t('common:accountInformation')}
          </Text>
          <View style={{flex:1}} />
          <Image style={{height: 40, width: 40, marginTop: 5, marginRight: '10%', alignSelf: 'center'}} source={icons.threecircle} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1 ,color: 'white', margin: 15, ...FONTS.body2 }}>
            {t('common:numAccount')}: {Data.getDataUser.bankID}
          </Text>
          <TouchableOpacity onPress={() => Clipboard.setString(Data.getDataUser.bankID)} style={{ alignSelf: 'center' }}>
            <Image source={icons.copy} style={{ flex: 0,height: 20, width: 20, marginRight:20, tintColor: 'black'}}  />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{ flex: 1,color: 'white', margin: 20, ...FONTS.body2 }}>
          {t('common:surplus')}:  {see ? HelpFunction.formatMoney(surplus) : 'xxxxxxxxx VNĐ'}
        </Text>
        <TouchableOpacity onPress={() => setSee(!see)} style={{ alignSelf: 'center' }}>
            <Image source={see ? icons.eye : icons.disable_eye} style={{ flex: 0,height: 20, width: 20, marginRight:20, tintColor: 'black'}}  />
        </TouchableOpacity>
        </View>
      </View>;
  }
  const handleNavigateFeatures = (id) => {
    if (id === 1) {
      navigation.navigate('Payment');
    }
    else if (id === 2) {
      navigation.navigate('transfer');
    }
     else if (id === 3) {
      navigation.navigate('Scan');
    }
    else if (id === 4) {
      navigation.navigate('Scan');
    }
    else if (id === 5) {
      navigation.navigate('Bill');
    }
    else if (id === 6) {
      navigation.navigate('Payment');
    }
    else if (id === 7) {
      navigation.navigate('Transaction');
    }
    else {
      Alert.alert('Các tính năng khác đang phát triển');
    }
  };
  function renderFeatures() {
    const Header = () =>
      <View style={{ marginBottom: SIZES.padding * 2, paddingHorizontal: SIZES.padding * 3 }}>
        <Text style={{ ...FONTS.h3 }}>
          {t('common:feature')}
        </Text>
      </View>;

    const renderItem = ({ item }) =>
      <TouchableOpacity
        style={{
          width: 60,
          alignItems: 'center',
          marginHorizontal: SIZES.padding * 2,
        }}
        onPress={() => handleNavigateFeatures(item.id)}

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
        style={{ marginTop: SIZES.padding * 2 , marginBottom: SIZES.padding * 2 }}
      />
    );
  }

   function renderPromos() {
    const HeaderComponent = () => (
      <View>
        <ImageBackground
          resizeMode={'stretch'}
          style={{height: '80%', flex: 1}}
          source={{uri: background === '' ? null : background}}>
          {renderHeader()}
          {renderBanner()}
        </ImageBackground>
        {renderFeatures()}
        {renderPromoHeader()}
      </View>
    );

    const renderPromoHeader = () => (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding * 3,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h3}}>{t('common:service')}</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('View All')}>
          <Text style={{color: COLORS.gray, ...FONTS.body4}}>{t('common:viewAll')}</Text>
        </TouchableOpacity>
      </View>
    );

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          marginVertical: SIZES.base,
          width: SIZES.width / 2.5,
          marginHorizontal: SIZES.padding * 2,
        }}
        onPress={() => Alert.alert('Tính năng này đang phát triển')}>
        <View
          style={{
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{
              uri: item.img,
            }}
            resizeMode="cover"
            style={{
              width: 80,
              height: 80,
            
            }}
          />
        </View>

        <View
          style={{
            paddingVertical: SIZES.padding,
            backgroundColor: '#3CB371',
            borderRadius:4,
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
         
          }}>
          <Text style={{...FONTS.h4,color: 'white'}}>{item.title}</Text>
          <Text style={{...FONTS.body4,color: 'white'}}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={specialPromos}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{marginBottom: 80}} />}
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
