import React, { useEffect } from 'react';
import {View, Text, Image, KeyboardAvoidingView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Table from '../components/transiction/table';
import InBank from '../components/transiction/traninbank';
import FastTransition from '../components/transiction/247tran';
import ConfirmScreen from '../components/transiction/confirm';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmPhoneScreen from '../screens/ConfirmPhoneScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../Settings/Setting';
import Transaction from '../Transaction/TransactionHome.js';
import PhonePayment from '../../Extension/Screens/Phonepayment';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {icons} from '../../constants';
import { useTranslation } from 'react-i18next';
import Data from '../Data/Data';
import firestore from '@react-native-firebase/firestore';
const Tab = createBottomTabNavigator();

function MyTabs() {
  const {t} = useTranslation();
  return <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Image source={icons.home} style={{ height: 30, width: 30 }} />, title: t("common:home") }} />
        <Tab.Screen name="Payment" component={PhonePayment} options={{ tabBarIcon: () => <Image source={icons.payment} style={{ height: 30, width: 30 }} />, title: t("common:payment") }} />
        <Tab.Screen name="Transaction" component={Transaction} options={{ tabBarIcon: () => <Image source={icons.transaction} style={{ height: 30, width: 30 }} />, title: t("common:transaction") }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: () => <Image source={icons.setting} style={{ height: 30, width: 30 }} />, title: t("common:setting") }} />
      </Tab.Navigator>;

}
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmPhone" component={ConfirmPhoneScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen
          name="tai"
          options={{title: 'VCB digital'}}
          component={Table}
        />
        <Stack.Screen
          name="InBank"
          options={{
            title: 'Chuyển tiền trong VCB',
            headerStyle: {
              backgroundColor: '#72B33F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={InBank}
        />
        <Stack.Screen
          name="FastTransition"
          options={{
            title: 'Chuyển tiền nhanh 24/7 ngoài VCB',
            headerStyle: {
              backgroundColor: '#72B33F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={FastTransition}
        />
        <Stack.Screen
          name="ConfirmScreen"
          options={{
            title: 'Xác nhận thông tin',
            headerStyle: {
              backgroundColor: '#72B33F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={ConfirmScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BottomTabs" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
