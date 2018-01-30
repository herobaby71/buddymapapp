import React, {Component} from 'react';
import { Text, View, Platform} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import { connect } from 'react-redux'
import { postLocationToAPI } from '../../data/location/apis'
import { fetchFriendsFromAPI } from '../../data/friends/apis'
import { fetchApi } from '../../services/api'

import _ from 'lodash'
import styles from './styles'

class MapScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      location:null,
      errorMessage:null,
      region:{
        latitude:40.798214,
        longitude:-77.859909,
        latitudeDelta:0.00922,
        longitudeDelta:0.00421,
      }
    }
  }

  // componentDidMount(){
  //
  // }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.timer = setInterval(this._getLocationAsync, 500)
      this.timer = setInterval(this._postLocationAsync, 6000)
      this.timer = setInterval(this.getFriendsList, 6000)
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

  _postLocationAsync = async () =>  {
    if(!_.isEmpty(this.state.location)){
      fetchApi(`api/locator/update/`,payload = {longitude:this.state.location.coords.longitude, latitude:this.state.location.coords.latitude}, method = 'post', headers = {})
      .then(response => {
        console.log("Response Location:", response)
        if(response.success){
          console.log("success")
        }
        else{
          console.log("failure")
        }
      })
      .catch(error => {
        console.log("error",error)
      })
    }
  }

  getFriendsList = async () => {
    this.props.getFriends()
  }

  render(){
    // Marker of Friends Location.
    let friends = this.props.friends
    let markers = friends.map(friend => {
      console.log("friend:",friend)
      return (
        <MapView.Marker
          coordinate={{latitude:Number(friend.latitude), longitude:Number(friend.longitude)}}
          key = {friend.email}
          title= {friend.email}
          description="Mushi Mushi"
        />
      )
    })
    // Changing Current Location.
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
            initialRegion={this.state.region}
        >
          <MapView.Marker
            coordinate={{latitude:lat, longitude:long}}
            title="My Marker"
            description="Mushi Mushi"
          />
          {markers}
        </MapView>
      </View>

    );
  }
}
function mapStateToProps(state){
  return {
    credentials: state.services.session,
    location: state.data.location,
    friends: state.data.friends.friends
  }
}

function mapDispatchToProps(dispatch, email="", password="", token="", fbdata=null){
  return{
    postLocation: (coords) => dispatch(postLocationToAPI(coords)),
    getFriends: () => dispatch(fetchFriendsFromAPI())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
