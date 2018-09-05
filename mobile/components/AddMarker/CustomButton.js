import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CustomButton = props => {
  return (
  	<TouchableOpacity style={styles.customButton} onPress={props.onPress}>
  	  <Text style={styles.customButtonText}>{props.title}</Text>
  	</TouchableOpacity>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  customButton: {
  	backgroundColor: 'white',
  	padding: 8,
  	elevation: 2
  },
  customButtonText: {
  	color: 'black',
  	fontWeight: 'bold'
  }
});