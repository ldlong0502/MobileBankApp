'use strict';

import React, { Component } from 'react';

import {
  SafeAreaView,
    AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
class Scan extends Component {
  constructor(props) {
    super(props);  
 this.state = {
result:'' 
}
this.onchangeQRcode=this.onchangeQRcode.bind(this);
}
onchangeQRcode(e){
console.log(e);
this.setState({result:e.data});
}

  render() {
    return (
        
      <QRCodeScanner
      value={this.state.result}
        onRead={this.onchangeQRcode}
        
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>{this.state.result}</Text>
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
 
      

    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default Scan;