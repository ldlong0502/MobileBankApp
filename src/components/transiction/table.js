import React, {Component} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Text,
  Button,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { FONTS, icons } from '../../../constants';
import { template } from '@babel/core';
import Icon from 'react-native-vector-icons/Entypo';
function Table () {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      icon: icons.transaction,
      content: 'Chuyển tiền nội bộ LTBB',
    },
    {
      id: 2,
      icon: icons.bank,
      content: 'Chuyển tiền nhanh 247 liên ngân hàng',
    },
    {
      id: 3,
      icon: icons.qr,
      content: 'Thanh toán bằng QR Code',
    },
    {
      id: 4,
      icon: icons.different,
      content: 'Khác',
    },
  ];
  const Click = (item) => {
    if (item === 1) {
      navigation.navigate('InBank');
    } else if (item === 2) {
      navigation.navigate('FastTransition');
    } else if (item === 3) {
      navigation.navigate('Scan');
    }
     else if (item === 4) {
       Alert.alert('Tính năng này đang phát triển');
    }
  };
  const renderData = (item, index) => {
    return <View key={index} style={{height: '15%', borderColor: '#E8E8E8', borderBottomWidth: 10, marginTop: 10 }}>
    <TouchableOpacity  onPress={() => Click(item.id)} style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
    <Image style={{height: 30, width: 30, flex: 1 , marginLeft: 10, tintColor: '#00FF7F'}} source={item.icon} />
    <Text style={{...FONTS.body3, color: 'green', flex: 10, marginLeft: 10}}>{item.content}</Text>
    <Icon name="forward" size={30} style={{color: 'green', marginRight: 10}}/>
    </TouchableOpacity>
    </View>;
  };
    return <View>
        {data.map((e, index) => renderData(e, index))}
      </View>;
}
const styles = StyleSheet.create({
  availableBalance: {
    marginTop: 20,
    display: 'flex',
    height: '90%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    color: '#E9D5CA',
    fontWeight: 'normal',
    fontSize: 16,
  },
  money: {
    color: '#E9D5CA',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    display: 'flex',
    margin: 10,
    backgroundColor: '#A54175',
    height: 100,
    width: 100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    height: '50%',
  },
  text: {
    color: 'white',
  },
});
export default Table;
