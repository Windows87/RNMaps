import React, { Component } from 'react';
import { Image, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class ImagePickerButton extends Component {
  state = {
  	imagePath: ''
  }

  onImagePress = async () => {
  	ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      if(!image)
        return;

      if(!this.props.onImagePick)
      	return this.setState({ imagePath: image.path });

      this.props.onImagePick(image);
      this.setState({ imagePath: image.path });
    }).catch(err => console.log(err));
  }

  imageComponent() {
  	if(!this.state.imagePath)
  	  return <Image style={styles.image} source={require('../../assets/default-marker.png')} />

  	return <Image style={styles.image} source={{uri: this.state.imagePath}} />;
  }

  render() {
  	return (
  	  <TouchableOpacity style={styles.imageView} onPress={this.onImagePress}>
        { this.imageComponent() }
      </TouchableOpacity>
  	);
  }
}

const styles = StyleSheet.create({
  imageView: {
    backgroundColor: 'white',
    width: 150,
    height: 150,
    elevation: 3,
    marginBottom: 8,
  },
  image: {
    width: 150,
    height: 150
  }
});