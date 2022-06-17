import {View, Text, Dimensions, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import Data from '../Data/Data';
import HelpFunction from '../../HelpFunction';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants';
export default function Chart({isAdd}) {
  const listMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const {t} = useTranslation();
  const getMoneyByMonth = value => {
    let money = 0;
    if (isAdd === false) {
      for (var i = 0; i < Data.getTransactionHistory().length; i++) {
        if (
          HelpFunction.formatTime(
            Data.getTransactionHistory()[i].time,
          ).getMonth() +
            1 ===
            value &&
          Data.getTransactionHistory()[i].isAdd === false
        ) {
          money += Data.getTransactionHistory()[i].money;
        }
      }
    } else {
      for (var i = 0; i < Data.getTransactionHistory().length; i++) {
        if (
          HelpFunction.formatTime(
            Data.getTransactionHistory()[i].time,
          ).getMonth() +
            1 ===
            value &&
          Data.getTransactionHistory()[i].isAdd === true
        ) {
          money += Data.getTransactionHistory()[i].money;
        }
      }
    }
    return money;
  };
  const listData = () => {
    let list = [];
    for (var i = 0; i < 12; i++) {
      list.push(getMoneyByMonth(i + 1));
    }
    return list;
  };
  useEffect(() => {}, []);
  return (
    <View style={{height: '30%',backgroundColor:'#47B5FF',width: '100%'}}>
      <Text style={{alignSelf: 'center', ...FONTS.body2, color: 'white'}}>
        {t('common:total')}:{' '}
        {HelpFunction.formatMoney(listData()[new Date().getMonth()])}
      </Text>
      <LineChart
        data={{
          labels: listMonth,
          datasets: [
            {
              data: listData(),
            },
          ],
        }}
        width={Dimensions.get('window').width+20}
        height={
          220 // from react-native
        }
        onDataPointClick={data => {
          if (isAdd) {
            Alert.alert(
              t('common:inAlert') + '+' + HelpFunction.formatMoney(data.value),
            );
          } else {
            Alert.alert(
              t('common:inAlert') + '-' + HelpFunction.formatMoney(data.value),
            );
          }
        }}
        withHorizontalLabels={false}
        chartConfig={{
          backgroundGradientFrom: '#1363DF',
          backgroundGradientTo: '#06283D',
          decimalPlaces: 0,
          color: (opacity = 1) =>
            `rgba(255, 255, 255, ${
              opacity // optional, defaults to 1 // optional, defaults to 2dp
            })`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {borderRadius: 10},
          propsForDots: {r: '6', strokeWidth: '1', stroke: '#ffa726'},
        }}
        bezier
        style={{marginVertical: 10, marginLeft: '-5%'}}
      />
    </View>
  );
}
