import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CircleButton from './CircleButton';

const CircleButtonList = props => {
  return (
  	<View style={styles.buttonList}>
  	  <CircleButton icon="add" color="white" iconColor="black" onClick={props.onAddClick} />
      <CircleButton icon="gps-fixed" color="white" iconColor="black" onClick={props.onGPSClick} />
  	</View>
  );
}

export default CircleButtonList;

const styles = StyleSheet.create({
  buttonList: {
  	position: 'absolute',
    top: 8,
    right: 8
  }
});