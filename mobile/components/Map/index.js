import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, StatusBar, ToastAndroid, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import CircleButtonList from './CircleButtonList';
import ImageMarker from './ImageMarker';
import MarkersDAO from '../../utils/MarkersDAO';
import { saveLastPosition, getLastPosition } from '../../utils/PositionUtils';

import mapStyle from './mapStyle';

const icons = {
  restaurant: require('../../assets/icons/restaurant.png'),
  pizza: require('../../assets/icons/pizza.png'),
  beer: require('../../assets/icons/beer.png'),
};

export default class Map extends Component {
  markersDAO = new MarkersDAO;

  static navigationOptions = {
    header: null,
  };

  state = {
    position: {latitude: 0, longitude: 0, latitudeDelta: 0.009, longitudeDelta: 0.009},
    markers: []
  }

  setMarkers = async (latitude, longitude) => {
    try {
      const markers = await this.markersDAO.getMarkers(latitude, longitude);
      this.setState({ markers });
    } catch(err) {
      ToastAndroid.show(err, ToastAndroid.SHORT);
    }
  }

  setLastPosition = async () => {
    try {
      const coordenates = await getLastPosition();
      const { latitude, longitude } = coordenates;

      if(!latitude || !longitude)
        return;

      await this.setState({ position: {...this.state.position, latitude, longitude} });
      this.map.animateToRegion(this.state.position, 500);
    } catch(err) {
      console.log(err);
    }
  }

  setCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      async (newPosition) => {
        const { latitude, longitude } = newPosition.coords;
        this.setMarkers(latitude, longitude);
        await this.setState({ position: {...this.state.position, latitude, longitude} });
        this.map.animateToRegion(this.state.position, 500);
        await saveLastPosition(latitude, longitude);
      },
      (error) => ToastAndroid.show('Error on request of your localization', ToastAndroid.SHORT),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );    
  }

  onMapReady = () => {
    this.setLastPosition();
    this.setCurrentPosition();
  }

  onLongPress = event => {
    const pressCoordinate = event.nativeEvent.coordinate;
    this.goToAddMarkerScreen(pressCoordinate);
  }

  onRegionChangeComplete = region => {
    this.setMarkers(region.latitude, region.longitude);
  }

  goToAddMarkerScreen = defaultCoordinates => {
    if(defaultCoordinates)
      return this.props.navigation.navigate('AddMarker', { defaultCoordinates });

    this.props.navigation.navigate('AddMarker');
  }

  goToMarkerScreen = marker => {
    this.props.navigation.navigate('MarkerScreen', { marker });
  }

  userMarker() {
    const { latitude, longitude } = this.state.position;

    if(latitude && longitude)
      return <Marker coordinate={this.state.position} />;
  }

  render() {
    return (
      <View>
        <StatusBar hidden />
        <MapView ref={el => this.map = el} style={styles.map} customMapStyle={mapStyle} onMapReady={this.onMapReady} onLongPress={this.onLongPress} onRegionChangeComplete={this.onRegionChangeComplete}>
          { this.userMarker() }
          {this.state.markers.map(marker => <ImageMarker key={marker._id + '_' + Date.now()} onPress={() => this.goToMarkerScreen(marker)} coordinate={{ latitude: marker.coordinates[1], longitude: marker.coordinates[0] }} imageName={marker.image_name} /> )}
        </MapView>
        <CircleButtonList onAddClick={this.goToAddMarkerScreen} onGPSClick={this.setCurrentPosition} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
});