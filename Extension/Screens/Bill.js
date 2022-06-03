import React from 'react';
import {View, Text,Dimensions,TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/Entypo"

export default function Bill(){


    return(
        <View>
            <Text style={{marginTop:10,fontSize:40,marginBottom:50,alignSelf:"center"}}>Thanh toán hóa đơn</Text>
            <View style={{flexDirection:"row",alignSelf:"center"}}>
                <TouchableOpacity style={{height:120,width:120,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center"}}>
                    <Icon name="thunder-cloud" size={30}/>
                    <Text>Hóa đơn tiền điện</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:120,width:120,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,marginRight:10}}>
                    <Icon name="water" size={30}/>
                    <Text>Hóa đơn tiền nước</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:120,width:120,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center"}}>
                    <Icon name="credit-card" size={30}/>
                    <Text>Cước di động trả sau</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",marginTop:10,alignSelf:"center"}}>
            <TouchableOpacity style={{height:120,width:120,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center"}}>
                    <Icon name="drive" size={30}/>
                    <Text>Cước internet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:120,width:120,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,marginRight:10}}>
                    <Icon name="creative-commons-attribution" size={30}/>
                    <Text>Thanh toán viện phí</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:120,width:120,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center"}}>
                    <Icon name="open-book" size={30}/>
                    <Text>Thanh toán học phí</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",marginTop:10,alignSelf:"center"}}>
            <TouchableOpacity style={{height:120,width:120,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center"}}>
                    <Icon name="text-document" size={30}/>
                    <Text>Thanh toán phí logictic</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:120,width:120,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,marginRight:10}}>
                    <Icon name="code" size={30}/>
                    <Text>Auto debit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:120,width:120,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center"}}>
                    <Icon name="menu" size={30}/>
                    <Text>Các dịch vụ khác</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}