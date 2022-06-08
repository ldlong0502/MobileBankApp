import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class ConfirmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"Đặng Thái Tài",
      accountNumber: '1231321321321321',
      BankName: ' VietinBank'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textt}>Tài khoản đích :{this.state.accountNumber}</Text>
        <Text style={styles.textt}>Tên người thụ hưởng</Text>
        <Text style={styles.textt}>ngân hàng thụ hưởng </Text>
        <Text style={styles.textt}>Số tiền </Text>
        <Text style={styles.textt}>Số tiền phí</Text>
        <Text style={styles.textt}>Nội dung </Text>
        <View style={styles.start}>
          <Text style={styles.textt}>chọn phương thức xác thực</Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={{
                color: 'white',
                textTransform: 'capitalize',
                fontSize: 16,
              }}>
              {' '}
              Xác Nhận
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
   justifyContent: 'center'
  },
  start: {
    width: '90%',
    backgroundColor: 'transparent',

    margin: 10,
  },
  heading: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: 'white',
    fontSize: 24,
  },

  textInput: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  button: {
    display: 'flex',
    margin: 10,
    backgroundColor: '#74B340',
    height: 50,
    width: '80%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  InOT: {
    display: 'flex',

    padding: 10,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textt: {
    color: 'white',
    fontSize: 15,
  },
});

export default ConfirmScreen;
