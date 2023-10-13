import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
const height = Dimensions.get('window').height;


const EmptyList = (props:any) => {
  return (
    <View style={styles.noRecordContainer}>
      <Text style={styles.noRecordTxt}>{props.msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noRecordContainer: {
    height: height / 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordTxt: {
    fontSize: 15
  },
});

export default EmptyList;