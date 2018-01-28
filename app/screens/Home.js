import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

export default class MapScreen extends Component{
  render(){
    return (
      <View style= {{flex:1}}>
        <MapView
            style= {{flex:1}}
            initialRegion={{
              latitude: 40.798214,
              longitude: -77.859909,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
        />
      </View>
    );
  }
}
