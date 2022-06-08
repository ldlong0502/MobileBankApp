import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;
