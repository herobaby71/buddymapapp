import React, {Component} from 'react';
import { Text, TouchableOpacity, Platform} from 'react-native';
import { View } from 'react-native-animatable'
import { Avatar } from 'react-native-elements'
import { Constants, Location, Permissions} from 'expo';
import Popover, {PopoverTouchable} from 'react-native-modal-popover'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
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
      popoverAnimation:"bounceIn",
      popoverVisible:false,
      location: null,
      regionSet:false
    }
    navigator.geolocation.getCurrentPosition(location => {
        const { latitude, longitude } = location.coords
        const region = {
          ...this.state.region,
          latitude,
          longitude,
          latitudeDelta: 0.00411,
          longitudeDelta: 0.00211,
        }
        this.setState({location, region})
      }
    )
  }


  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.timer = setInterval(this._getLocationAsync, 500)
      this.timer = setInterval(this._postLocationAsync, 2000)
      this.timer = setInterval(this.getFriendsList, 2000)
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
  showPopover = () => {
    this.setState({popoverVisible:!this.state.popoverVisible})
  }

  render(){
    // Marker of Friends Location.
    let mymarker = <View></View>
    if(!_.isEmpty(this.state.location)){
      mymarker  =
        <MapView.Marker
          coordinate={{latitude:this.state.location.coords.latitude, longitude:this.state.location.coords.longitude}}
          title="My Marker"
          description="Mushi Mushi"
        />
    }
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
    return (
      <View style = {{flex:1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style= {{flex:1}}
          onMapReady={() => {
            this.setState({ regionSet: true });
          }}
          initialRegion={this.state.region}
        >
          {mymarker}
          {markers}
        </MapView>
        <TouchableOpacity style = {styles.avatarView} onPress={this.showPopover}>
           <Avatar large icon={{name: 'face', color: 'gray', type: 'material-community', size:57}}  rounded activeOpacity = {0.85}/>
        </TouchableOpacity>
        { this.state.popoverVisible &&
          <View animation="bounceIn" style={styles.bubbleView1}>
            <View style={styles.bubbleView3}>
              <PopoverTouchable>
                <TouchableOpacity style = {styles.bubble3} onPress={this.showPopover}>
                  <Avatar medium icon={{name: 'face', color: 'gray', type: 'material-community', size:15}}  rounded activeOpacity = {0.85}/>
                </TouchableOpacity>
                <Popover
                  contentStyle={styles.content}
                  arrowStyle={styles.arrow}
                  backgroundStyle={styles.popoverBackground}
                  contentStyle={styles.popoverContent}
                >
                  <Text>Poke Me!</Text>
                </Popover>
              </PopoverTouchable>
            </View>
            <View style={styles.bubbleView1}>
              <PopoverTouchable>
                <TouchableOpacity style = {styles.bubble1} onPress={this.showPopover}>
                  <Avatar medium icon={{name: 'face', color: 'gray', type: 'material-community', size:15}}  rounded activeOpacity = {0.85}/>
                </TouchableOpacity>
                <Popover
                  contentStyle={styles.content}
                  arrowStyle={styles.arrow}
                  backgroundStyle={styles.popoverBackground}
                  contentStyle={styles.popoverContent}
                  placement="bottom"
                >
                  <Text>Eat Me!</Text>
                </Popover>
              </PopoverTouchable>
            </View>
            <View style={styles.bubbleView2}>
              <PopoverTouchable>
                <TouchableOpacity style = {styles.bubble2} onPress={this.showPopover}>
                  <Avatar medium icon={{name: 'face', color: 'gray', type: 'material-community', size:15}}  rounded activeOpacity = {0.85}/>
                </TouchableOpacity>
                <Popover
                  contentStyle={styles.content}
                  arrowStyle={styles.arrow}
                  backgroundStyle={styles.popoverBackground}
                  contentStyle={styles.popoverContent}
                  placement="bottom"
                >
                  <Text>Hide Me!</Text>
                </Popover>
              </PopoverTouchable>
            </View>
          </View>
        }
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


// <TouchableOpacity style = {styles.bubble4} onPress={this.showPopover}>
//    <Avatar small icon={{name: 'face', color: 'gray', type: 'material-community', size:15}}  rounded activeOpacity = {0.85}/>
// </TouchableOpacity>
