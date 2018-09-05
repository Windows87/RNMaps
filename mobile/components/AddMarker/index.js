import React, { Component } from 'react';
import { StatusBar, View, Image, Text, StyleSheet, TextInput, ToastAndroid, YellowBox } from 'react-native';
import CustomButton from './CustomButton';
import ImagePickerButton from './ImagePickerButton';
import MarkersDAO from '../../utils/MarkersDAO';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class AddMarker extends Component {
  static navigationOptions = {
  	title: 'Add Marker'
  };

  markersDAO = new MarkersDAO();

  state = {
    image: null,
    markName: '',
    markLatitude: '',
    markLongitude: '',
    loading: false
  };

  componentDidMount() {
    this.setDefaultCoordinates();
  }

  setDefaultCoordinates() {
    const defaultCoordinates = this.props.navigation.getParam('defaultCoordinates', false);

    if(!defaultCoordinates.latitude)
      return;

    const markLatitude = defaultCoordinates.latitude.toString();
    const markLongitude = defaultCoordinates.longitude.toString();

    this.setState({ markLatitude, markLongitude });
  }

  onImagePick = (image) => {
    this.setState({ image });
  }

  goToMap() {
    this.props.navigation.navigate('Map');
  }

  buttonSumit = async() => {
    const { image, markName } = this.state;
    let { markLatitude, markLongitude } = this.state;

    markLatitude = markLatitude.replace(',', '.');
    markLongitude = markLongitude.replace(',', '.');

    if(!image)
      return ToastAndroid.show('Set marker image', ToastAndroid.SHORT);

    if(!markName)
      return ToastAndroid.show('Set marker name', ToastAndroid.SHORT);

    if(!markLatitude)
      return ToastAndroid.show('Set marker Latitude', ToastAndroid.SHORT);

    if(!markLongitude)
      return ToastAndroid.show('Set marker Longitude', ToastAndroid.SHORT);

    const imageUpload = {
      uri: image.path,
      type: image.mime,
      name: 'photo.jpg'
    }

    this.setState({ loading: true });

    try {
      await this.markersDAO.insertMarker(imageUpload, markName, markLatitude, markLongitude);
      this.goToMap();
    } catch(err) {
      ToastAndroid.show(err, ToastAndroid.SHORT);
      this.setState({ loading: false });
    }
  }

  buttonComponent() {
    if(!this.state.loading)
      return <CustomButton onPress={this.buttonSumit} title="Add Marker" />;
  }

  loadingComponent() {
    if(this.state.loading)
      return <Text>Loading..</Text>;
  }

  render() {
    const { markName, markLatitude, markLongitude } = this.state;
    const { textInputChange } = this;
  	return (
  	  <View style={styles.addMarker}>
  	    <StatusBar hidden={false} backgroundColor="#F7F7F7" barStyle="dark-content" />
        <ImagePickerButton onImagePick={this.onImagePick} />
  	    <TextInput style={styles.textInput} underlineColorAndroid="transparent" placeholder="Marker Name" onChangeText={markName => this.setState({ markName })} value={markName} />
  	    <TextInput style={styles.textInput} underlineColorAndroid="transparent" keyboardType="numeric" placeholder="Marker Latitude" onChangeText={markLatitude => this.setState({ markLatitude })} value={markLatitude} />
  	    <TextInput style={styles.textInput} underlineColorAndroid="transparent" keyboardType="numeric" placeholder="Marker Longitude" onChangeText={markLongitude => this.setState({ markLongitude })} value={markLongitude} />
  	    { this.buttonComponent() }
        { this.loadingComponent() }
  	  </View>
  	);
  }
}

const styles = StyleSheet.create({
  addMarker: {
  	padding: 8,
  	backgroundColor: 'white',
  	height: '100%',
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  imageView: {
    backgroundColor: 'white',
    width: 150,
    height: 150,
    elevation: 3,
    marginBottom: 8
  },
  image: {
    width: 150,
    height: 150,
  },
  textInput: {
  	width: '90%',
  	maxWidth: 700,
  	borderColor: 'grey',
  	borderWidth: 1,
  	padding: 4,
  	paddingLeft: 8,
  	marginBottom: 8
  }
});