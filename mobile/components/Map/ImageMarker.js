import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import configs from '../../config';

const siteUrl = configs.siteUrl;

const ImageMarker = props => {
  return (
  	<Marker coordinate={props.coordinate} onPress={props.onPress} style={{ width: 48, height: 48 }}>
  	  <Image source={{ uri: siteUrl + '/markers/' + props.imageName }} style={{ width: 48, height: 48 }} />
  	</Marker>
  );
}

export default ImageMarker;