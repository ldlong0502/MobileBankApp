import React from 'react';
import {View, Text,Dimensions,TouchableOpacity,TextInput,Button,ScrollView,Image, Alert, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Data from '../../src/Data/Data';
import firestore from '@react-native-firebase/firestore';
import NotificationService from '../../NotificationService';
import Clipboard from '@react-native-clipboard/clipboard';
import HelpFunction from '../../HelpFunction';
import { useEffect } from 'react';
const Tab = createMaterialTopTabNavigator();


function HomeScreen(){
    const [value,setvalue] = useState(0);
    const [color,setcolor] = useState({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false});
    const [pn,setpn] = useState('');
    const isFocused = useIsFocused();
    const {t} = useTranslation();

    function changevalue(x){
        if (x == 0)
        {
            setcolor({num0:true,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false});
            setvalue(10000);
        }
        if (x == 1)
        {
            setcolor({num0:false,num1:true,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false});
            setvalue(20000);
        }
        if (x == 2)
        {
            setcolor({num0:false,num1:false,num2:true,num3:false,num4:false,num5:false,num6:false,num7:false});
            setvalue(30000);
        }
        if (x == 3)
        {
            setcolor({num0:false,num1:false,num2:false,num3:true,num4:false,num5:false,num6:false,num7:false});
            setvalue(50000);
        }
        if (x == 4)
        {
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:true,num5:false,num6:false,num7:false});
            setvalue(100000);
        }
        if (x == 5)
        {
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:true,num6:false,num7:false});
            setvalue(200000);
        }
        if (x == 6)
        {
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:true,num7:false});
            setvalue(300000);
        }
        if (x == 7)
        {
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:true});
            setvalue(500000);
        }
    }

    const checkandbuy = async()=>{
        if (value == 0){
            Alert.alert('Vui lòng chọn mệnh giá');
            return;
           }
        if (pn.length != 10 || pn * 1 != pn || pn[0] != '0')
           {
            Alert.alert('Vui lòng nhập sđt cần thanh toán');
            return;

           }

       let bl = Data.getDataUser.surplus;

       if (bl < value){
        Alert.alert(
            'Số dư không đủ',
    'Số dư trong tài khoản của quý khách không đủ để thực hiện giao dịch này!',
    [
        {
          text: 'Ok',

          style: 'cancel',
        },
      ]
        );
       }
       else {
        let tt = HelpFunction.getCurrentDate();
        console.log(tt);

        await firestore().collection('users').doc(Data.getDataUser.id).update({surplus: bl - value});
        await firestore().collection('historyTransaction').doc().set(
            {
            isAdd:false,
            money:value,
            time:tt,
            title:'Thanh toán thuê bao trả trước',
            toBankID:'',
            fromBankID: '',
            userId:Data.getDataUser.id,
            content: 'Nạp tiền cho SĐT: ' + pn + '\n Thời điểm giao dịch: ' + tt,
            idService: 2,
            isNotification: false,
            }

            );


        Data.getDataUser.surplus = bl - value;


        // let body1 = 'Tài khoản ' + Data.getDataUser.bankID + ' tại LLTB đã thanh toán thuê bao trả trước ' + value + ' VNĐ vào lúc ' + tt + ' Số dư: ' + Data.getDataUser.surplus + ' VNĐ';


        // NotificationService.sendSingleDeviceNotification({title:'Thanh toán',body:body1, token:Data.getTokenDeviceID});

        Alert.alert(
            'Thanh toán thành công',
    'Số tiền đã được cộng vào sđt của quý khách',
    [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]
        );


       }




    };








    useEffect(()=>{
        if (!isFocused){ return;}
            setvalue(0);
            setcolor({
              num0: false,
              num1: false,
              num2: false,
              num3: false,
              num4: false,
              num5: false,
              num6: false,
              num7: false,
            });
            setpn('');
     },[isFocused]);
    return (

        <View>
            <TextInput placeholder={t('common:title4')} style={{width:Dimensions.get('window').width - 10,fontSize:20,alignSelf:'center',borderWidth:1,marginBottom:10,marginTop:10,borderRadius:10}}
            onChangeText={t=>{setpn(t);}}
            />
            <Text style={{marginLeft:10,marginBottom:10,fontSize:30,color:'black'}}>{t('common:title3')}</Text>
            <View style={{flexDirection:'row',alignSelf:'center'}}>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor: color.num0 ? 'green' : 'white'}}
                onPress={()=>{changevalue(0);}}
                >

                    <Text>10.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,marginRight:10,backgroundColor: color.num1 ? 'green' : 'white'}}
                onPress={()=>{changevalue(1);}}
                >

                    <Text>20.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor: color.num2 ? 'green' : 'white'}}
                onPress={()=>{changevalue(2);}}
                >

                    <Text>30.000d</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
            <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor: color.num3 ? 'green' : 'white'}}
            onPress={()=>{changevalue(3);}}
            >

                    <Text>50.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,marginRight:10,backgroundColor: color.num4 ? 'green' : 'white'}}
                onPress={()=>{changevalue(4);}}
                >

                    <Text>100.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor: color.num5 ? 'green' : 'white'}}
                onPress={()=>{changevalue(5);}}
                >

                    <Text>200.000</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
            <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor: color.num6 ? 'green' : 'white'}}
            onPress={()=>{changevalue(6);}}
            >

                    <Text>300.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,marginRight:10,backgroundColor: color.num7 ? 'green' : 'white'}}
                onPress={()=>{changevalue(7);}}
                >

                    <Text>500.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,justifyContent:'center',alignItems:'center'}} />
            </View>
            <TouchableOpacity style={{alignSelf:'center',width:Dimensions.get('window').width - 40, marginTop:40,borderRadius:10,borderWidth:1,height:40,justifyContent:'center',backgroundColor:'green'}}
            onPress={()=>{checkandbuy();}}
            >

            <Text style={{alignSelf:'center',color:'white'}}>{t('common:title5')}</Text>

            </TouchableOpacity>



        </View>
    );
}

function BuycardScreen(){

    const [value,setvalue] = useState(0);
    const [color,setcolor] = useState({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false});

    const [card,setcard] = useState('');
    const [oo,setoo] = useState(-1);
    const [ayda,setayda] = useState(false);
    const [color1,setcolor1] = useState({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false});
    const [isokay,setisokay] = useState(false);
    const {t} = useTranslation();
    const isFocused = useIsFocused();


    function changevalue1(x){

        setayda(true);
        if (x == 0)
        {
            setcolor1({num0:true,num1:false,num2:false,num3:false,num4:false,num5:false});

        }
        if (x == 1)
        {
            setcolor1({num0:false,num1:true,num2:false,num3:false,num4:false,num5:false});

        }
        if (x == 2)
        {
            setcolor1({num0:false,num1:false,num2:true,num3:false,num4:false,num5:false});

        }
        if (x == 3)
        {
            setcolor1({num0:false,num1:false,num2:false,num3:true,num4:false,num5:false});

        }
        if (x == 4)
        {
            setcolor1({num0:false,num1:false,num2:false,num3:false,num4:true,num5:false});

        }
        if (x == 5)
        {
            setcolor1({num0:false,num1:false,num2:false,num3:false,num4:false,num5:true});

        }

    }




    function changevalue(x){
        if (x == 0)
        {
            setcolor({num0:true,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false});
            setvalue(10000);
        }
        if (x == 1)
        {
            setcolor({num0:false,num1:true,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false});
            setvalue(20000);
        }
        if (x == 2)
        {
            setcolor({num0:false,num1:false,num2:true,num3:false,num4:false,num5:false,num6:false,num7:false});
            setvalue(30000);
        }
        if (x == 3)
        {
            setcolor({num0:false,num1:false,num2:false,num3:true,num4:false,num5:false,num6:false,num7:false});
            setvalue(50000);
        }
        if (x == 4)
        {
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:true,num5:false,num6:false,num7:false});
            setvalue(100000);
        }
        if (x == 5)
        {
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:true,num6:false,num7:false});
            setvalue(200000);
        }
        if (x == 6)
        {
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:true,num7:false});
            setvalue(300000);
        }
        if (x == 7)
        {
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:true});
            setvalue(500000);
        }
    }
    const checkandbuy1 = async()=>{
        if (value == 0){
            Alert.alert('Vui lòng chọn mệnh giá');
            return;
           }
           if (!ayda){
            Alert.alert('Vui lòng chọn nhà mạng');
            return;
           }

       let bl1 = Data.getDataUser.surplus;

       if (bl1 < value){
        Alert.alert(
            'Số dư không đủ',
             'Số dư trong tài khoản của quý khách không đủ để thực hiện giao dịch này!',
       [
        {
          text: 'Ok',
          style: 'cancel',
        },
       ]
        );
       }
       else {
        let tt = HelpFunction.getCurrentDate();
        console.log(tt + 'Long');
        await firestore().collection('users').doc(Data.getDataUser.id).update({surplus: bl1 - value});
        console.log(tt + 'Long');
        await firestore().collection('historyTransaction').doc().set(
            {
                isAdd:false,
                money:value,
                time:tt,
                title:'Thanh toán thẻ điện thoại',
                toBankID:'',
                fromBankID: '',
                userId:Data.getDataUser.id,
                content: 'Bạn vừa thanh toán thành công cho mã thẻ điện thoại có mệnh giá ' + HelpFunction.formatMoney(value) + '\n Thời điểm giao dịch: ' + tt,
                idService: 2,
                isNotification: false,
            }
            );


        Data.getDataUser.surplus = bl1 - value;


        // let body1 = 'Tài khoản ' + Data.getDataUser.bankID + ' tại LLTB đã thanh toán cho mã thẻ điện thoại có mệnh giá ' + value + ' VNĐ vào lúc ' + tt + ' Số dư: ' + Data.getDataUser.surplus + ' VNĐ';


        // NotificationService.sendSingleDeviceNotification({title:'Thanh toán',body:body1, token:Data.getTokenDeviceID});
        getcard();


        setisokay(true);


        Alert.alert(
            'Thanh toán thành công',
            'Bạn đã thanh toán cho mã thẻ điện thoại thành công!',
    [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]
        );
       }
    };



     const getcard = ()=>{
        let x = Math.floor(Math.random() * 10);
        console.log(x);
        while (x === oo)
        {
            x = Math.floor(Math.random() * 10);

        }
        let okok;
        setoo(x);
        switch (x){
            case 0:
                okok = 97798917297;
                break;
            case 1:
                okok = 74980740899;
                break;
            case 2:
                okok = 10628610543;
                break;
            case 3:
                okok = 17761098659;
                break;
            case 4:
                okok = 86417654165;
                break;
            case 5:
                okok = 34927620265;
                break;
            case 6:
                okok = 59931604943;
                break;
            case 7:
                okok = 74907068485;
                break;
            case 8:
                okok = 34240707722;
                break;
            case 9:
                okok = 72801868191;
                break;
        }


        setcard(okok);
     };









     useEffect(()=>{
        if (!isFocused){ return;}
            setvalue(0);
            setcolor({
              num0: false,
              num1: false,
              num2: false,
              num3: false,
              num4: false,
              num5: false,
              num6: false,
              num7: false,
            });
            setcard('');
            setoo(-1);
            setayda(false);
            setcolor1({
              num0: false,
              num1: false,
              num2: false,
              num3: false,
              num4: false,
              num5: false,
            });
            setisokay(false);
     },[isFocused]);
    return (

        <View>
            <ScrollView horizontal={true} style={{marginTop:10}}>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor:color1.num0 ? 'green' : 'white'}}
            onPress={()=>{changevalue1(0);}}
            >
                    <Image source={require('../Images/vittellogo.png')} style={{height:40,width:70}}/>

            </TouchableOpacity>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,backgroundColor:color1.num1 ? 'green' : 'white'}}
            onPress={()=>{changevalue1(1);}}
            >

            <Image source={require('../Images/mobiFonelogo.png')} style={{height:50,width:80}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,backgroundColor:color1.num2 ? 'green' : 'white'}}
            onPress={()=>{changevalue1(2);}}
            >

            <Image source={require('../Images/vinaphonelogo.png')} style={{height:50,width:80}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,backgroundColor:color1.num3 ? 'green' : 'white'}}
            onPress={()=>{changevalue1(3);}}
            >

            <Image source={require('../Images/vietnammobilelogo.png')} style={{height:30,width:50}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,backgroundColor:color1.num4 ? 'green' : 'white'}}
            onPress={()=>{changevalue1(4);}}
            >

            <Image source={require('../Images/gmobilelogo.png')} style={{height:20,width:40}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,backgroundColor:color1.num5 ? 'green' : 'white'}}
            onPress={()=>{changevalue1(5);}}
            >

            <Image source={require('../Images/reddilogo.png')} style={{height:30,width:50}}/>
            </TouchableOpacity>

            </ScrollView>
            <Text style={{marginLeft:10,marginBottom:10,fontSize:30,color:'black'}}>{t('common:title3')}</Text>
            <View style={{flexDirection:'row',alignSelf:'center'}}>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor: color.num0 ? 'green' : 'white'}}
                onPress={()=>{changevalue(0);}}
                >

                    <Text>10.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,marginRight:10,backgroundColor: color.num1 ? 'green' : 'white'}}
                onPress={()=>{changevalue(1);}}
                >

                    <Text>20.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor: color.num2 ? 'green' : 'white'}}
                onPress={()=>{changevalue(2);}}
                >

                    <Text>30.000d</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
            <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor: color.num3 ? 'green' : 'white'}}
            onPress={()=>{changevalue(3);}}
            >

                    <Text>50.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,marginRight:10,backgroundColor: color.num4 ? 'green' : 'white'}}
                onPress={()=>{changevalue(4);}}
                >

                    <Text>100.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor: color.num5 ? 'green' : 'white'}}
                onPress={()=>{changevalue(5);}}
                >

                    <Text>200.000</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
            <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',backgroundColor: color.num6 ? 'green' : 'white'}}
            onPress={()=>{changevalue(6);}}
            >

                    <Text>300.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:'center',alignItems:'center',marginLeft:10,marginRight:10,backgroundColor: color.num7 ? 'green' : 'white'}}
                onPress={()=>{changevalue(7);}}
                >

                    <Text>500.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,justifyContent:'center',alignItems:'center'}} />
            </View>
            {
                isokay && (<View style={{marginTop:20}}>
                <Text style={{alignSelf:'center'}}>{t('common:pcc')}</Text>
                <TouchableOpacity activeOpacity={0.6}
                onLongPress={()=>{Clipboard.setString(
                    card.toString());

                    ToastAndroid.show(t('common:cped'),ToastAndroid.SHORT);
                }
                     }>
                <Text style={{alignSelf:'center',fontSize:30,color:'red'}}>{card}</Text>
                </TouchableOpacity>

                </View>)

            }




            <TouchableOpacity style={{alignSelf:'center',width:Dimensions.get('window').width - 40, marginTop:40,borderRadius:10,borderWidth:1,height:40,justifyContent:'center',backgroundColor:'green'}}
            onPress={()=>{checkandbuy1();}}
            >

            <Text style={{alignSelf:'center',color:'white'}}>{t('common:title5')}</Text>

            </TouchableOpacity>





        </View>
    );
}






export default function Phonepayment(){
    const {t} = useTranslation();


    return (
    <Tab.Navigator>
      <Tab.Screen name="Home"
      options={{title:t('common:title1')}}

      component={HomeScreen} />
      <Tab.Screen name="Buycard"
      options={{title:t('common:title2')}}
       component={BuycardScreen} />
    </Tab.Navigator>
    );
}
