import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CircleButton = props => {
  return (
  	<TouchableOpacity style={[ styles.circleButton, { backgroundColor: props.color } ]} onPress={props.onClick}>
  	  <Icon name={props.icon} size={25} color={props.iconColor} />
  	</TouchableOpacity>
  ); 
}

export default CircleButton;

const styles = StyleSheet.create({
  circleButton: {
  	width: 40,
  	height: 40,
  	borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    elevation: 2
  }
});