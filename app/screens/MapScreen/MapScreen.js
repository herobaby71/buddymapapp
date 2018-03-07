import React, {Component} from 'react';
import { Text, TouchableOpacity, Platform} from 'react-native';
import { View } from 'react-native-animatable'
import { Avatar, Icon } from 'react-native-elements'
import { Constants, Location, Permissions} from 'expo';
import Popover, {PopoverTouchable} from 'react-native-modal-popover'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Actions} from 'react-native-router-flux'; //navigation

//Communication with the server
import { connect } from 'react-redux'
import { postLocationToAPI } from '../../data/location/apis'
import { fetchFriendsFromAPI } from '../../data/friends/apis'
import { fetchGroupsFromAPI } from '../../data/groups/apis'
import { fetchApi } from '../../services/api'
import { validateAccessToken } from '../../services/session'
import { getUser } from '../../services/user'

import _ from 'lodash'
import styles from './styles'

class MapScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      status:{0:"Free", 1:"Chill", 2:"Away", 3:"Busy", 4:"Hidden", 5:"Sleeping"},
      popoverAnimation:"bounceIn",
      currentGroupIndex: 0,
      popoverVisible:false,
      currentFriendVisible:-1,
      location: null,
      regionSet:false
    }
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!!',
      });
    } else {
      this.timer = setInterval(this._getLocationAsync, 200)
      // this.timer = setInterval(this._postLocationAsync, 1000)
      // this.timer = setInterval(this.getFriendsList, 1000)
      // this.timer = setInterval(validateAccessToken, 900000)
    }
    this.props.getUserInfo()
    this.props.getGroups()
  }
  componentDidMount(){
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

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    if(this.refs.rootRef)
      this.setState({ location });
  };

  _postLocationAsync = async () =>  {
    // console.log("User:", this.props.user.email)
    if(!_.isEmpty(this.state.location)){
      fetchApi(`api/locator/update/`,payload = {longitude:this.state.location.coords.longitude, latitude:this.state.location.coords.latitude}, method = 'post', headers = {})
      .then(response => {
        if(response.success){
        }
        else{
        }
      })
      .catch(error => {
        console.log("error",error)
        throw error
      })
    }
  }

  getFriendsList = async () => {
    this.props.getFriends()
  }

  showPopover = () => {
    this.setState({popoverVisible:!this.state.popoverVisible})
  }

  incrementMapLayer = () => {
    this.setState({currentGroupIndex: (this.state.currentGroupIndex+1)%this.props.groups.groups.length})
  }

  decrementMapLayer = () => {
    if(this.state.currentGroupIndex == 0){
      this.setState({currentGroupIndex: this.props.groups.groups.length-1})
    }
    else{
      this.setState({currentGroupIndex: (this.state.currentGroupIndex-1)%this.props.groups.groups.length})
    }
  }

  goToChat = () =>{
    Actions.chat({group:this.props.groups.groups[this.state.currentGroupIndex]})
  }

  render(){
    // Marker of Friends Location.
    // console.log("Me:", this.props.user.email)
    let mymarker = <View></View>
    if(!_.isEmpty(this.state.location)){
      mymarker  =
        <MapView.Marker
          coordinate={{latitude:this.state.location.coords.latitude, longitude:this.state.location.coords.longitude}}
          title= "My Marker"
          description= "Mushi Mush"
        />
    }
    let friends = this.props.friends
    let markers = friends.map(friend => {
      return (
        <Marker
          coordinate={{latitude:Number(friend.latitude), longitude:Number(friend.longitude)}}
          key = {friend.email}
          onCalloutPress={event => {console.log(event.nativeEvent)}}
          title= {friend.firstName.concat(" ", friend.lastName)}
          description={this.state.status[friend.status]}
        >
            <Callout onPress={() => {console.log("Callout Pressed")}}>
                <Text>{friend.firstName.concat(" ", friend.lastName)}</Text>
                <Text>{this.state.status[friend.status]}</Text>
            </Callout>
        </Marker>
      )
    })
    var currentGroupShow = ['Loading...']//[{id:-1,name:'Loading'}]
    if(!this.props.groups.isFetching){
      let groups = this.props.groups.groups
      currentGroupShow = groups.map(group => {
        return group.name
      })
    }
    return (
      <View style = {{flex:1}} ref="rootRef">
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.region}
          style= {{flex:1}}
          onMapReady={() => {
            this.setState({ regionSet: true });
          }}
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
        <View style ={styles.infoBox}>
          <View style={styles.infoBoxTextView}>
            <Text style={styles.infoBoxText}>Status Message:</Text>
            <Text style={styles.infoBoxText}>Distance:</Text>
          </View>
        </View>
        <View style ={styles.groupSelect}>
          <TouchableOpacity style={styles.leftChevron} onPress={this.decrementMapLayer}>
            <Icon name='chevron-left' type='entypo' color = '#696969' />
          </TouchableOpacity>
          <View style={styles.groupSelectTextView}>
            <TouchableOpacity onPress={this.goToChat}>
              <Text style={styles.groupSelectText}>{currentGroupShow}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.rightChevron} onPress={this.incrementMapLayer}>
            <Icon name='chevron-right' type='entypo' color = '#696969' />
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}
function mapStateToProps(state){
  return {
    user: state.services.user.user,
    location: state.data.location,
    friends: state.data.friends.friends,
    groups: state.data.groups,
  }
}

function mapDispatchToProps(dispatch){
  return{
    postLocation: (coords) => dispatch(postLocationToAPI(coords)),
    getFriends: () => dispatch(fetchFriendsFromAPI()),
    getGroups: () => dispatch(fetchGroupsFromAPI()),
    getUserInfo: () => dispatch(getUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)


// <TouchableOpacity style = {styles.bubble4} onPress={this.showPopover}>
//    <Avatar small icon={{name: 'face', color: 'gray', type: 'material-community', size:15}}  rounded activeOpacity = {0.85}/>
// </TouchableOpacity>
