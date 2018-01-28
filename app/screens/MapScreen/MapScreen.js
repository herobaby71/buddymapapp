import React, {Component} from 'react';
import { Text, View, Platform} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import styles from './styles'

export default class MapScreen extends Component{
  constructor(props){
    super(props)
    state = {
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
    if(this.state.errorMessage){
      text = this.state.errorMessage
    }
    else if(this.state.location){
      text = JSON.stringify(this.state.location)
    }
    return (
      <View>
        <Text style={styles.paragraph}>{text}</Text>
      </View>

    );
  }
}
// <MapView
//   style={{ flex: 1 }}
//   initialRegion={{
//     latitude: 40.798214,
//     longitude: -77.85990,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   }}
// />
