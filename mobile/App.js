import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, ToastAndroid} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import mapStyle from './mapStyle';

const icons = {
  restaurant: require('./assets/icons/restaurant.png'),
  pizza: require('./assets/icons/pizza.png'),
  beer: require('./assets/icons/beer.png'),
};

export default class App extends Component {
  state = {
    position: {latitude: 0, longitude: 0, latitudeDelta: 0.009, longitudeDelta: 0.009},
    markers: [
      { id: 0, position: {latitude: -21.299528, longitude: -46.802008}, icon: 'restaurant'},
      { id: 1, position: {latitude: -21.3011826, longitude: -46.8013995}, icon: 'pizza' },
      { id: 2, position: {latitude: -21.3006872, longitude: -46.8023503}, icon: 'pizza' },
      { id: 3, position: {latitude: -21.3023355, longitude: -46.7979332}, icon: 'beer' },
      { id: 4, position: {latitude: -21.3040459, longitude: -46.7979534}, icon: 'beer' }
    ]
  }

  componentDidMount() {
    this.setCurrentPosition();
  }

  setCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (newPosition) => {
        const { latitude, longitude } = newPosition.coords;
        this.setState({ position: {...this.state.position, latitude, longitude} });
      },
      (error) => ToastAndroid.show(error, ToastAndroid.LONG),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );    
  }

  render() {
    return (
      <View>
        <StatusBar hidden />
        <MapView style={styles.map} customMapStyle={mapStyle} region={this.state.position}>
          <Marker coordinate={this.state.position} />
          { this.state.markers.map(marker => <Marker key={marker.id} coordinate={marker.position} image={icons[marker.icon]} />) }
        </MapView>
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
