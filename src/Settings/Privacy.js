import { View, Text } from 'react-native';
import React from 'react';
import { FONTS } from '../../constants';

export default function Privacy() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{...FONTS.h3}}>Chính sách bảo mật</Text>
    </View>
  );
}
