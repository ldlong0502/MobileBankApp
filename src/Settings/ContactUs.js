import { View, Text } from 'react-native';
import React from 'react';
import { FONTS } from '../../constants';

export default function ContactUs() {
  return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{...FONTS.h3, alignSelf: 'center', justifyContent: 'center'}}>
        Liên hệ: {'\n'}20521565@gm.uit.edu.vn
      </Text>
    </View>;
}
