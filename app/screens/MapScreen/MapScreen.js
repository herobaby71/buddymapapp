import React, {Component} from 'react';
import { Text, View, Platform} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import _ from 'lodash'
import styles from './styles'

export default class MapScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      location:null,
      errorMessage:null
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render(){
    let text = 'Waiting...'
    let lat = 40.798214
    let long = -77.859909
    if(!_.isEmpty(this.state.errorMessage)){
      text = this.state.errorMessage
    }
    else if(!_.isEmpty(this.state.location)){
      text = JSON.stringify(this.state.location)
      lat = this.state.location.coords.latitude
      long = this.state.location.coords.longitude
    }
    return (
      <View style = {{flex:1}}>
        <MapView
            style= {{flex:1}}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            }}
        >
          <MapView.Marker
            coordinate={{latitude:lat, longitude:long}}
            title="My Marker"
            description="Some description"
          />
        </MapView>
      </View>

    );
  }
}

// <Text style={styles.paragraph}>{text}</Text>
