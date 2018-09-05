import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MarkersDAO from '../../utils/MarkersDAO';

export default class DeleteButton extends Component {
  markersDAO = new MarkersDAO();

  onPress = async () => {
  	try {
  	  await this.markersDAO.deleteMarker(this.props.id);
  	  this.props.onDelete();
  	} catch(error) {
  	  this.props.onError(error);
  	}
  }

  render() {
  	return (
  	  <TouchableOpacity onPress={this.onPress}>
  	    <Icon name="delete" size={25} color="black" style={{ marginRight: 8 }} />
  	  </TouchableOpacity>
  	);
  }
}