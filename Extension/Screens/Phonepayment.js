import React from 'react';
import {View, Text,Dimensions,TouchableOpacity,TextInput,Button,ScrollView,Image} from "react-native"
import Icon from "react-native-vector-icons/Entypo"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
const Tab = createMaterialTopTabNavigator();


function HomeScreen(){
    const [value,setvalue]=useState(0)
    const [color,setcolor]=useState({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false});

    function changevalue(x){
        if(x==0)
        {       
            setcolor({num0:true,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false})
            setvalue(10000)
        }
        if(x==1)
        {       
            setcolor({num0:false,num1:true,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false})
            setvalue(20000)
        }
        if(x==2)
        {       
            setcolor({num0:false,num1:false,num2:true,num3:false,num4:false,num5:false,num6:false,num7:false})
            setvalue(30000)
        }
        if(x==3)
        {       
            setcolor({num0:false,num1:false,num2:false,num3:true,num4:false,num5:false,num6:false,num7:false})
            setvalue(50000)
        }
        if(x==4)
        {       
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:true,num5:false,num6:false,num7:false})
            setvalue(100000)
        }
        if(x==5)
        {       
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:true,num6:false,num7:false})
            setvalue(200000)
        }
        if(x==6)
        {       
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:true,num7:false})
            setvalue(300000)
        }
        if(x==7)
        {       
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:true})
            setvalue(500000)
        }
    }








    return(

        <View>
            <TextInput placeholder='Nhập sô điện thoại' style={{width:Dimensions.get("window").width-10,fontSize:20,alignSelf:"center",borderWidth:1,marginBottom:10,marginTop:10,borderRadius:10}}/>
            <Text style={{marginLeft:10,marginBottom:10,fontSize:30}}>Chọn mệnh giá</Text>
            <View style={{flexDirection:"row",alignSelf:"center"}}>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor: color.num0?"green":"white"}}
                onPress={()=>{changevalue(0)}}
                >

                    <Text>10.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,marginRight:10,backgroundColor: color.num1?"green":"white"}}
                onPress={()=>{changevalue(1)}}
                >
                    
                    <Text>20.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor: color.num2?"green":"white"}}
                onPress={()=>{changevalue(2)}}
                >
                    
                    <Text>30.000d</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",marginTop:10,alignSelf:"center"}}>
            <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor: color.num3?"green":"white"}}
            onPress={()=>{changevalue(3)}}
            >
                    
                    <Text>50.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,marginRight:10,backgroundColor: color.num4?"green":"white"}}
                onPress={()=>{changevalue(4)}}
                >
                    
                    <Text>100.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor: color.num5?"green":"white"}}
                onPress={()=>{changevalue(5)}}
                >
                    
                    <Text>200.000</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",marginTop:10,alignSelf:"center"}}>
            <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor: color.num6?"green":"white"}}
            onPress={()=>{changevalue(6)}}
            >
                    
                    <Text>300.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,marginRight:10,backgroundColor: color.num7?"green":"white"}}
                onPress={()=>{changevalue(7)}}
                >
                    
                    <Text>500.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                    
                    
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{alignSelf:"center",width:Dimensions.get("window").width-40, marginTop:40,borderRadius:10,borderWidth:1,height:40,justifyContent:"center",backgroundColor:"green"}}>
            
            <Text style={{alignSelf:"center",color:"white"}}>Nạp ngay</Text>
                
            </TouchableOpacity>



        </View>
    )
}

function BuycardScreen(){

    const [value,setvalue]=useState(0)
    const [color,setcolor]=useState({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false});

    const [color1,setcolor1]=useState({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false});
    
    
    
    function changevalue1(x){
        if(x==0)
        {       
            setcolor1({num0:true,num1:false,num2:false,num3:false,num4:false,num5:false})
         
        }
        if(x==1)
        {       
            setcolor1({num0:false,num1:true,num2:false,num3:false,num4:false,num5:false})
            
        }
        if(x==2)
        {       
            setcolor1({num0:false,num1:false,num2:true,num3:false,num4:false,num5:false})
          
        }
        if(x==3)
        {       
            setcolor1({num0:false,num1:false,num2:false,num3:true,num4:false,num5:false})
           
        }
        if(x==4)
        {       
            setcolor1({num0:false,num1:false,num2:false,num3:false,num4:true,num5:false})
           
        }
        if(x==5)
        {       
            setcolor1({num0:false,num1:false,num2:false,num3:false,num4:false,num5:true})
           
        }
      
    }
    
    
    
    
    function changevalue(x){
        if(x==0)
        {       
            setcolor({num0:true,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false})
            setvalue(10000)
        }
        if(x==1)
        {       
            setcolor({num0:false,num1:true,num2:false,num3:false,num4:false,num5:false,num6:false,num7:false})
            setvalue(20000)
        }
        if(x==2)
        {       
            setcolor({num0:false,num1:false,num2:true,num3:false,num4:false,num5:false,num6:false,num7:false})
            setvalue(30000)
        }
        if(x==3)
        {       
            setcolor({num0:false,num1:false,num2:false,num3:true,num4:false,num5:false,num6:false,num7:false})
            setvalue(50000)
        }
        if(x==4)
        {       
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:true,num5:false,num6:false,num7:false})
            setvalue(100000)
        }
        if(x==5)
        {       
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:true,num6:false,num7:false})
            setvalue(200000)
        }
        if(x==6)
        {       
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:true,num7:false})
            setvalue(300000)
        }
        if(x==7)
        {       
            setcolor({num0:false,num1:false,num2:false,num3:false,num4:false,num5:false,num6:false,num7:true})
            setvalue(500000)
        }
    }







    

    

    return(

        <View>
            <ScrollView horizontal={true} style={{marginTop:10}}>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor:color1.num0?"black":"white"}}
            onPress={()=>{changevalue1(0)}}
            >
                    <Image source={require("../Images/vittellogo.png")} style={{height:40,width:70}}/>
                
            </TouchableOpacity>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,backgroundColor:color1.num1?"black":"white"}}
            onPress={()=>{changevalue1(1)}}
            >
                    
            <Image source={require("../Images/mobiFonelogo.png")} style={{height:50,width:80}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,backgroundColor:color1.num2?"black":"white"}}
            onPress={()=>{changevalue1(2)}}
            >
                    
            <Image source={require("../Images/vinaphonelogo.png")} style={{height:50,width:80}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,backgroundColor:color1.num3?"black":"white"}}
            onPress={()=>{changevalue1(3)}}
            >
                    
            <Image source={require("../Images/vietnammobilelogo.png")} style={{height:30,width:50}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,backgroundColor:color1.num4?"black":"white"}}
            onPress={()=>{changevalue1(4)}}
            >
                    
            <Image source={require("../Images/gmobilelogo.png")} style={{height:20,width:40}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{height:70,width:70,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,backgroundColor:color1.num5?"black":"white"}}
            onPress={()=>{changevalue1(5)}}
            >
                    
            <Image source={require("../Images/reddilogo.png")} style={{height:30,width:50}}/>
            </TouchableOpacity>
                
            </ScrollView>
            <Text style={{marginLeft:10,marginBottom:10,fontSize:30}}>Chọn mệnh giá</Text>
            <View style={{flexDirection:"row",alignSelf:"center"}}>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor: color.num0?"green":"white"}}
                onPress={()=>{changevalue(0)}}
                >

                    <Text>10.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,marginRight:10,backgroundColor: color.num1?"green":"white"}}
                onPress={()=>{changevalue(1)}}
                >
                    
                    <Text>20.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor: color.num2?"green":"white"}}
                onPress={()=>{changevalue(2)}}
                >
                    
                    <Text>30.000d</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",marginTop:10,alignSelf:"center"}}>
            <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor: color.num3?"green":"white"}}
            onPress={()=>{changevalue(3)}}
            >
                    
                    <Text>50.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,marginRight:10,backgroundColor: color.num4?"green":"white"}}
                onPress={()=>{changevalue(4)}}
                >
                    
                    <Text>100.000d</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor: color.num5?"green":"white"}}
                onPress={()=>{changevalue(5)}}
                >
                    
                    <Text>200.000</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",marginTop:10,alignSelf:"center"}}>
            <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",backgroundColor: color.num6?"green":"white"}}
            onPress={()=>{changevalue(6)}}
            >
                    
                    <Text>300.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,borderWidth:1,justifyContent:"center",alignItems:"center",marginLeft:10,marginRight:10,backgroundColor: color.num7?"green":"white"}}
                onPress={()=>{changevalue(7)}}
                >
                    
                    <Text>500.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:80,width:80,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
                    
                    
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{alignSelf:"center",width:Dimensions.get("window").width-40, marginTop:40,borderRadius:10,borderWidth:1,height:40,justifyContent:"center",backgroundColor:"green"}}>
            <Text>{}</Text>
            <Text style={{alignSelf:"center",color:"white"}}>Mua ngay</Text>
                
            </TouchableOpacity>




            
        </View>
    )
}






export default function Phonepayment(){


    return(
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" 
      options={{title:"Trả trước"}}
      
      component={HomeScreen} />
      <Tab.Screen name="Buycard"
      options={{title:"Mua mã thẻ"}}
       component={BuycardScreen} />
    </Tab.Navigator>
    </NavigationContainer>
    )
}