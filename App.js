import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import React, { Component } from 'react';
import Transaction from './src/Transaction/TransactionHome';
import Setting from './src/Settings/Setting';
import './constants/DCSLocalize';
import Phonepayment from './Extension/Screens/Phonepayment';
import Navigation from './src/navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#54675d',
  },
});

export default App;
