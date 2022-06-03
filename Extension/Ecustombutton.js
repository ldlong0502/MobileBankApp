import {View, Text,Dimensions,TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/Entypo"
import React from 'react'


export default function Ecustombutton(props){

    return(

        <TouchableOpacity style={{flexDirection:"row",height:50,borderRadius:10,justifyContent:"center",borderWidth:1,marginTop:5,alignItems:"center",width:Dimensions.get("window").width-20}}
        onPress={props.onPress}
        >
            <Icon name={props.icon} size={30}/>
            <Text style={{marginLeft:10}}>{props.Text}</Text>
        </TouchableOpacity>


    )





}