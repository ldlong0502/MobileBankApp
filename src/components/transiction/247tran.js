
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Alert,
  Button,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


class FastTransition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username:"Đặng Thái Tài",
      bam:1000

    };
  }
 
  render() {
    return (
    <View style={styles.container}>
    
      <View style={styles.start}>

        <Text style={styles.textt}>Tài khoản nguồn</Text>
        <Text style={styles.textt}>1924297498327498</Text>
        <Text style={styles.textt}> {this.state.username}</Text>
        <Text style={styles.textt}>Số dư tài khoản : {this.state.bam}$</Text>
      </View>
      <Text style={styles.heading}>Chuyển tiền nội bộ</Text>
      <TextInput style={styles.textInput} placeholder='số tài khoản ...'></TextInput>
      <TextInput style={styles.textInput} placeholder='Ngân hàng thụ hưởng '></TextInput>
      <Text style={styles.heading}>Tên người thụ hưởng </Text>
      <TextInput style={styles.textInput} placeholder="nhập số tiền ..."></TextInput>
       <View style={styles.InOT}>
         <Text style={styles.heading}>Thông tin giao dịch</Text>

         <TextInput style={styles.textInput} placeholder="số tiền          vnđ"></TextInput>
         <TextInput style={styles.textInput} placeholder="nội dung chuyển tiền"></TextInput>
       </View>


      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ConfirmScreen')}>
        <Text style={{color:"white",textTransform:"capitalize",fontSize:16}}> tiếp tục</Text>

      </TouchableOpacity>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black",
    flexDirection: "column",
    alignItems: "center",
  },
start: {
 width:'90%',
backgroundColor:"transparent",

margin:10

},
heading:{
alignSelf:'flex-start',
marginLeft:20,
color: 'white',
fontSize:24,



},

textInput: {
  padding:10,
  margin:10,
  backgroundColor:'white',
  width:"90%",
  borderRadius:10
},
  button: {
    display: 'flex',
    margin: 10,
    backgroundColor: '#74B340',
    height: 50,
    width: "80%",
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  InOT: {
        display :"flex",

        padding:10,
        width:"100%",
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems:"flex-start"

  },
  textt: {
    color: 'white',
    fontSize:15
  }
  
});

export default FastTransition;
