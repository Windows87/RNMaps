/** @format */

import {AppRegistry} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Map from './components/Map';
import AddMarker from './components/AddMarker';
import MarkerScreen from './components/MarkerScreen';

import {name as appName} from './app.json';

const App = createStackNavigator({
  Map: { screen: Map },
  AddMarker: { screen: AddMarker },
  MarkerScreen: { screen: MarkerScreen }
});

AppRegistry.registerComponent(appName, () => App);