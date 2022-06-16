import { Text, StyleSheet, View, SafeAreaView , Alert} from 'react-native';
import React, { Component, useEffect } from 'react';
import './constants/DCSLocalize';
import Navigation from './src/navigation';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidStyle } from '@notifee/react-native';
import Data from './src/Data/Data';
import { icons } from './constants';
import Chart from './src/Transaction/Chart';
const App = () => {
   useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log(token);
        AsyncStorage.setItem('tokenDeviceID', token.toString());
        Data.getTokenDeviceID = token;
      });
    messaging().requestPermission();
    messaging().onMessage(remoteMessage => {
      console.log(remoteMessage.notification);
       DisplayNotification(remoteMessage);
    });
    });

   async function DisplayNotification(remoteMessage) {
     // Create a channel
     const channelId = await notifee.createChannel({
       id: 'default',
       name: 'Default Channel',
     });

     // Display a notification
     await notifee.displayNotification({
       title: remoteMessage.notification.title,
       android: {
         channelId,
         largeIcon: icons.logoBank,
          style: { type: AndroidStyle.BIGTEXT,
            text:  remoteMessage.notification.body,
          },

       },
     });
   }
  return <SafeAreaView style={styles.root}>
        <Navigation />
    </SafeAreaView>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#54675d',
  },
});

export default App;
