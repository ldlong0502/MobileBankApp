import React, { useEffect } from 'react';
import {View, Text, Image} from 'react-native';
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
import Scan from '../components/transiction/qrcode';
import {icons} from '../../constants';
import { useTranslation } from 'react-i18next';
import Data from '../Data/Data';
import Pinui from '../components/transiction/pinui';
import firestore from '@react-native-firebase/firestore';
const Tab = createBottomTabNavigator();

function MyTabs() {
  const {t} = useTranslation();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image source={icons.home} style={{height: 30, width: 30}} />
          ),
          title: t('common:home'),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PhonePayment}
        options={{
          tabBarIcon: () => (
            <Image source={icons.payment} style={{height: 30, width: 30}} />
          ),
          title: t('common:payment'),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarIcon: () => (
            <Image source={icons.transaction} style={{height: 30, width: 30}} />
          ),
          title: t('common:transfer'),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => (
            <Image source={icons.setting} style={{height: 30, width: 30}} />
          ),
          title: t('common:setting'),
        }}
      />
    </Tab.Navigator>
  );
}
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen  screenOptions={{headerShown:false}} name="SignIn" component={SignInScreen} />
        <Stack.Screen  screenOptions={{headerShown:false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen  screenOptions={{headerShown:false}} name="ConfirmPhone" component={ConfirmPhoneScreen} />
        <Stack.Screen  screenOptions={{headerShown:false}} name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen  screenOptions={{headerShown:false}} name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen
          name="transfer"
          options={{
            title: 'Chuyển tiền',
            headerStyle: {
              backgroundColor: '#A54175',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Table}
        />
        <Stack.Screen
          name="Scan"
          
          options={{
            title: 'Scan',
            headerStyle: {
              backgroundColor: '#A54175',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Scan}
        />
        <Stack.Screen
        screenOptions={{headerShown:true}}
          name="InBank"
          options={{
            title: 'Chuyển tiền trong VCB',
            headerStyle: {
              backgroundColor: '#A54175',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={InBank}
        />
         <Stack.Screen
        screenOptions={{headerShown:true}}
          name="pin"
          options={{
            title: 'Pin Confirm',
            headerStyle: {
              backgroundColor: '#A54175',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Pinui}
        />
        <Stack.Screen
          name="FastTransition"
          options={{
            title: 'Chuyển tiền nhanh 24/7 ngoài VCB',
            headerStyle: {
              backgroundColor: '#A54175',
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
              backgroundColor: '#A54175',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={ConfirmScreen}
        />
        <Stack.Screen  screenOptions={{headerShown:false}}name="Home" component={HomeScreen} />
        <Stack.Screen  screenOptions={{headerShown:false}} name="BottomTabs" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
