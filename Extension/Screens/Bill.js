import React, { useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import {View, Text,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { FONTS } from '../../constants';

export default function Bill(){

    return <View style={{ backgroundColor: '#50C23B', flex: 1 }}>
        <Text style={{ marginTop: 30, fontSize: 40, marginBottom: 30, alignSelf: 'center', color: 'white' }}>
          Thanh toán hóa đơn
        </Text>
        <View style={{ paddingTop: 40, alignItems: 'center', backgroundColor: 'white', paddingBottom: 40, marginLeft: 20, marginRight: 20, borderRadius: 20, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="thunder-cloud" size={30} style={{ color: 'lightgreen' }} />
              <Text>Hóa đơn tiền điện</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
              <Icon name="water" size={30} style={{ color: 'lightgreen' }} />
              <Text>Hóa đơn tiền nước</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="credit-card" size={30} style={{ color: 'lightgreen' }} />
              <Text>Cước di động trả sau</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
            <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="drive" size={30} style={{ color: 'lightgreen' }} />
              <Text>Cước internet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
              <Icon name="creative-commons-attribution" size={30} style={{ color: 'lightgreen' }} />
              <Text>Thanh toán viện phí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="open-book" size={30} style={{ color: 'lightgreen' }} />
              <Text>Thanh toán học phí</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
            <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="text-document" size={30} style={{ color: 'lightgreen' }} />
              <Text>Thanh toán phí logictic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10 }}>
              <Icon name="code" size={30} style={{ color: 'lightgreen' }} />
              <Text>Auto debit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="menu" size={30} style={{ color: 'lightgreen' }} />
              <Text>Các dịch vụ khác</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ alignSelf: 'center', marginTop: 20, ...FONTS.h4, color: 'red' }}>
            Các tính năng này đang được phát triển.{'\n'}Vui lòng quay lại sau!!!
          </Text>
        </View>
      </View>;
}
