import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This is home screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
