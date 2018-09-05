import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, StatusBar, ToastAndroid } from 'react-native';
import DeleteButton from './DeleteButton';
import configs from '../../config';

const siteUrl = configs.siteUrl;

export default class MarkerScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { marker, onDelete, onError } = navigation.state.params;
    return {
  	  title: marker.name,
      headerRight: <DeleteButton id={marker._id} onDelete={onDelete} onError={onError} />
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onDelete: this.onDelete,
      onError: this.onError
    });
  }

  onDelete = () => {
    this.props.navigation.navigate('Map');
  }

  onError = error => {
    ToastAndroid.show(error, ToastAndroid.SHORT);
  }

  render() {
  	const marker = this.props.navigation.state.params.marker;
  	return (
  	  <View style={styles.markerScreen}>
        <StatusBar hidden={false} backgroundColor="#F7F7F7" barStyle="dark-content" />
  	    <Image source={{ uri: siteUrl + '/images/' + marker.image_name }} style={styles.markerImage} />
  	    <Text> {marker.coordinates[1] + ', ' + marker.coordinates[0]} </Text>
  	  </View>
  	);
  }
}

const styles = StyleSheet.create({
  markerScreen: {
  	flex: 1,
  	backgroundColor: 'white',
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  markerImage: {
  	width: 200,
  	height: 200,
  	marginBottom: 8
  }
});