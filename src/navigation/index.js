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
import Bill from '../../Extension/Screens/Bill';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Scan from '../components/transiction/qrcode';
import {icons} from '../../constants';
import { useTranslation } from 'react-i18next';
import Data from '../Data/Data';
import firestore from '@react-native-firebase/firestore';
import HelpFunction from '../../HelpFunction';
import Pinui from '../components/transiction/pinui';
import ConfirmPin from '../Settings/ConfirmPin';
import ConfirmPhoneAgain from '../Settings/ConfirmCodeAgain';
import Privacy from '../Settings/Privacy';
import ContactUs from '../Settings/ContactUs';
const Tab = createBottomTabNavigator(

);

function MyTabs() {
  const {t} = useTranslation();
  return <Tab.Navigator screenOptions={{ headerShown: false}} >
        <Tab.Screen  name="Home" component={HomeScreen} options={{tabBarIcon: () => <Image source={icons.home} style={{ height: 30, width: 30 }} />, title: t('common:home')}} />
        <Tab.Screen  name="transfer" component={Table} options={{ headerShown: true,
            headerStyle: {
              backgroundColor: '#43CD80',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },tabBarIcon: () => <Image source={icons.payment} style={{ height: 30, width: 30 }} />, title: t('common:transfer') }} />
        <Tab.Screen name="Transaction" component={Transaction} options={{headerStyle: {
              backgroundColor: '#43CD80',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf:'center',
              justifyContent: 'center',
            } ,headerShown: true, tabBarIcon: () => <Image source={icons.transaction} style={{ height: 30, width: 30 }} />, title: t('common:titleTransaction')  }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: () => <Image source={icons.setting} style={{ height: 30, width: 30 }} />, title: t('common:setting') }} />
      </Tab.Navigator>;

}
const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen  name="SignIn" component={SignInScreen} />
        <Stack.Screen  name="SignUp" component={SignUpScreen} />
        <Stack.Screen  name="ConfirmPhone" component={ConfirmPhoneScreen} />
        <Stack.Screen  name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen  name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen
          name="transfer"
          options={{
            headerShown: true,
            title: t('common:transfer'),
            headerStyle: {
              backgroundColor: '#43CD80',
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
            headerShown: true,
            title: 'Scan',
            headerStyle: {
              backgroundColor: '#43CD80',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Scan}
        />
        <Stack.Screen
          name="InBank"
          options={{
            headerShown:true,
            title: 'Chuyển tiền nội bộ LTBB',
            headerStyle: {
              backgroundColor: '#43CD80',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={InBank}
        />
         <Stack.Screen
          name="pin"
          options={{
            title: 'Pin Confirm',
            headerShown:true,
            headerStyle: {
              backgroundColor: '#43CD80',
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
            headerShown:true,
            title: 'Chuyển tiền nhanh 24/7 ngoài VCB',
            headerStyle: {
              backgroundColor: '#43CD80',
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
            headerShown:true,
            title: 'Xác nhận thông tin',
            headerStyle: {
              backgroundColor: '#43CD80',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={ConfirmScreen}
        />
        <Stack.Screen  name="Home" component={HomeScreen} />
        <Stack.Screen name="BottomTabs" component={MyTabs} />
        <Stack.Screen  options={{
            headerShown:true,
            title: t('common:titleTransaction'),
            headerStyle: {
              backgroundColor: '#43CD80',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}name="Transaction" component={Transaction} />
        <Stack.Screen name="Payment" component={PhonePayment} />
        <Stack.Screen  name="Settings" component={SettingsScreen}/>
        <Stack.Screen  name="Bill" component={Bill}/>
        <Stack.Screen  name="ConfirmPin" component={ConfirmPin}/>
        <Stack.Screen  name="ConfirmPhoneAgain" component={ConfirmPhoneAgain}/>
        <Stack.Screen options={{
            headerShown:true,
            title: t('common:privacy'),
            headerStyle: {
              backgroundColor: '#43CD80',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}  name= "Privacy" component={Privacy}/>
        <Stack.Screen options={{
            headerShown:true,
            title: t('common:contact'),
            headerStyle: {
              backgroundColor: '#43CD80',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} name="ContactUs" component={ContactUs}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default Navigation;
