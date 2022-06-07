import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import React, { Component, useEffect } from 'react';
import './constants/DCSLocalize';
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
