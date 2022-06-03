import React from 'react';
import {View, Text,Dimensions} from "react-native"
import Ecustombutton from './Ecustombutton';


export default function Extensionandeconomicservice(){
    return(
        <View style={{alignItems:"center"}}>
            <View style={{alignItems:"center",backgroundColor:"white",borderRadius:10}}>
                <Text style={{marginTop:10,fontSize:30,marginBottom:20}}>Tiện ích</Text>
                <Ecustombutton Text="Thanh toán hóa đơn" icon="browser" onPress={()=>{}}/>
                <Ecustombutton Text="Nạp tiền điện thoại" icon="phone" onPress={()=>{}}/>
                <Ecustombutton Text="Vé máy bay, vé tàu" icon="ticket" onPress={()=>{}}/>
            </View>

            <View style={{alignItems:"center",backgroundColor:"white",borderRadius:10,marginTop:20}}>
                <Text style={{fontSize:30,marginBottom:20}}>Dịch vụ tài chính</Text>
                <Ecustombutton Text="Bảo hiểm" icon="wallet" onPress={()=>{}}/>
                <Ecustombutton Text="Tiết kiệm online" icon="area-graph" onPress={()=>{}}/>
            </View>

        </View>
    )
}