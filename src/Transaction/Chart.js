import { View, Text, Dimensions, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import Data from '../Data/Data';
import HelpFunction from '../../HelpFunction';
export default function Chart({ isAdd }) {
const listMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'];
    const [now, setNow] = useState(new Date());
    const [arrData, setArrData] = useState([]);
    const  getMoneyByMonth = (value) => {
        let money = 0;
        if (isAdd === false){
                    for (var i = 0; i < Data.getTransactionHistory().length; i++) {
                      if (HelpFunction.formatTime(Data.getTransactionHistory()[i].time).getMonth() + 1 === value && Data.getTransactionHistory()[i].isAdd === false) {
                        money += Data.getTransactionHistory()[i].money;
                      }
                    }
        }
        else {
            for (var i = 0; i < Data.getTransactionHistory().length; i++) {
              if (HelpFunction.formatTime(Data.getTransactionHistory()[i].time).getMonth() + 1 === value && Data.getTransactionHistory()[i].isAdd === true) {
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
    useEffect(
      () => {
      },
      []
    );
  return (
    <View style={{height: '30%'}}>
      <LineChart
        data={{
          labels: listMonth,
          datasets: [
            {
              data: listData(),
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={
          220 // from react-native
        }
        onDataPointClick={(data) => {
            if (isAdd){
                Alert.alert( 'You earned this month: +' + HelpFunction.formatMoney(data.value));
            }
            else {
                Alert.alert('You spent this month: -' + HelpFunction.formatMoney(data.value));
            }
        }}
        withHorizontalLabels = {false}
        chartConfig={{
          backgroundGradientFrom: '#43CD80',
          backgroundGradientTo: '#43CD80',
          decimalPlaces: 0,
          color: (opacity = 1) =>
            `rgba(255, 255, 255, ${opacity // optional, defaults to 1 // optional, defaults to 2dp
            })`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 10},
          propsForDots: { r: '6', strokeWidth: '1', stroke: '#ffa726'  },
        }}
        bezier
        style={{ marginVertical: 10, marginLeft: '-5%'}}
      />
    </View>
  );
}
