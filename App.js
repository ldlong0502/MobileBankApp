import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import Transaction from './src/Transaction/TransactionHome';
import Setting from './src/Settings/Setting';
import './constants/DCSLocalize';
export default class App extends Component {
  render() {
    return (
        <Setting />
    );
  }
}

const styles = StyleSheet.create({});
