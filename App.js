import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import Transaction from './src/Transaction/TransactionHome';
import Setting from './src/Settings/Setting';
import './constants/DCSLocalize';
import Phonepayment from './Extension/Screens/Phonepayment'

export default class App extends Component {
  render() {
    return (
        <Phonepayment/>
    );
  }
}

const styles = StyleSheet.create({});
