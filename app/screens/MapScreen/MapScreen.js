import React, {Component} from 'react';
import { Text, TouchableOpacity, Platform, Alert} from 'react-native';
import ChatScreen from '../ChatScreen'
import Swiper from 'react-native-swiper'
import { View } from 'react-native-animatable'
import { Actions} from 'react-native-router-flux'; //navigation
import { Avatar, Icon } from 'react-native-elements'
import Modal from 'react-native-modal'
import CreateGroupModal from '../../components/CreateGroupModal'
import CreateGroupEventModal from '../../components/CreateGroupEventModal'
import CreateRadiusEventModal from '../../components/CreateRadiusEventModal'
import CustomSideMenu from '../../components/CustomSideMenu'
import SideMenu from 'react-native-side-menu';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import Popover, {PopoverTouchable} from 'react-native-modal-popover'
import { Constants, Location, Permissions} from 'expo';

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
import {WSService, getWebSocket} from '../../services/websocket'//websocket call to server

class MapScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      //for Swiper Compoenent (does not register unless the )
      groups:['Loading...'],
      groupsLoaded:false,

      //for status on the avatar and animation
      userStatus:-1,
      status:{0:"Free", 1:"Chill", 2:"Away", 3:"Busy", 4:"Hidden", 5:"Sleeping"},
      statusColor:{0:"green", 1:"aqua", 2:"red", 3:"red", 4:"darkgray", 5:"goldenrod"},
      ninjaMode:false,
      popoverAnimation:"bounceIn",
      popoverVisible:false,
      currentFriendVisible:false,
      currentFriendItem:{},

      //for utility bar
      utilityPopUp: false,

      //for google map
      location: null,
      regionSet:false,

      //for utility modals
      modalVisible:null,
      modalDict:{1:'groupModal',2:'radiusEventModal',3:'groupEventModal'},

      //for showing side menu or not
      isOpen:false,

      //For map (group) overlay
      currentGroupIndex: 0,

      //WebSocket Status
      locatorType:{0:'MSG', 1:'WARNING', 2:'GLOBAL', 5:'ENTER', 6:'LEAVE', 7:'JOIN'},
      userLocations:{},
      // 'denden':{"firstName":"Monny", "lastName":"HOHO", "longitude":"-77.857966", "latitude":"40.799120"}
    }

    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!!',
      });
    } else {
      // this.timer = setInterval(this.onSendLocator, 25000)
      this.timer = setInterval(this.getFriendsList, 12000)
      this.timer = setInterval(this._getLocationAsync, 500)
      // this.timer = setInterval(this._postLocationAsync, 1000)
      // this.timer = setInterval(validateAccessToken, 900000)
    }
    this.props.getUserInfo()
    this.props.getGroups()
    this.props.getFriends()

    this._isMounted = false;
    this._isAlright = null;

    setTimeout(()=> {
      if (!(_.isEmpty(this.props.user))){
        if(this.state.userStatus == -1){
          this.setState({userStatus:this.props.user.user.status})
        }
      }
    }, 1400)
  }
  componentWillReceiveProps(nextProps) {
    //Once group fetching is finished, update the local state
    if(!nextProps.groups.isFetching){
      let groups = nextProps.groups.groups
      var currentGroupList = groups.map(group => {
        return group.name
      })
      this.setState({groups: currentGroupList, groupsLoaded:true})
    }
  }

  componentDidMount(){
    this.swiper.scrollBy(0);
    navigator.geolocation.getCurrentPosition(location => {
        const { latitude, longitude } = location.coords
        const region = {
          ...this.state.region,
          latitude,
          longitude,
          latitudeDelta: 0.00411,
          longitudeDelta: 0.00211,
        }
        this.setState({location, region}) //note: even tho region not a state initially made, its being created now
      }
    )
    //Websocket implementation for getting locator of everyone in the group
    this.websocket = getWebSocket('locator/stream/')
    this.websocket.onopen = () =>{
      this.websocket.send(JSON.stringify({command:'join', group:1}))
    }
    if(!(_.isEmpty(this.props.groups.groups[this.state.currentGroupIndex]))){
      this.websocket.onopen = () =>{
        this.websocket.send(JSON.stringify({command:'join', group:this.props.groups.groups[this.state.currentGroupIndex].id}))
      }
    }
    this.websocket.onmessage = this.onReceiveLoc
  }

  onSendLocator = () => {
    // console.log(this.props.groups[this.state.currentGroupIndex])
    // console.log(this.props.groups)
    if(!(_.isEmpty(this.props.groups.groups[this.state.currentGroupIndex]))){
      var com = {command:'send', group: this.props.groups.groups[this.state.currentGroupIndex].id, longitude: this.state.location.coords.longitude, latitude: this.state.location.coords.latitude}
      console.log("send ",com)
      websocket = getWebSocket('locator/stream/')
      websocket.onopen = () => {
        websocket.send(JSON.stringify({command:'join', group:this.props.groups.groups[this.state.currentGroupIndex].id}))
        websocket.send(JSON.stringify(com))
      }
    }
  }

  onReceiveLoc = (event) => {
    // "LOC_type": settings.LOC_TYPE_MESSAGE,
    // "group": event["group_id"],
    // "buddycode": event["buddycode"],
    // "longitude": event["longitude"],
    // "latitude": event["latitude"],
    console.log("recv ",event.data)
    // console.log(this.props.user)
    var data = JSON.parse(event.data)
    if(data.buddycode != this.props.user.user.buddycode){
      if(this.state.locatorType[data.LOC_type] == 'MSG'){
        this.setState((previousState) => {
          return {
            userLocations:
            {...previousState.userLocations,
              [data.buddycode]:{
                firstName: data.firstName,
                lastName: data.lastName,
                longitude:data.longitude,
                latitude:data.latitude,
                buddycode:data.buddycode
              }
            }
          }
        })
      }
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

  goToFriendScreen = () => {
    Actions.friend() // change this later, also jus get rid of that chevron in general
  }

  goToUserProfile = () => {
    if(this.state.currentFriendVisible){
      var userProf = this.state.currentFriendItem
    }
    else{
      var userProf = this.props.user.user
    }
    Actions.profile({fromMap:true, user_prof:userProf})
  }

  showPopover = () => {
    this.setState({popoverVisible:!this.state.popoverVisible})
  }

  goToChat = () =>{
    Actions.chat({group:this.props.groups.groups[this.state.currentGroupIndex]})
	}

  goNinjaMode = () =>{
    if(this.state.ninjaMode){
      var newstatus = 0
    }
    else{
      var newstatus = 4
    }
    this.setState({ninjaMode:!this.state.ninjaMode, userStatus:newstatus})
    fetchApi(`api/account/change-status/`,payload = {status:newstatus}, method = 'post', headers = {})
    .then(response => {
      console.log("Successfully change user status:",response)
    })
    .catch(error => {
      console.log("error",error)
    })
    this.props.getUserInfo()
  }

  renderAvatar = () =>{
    // console.log(this.props.friends)
    if (!this.state.currentFriendVisible){
      if (!(_.isEmpty(this.props.user))){
        if(this.state.ninjaMode){
          var avatar = <TouchableOpacity style = {styles.avatarView} onPress={this.showPopover}>
             <Avatar large source={{uri:"https://i.pinimg.com/originals/ff/5d/54/ff5d544fc208ef60504af3b524c81b9d.jpg"}}
              rounded
              activeOpacity = {0.85}
              overlayContainerStyle={{backgroundColor: this.state.statusColor[this.state.userStatus]}}
              containerStyle={styles.avatarContainer}
              />
          </TouchableOpacity>
        }
        else{
          var avatar = <TouchableOpacity style = {styles.avatarView} onPress={this.showPopover}>
             <Avatar large source={{uri: this.props.user.user.faceboookAvatar}}
              rounded
              activeOpacity = {0.85}
              overlayContainerStyle={{backgroundColor: this.state.statusColor[this.state.userStatus]}}
              containerStyle={styles.avatarContainer}
              />
          </TouchableOpacity>
        }
      }
    	else{
        var avatar = <TouchableOpacity style = {styles.avatarView} onPress={this.showPopover}>
          <Avatar large icon={{name: 'face', color: 'gray', type: 'material-community', size:57}}  rounded activeOpacity = {0.85}/>
        </TouchableOpacity>
    	}
    }
    else{
      // console.log(this.state.currentFriendItem)
      if (!(_.isEmpty(this.state.currentFriendItem))){
        var avatar = <TouchableOpacity style = {styles.avatarView} onPress={this.showPopover}>
          <Avatar
          large
          rounded
          overlayContainerStyle={{backgroundColor: this.state.statusColor[this.state.currentFriendItem.status]}}
          containerStyle={styles.avatarContainer}
          source={{uri: this.state.currentFriendItem.faceboookAvatar}}
          activeOpacity = {0.85}/>
        </TouchableOpacity>
      }
      else{
        var avatar = <TouchableOpacity style = {styles.avatarView} onPress={this.showPopover}>
          <Avatar large icon={{name: 'face', color: 'gray', type: 'material-community', size:57}}  rounded activeOpacity = {0.85}/>
        </TouchableOpacity>
      }
    }
    return avatar
  }

  renderPokeButton = () =>{
    if(this.state.currentFriendVisible){
      var pokeJSX = <TouchableOpacity style = {styles.bubble3} onPress={this.pokeUser}>
        <Avatar medium icon={{name: 'hand-pointing-right', color: 'gray', type: 'material-community', size:23}}  rounded activeOpacity = {0.85}/>
      </TouchableOpacity>
    }
    else{
      var pokeJSX = <TouchableOpacity style = {styles.bubble3} onPress={this.goNinjaMode}>
        <Avatar medium icon={{name: 'ninja', color: 'gray', type: 'material-community', size:23}}  rounded activeOpacity = {0.85}/>
      </TouchableOpacity>
    }
    return pokeJSX
  }

  changeUserStatus = async () => {
    if (!(_.isEmpty(this.props.user))){
      oldstatus = this.props.user.user.status
      newstatus = (this.props.user.user.status +1)%6
      this.setState({userStatus:newstatus})
      fetchApi(`api/account/change-status/`,payload = {status:newstatus}, method = 'post', headers = {})
      .then(response => {
        console.log("Successfully change user status:",response)
      })
      .catch(error => {
        this.setState({userStatus:oldstatus})
      })
      this.props.getUserInfo()
    }
  }

  pokeUser = () => {
    console.log("called Poke Func")
    if (this.state.currentFriendVisible){
      fetchApi(`api/activity/poke/`,payload = {user_to:this.state.currentFriendItem.email}, method = 'post', headers = {})
      .then(response => {
        console.log("Successfully change user status:",response)
      })
      .catch(error => {
        console.log("error",error)
      })
    }
    Alert.alert(
      'Poked'.concat(" ",this.state.currentFriendItem.firstName , " ", this.state.currentFriendItem.lastName),
      '',
      [
        {text: 'OK', onPress: () => {}},
      ],
      { cancelable: false }
    )
  }

  render(){
    // Marker of Friends Location.
    // console.log("Me:", this.props.user.email)
    let mymarker = <View></View>
    if(!_.isEmpty(this.state.location)){
      mymarker  =
        <Marker
          coordinate={{latitude:this.state.location.coords.latitude, longitude:this.state.location.coords.longitude}}
          title= "My Marker"
          description= "Mushi Mush"
        >
          <Callout onPress={() => {console.log("Callout Pressed");this.setState({currentFriendVisible:false})} }>
              <Text>Its Me Mushi Mushi</Text>
              <Text>Free</Text>
          </Callout>
        </Marker>
    }

    //Create a Marker for every friends
    let friends = this.props.friends
    let markers = friends.map(friend => {
      if(this.state.status[friend.status] != "Hidden"){
        return (
          <Marker
            coordinate={{latitude:Number(friend.latitude), longitude:Number(friend.longitude)}}
            key = {friend.email}
            onCalloutPress={event => {console.log(event.nativeEvent)}}
            title= {friend.firstName.concat(" ", friend.lastName)}
            description={this.state.status[friend.status]}
          >
              <Callout onPress={() => {console.log("Callout Pressed");this.setState({currentFriendItem:friend, currentFriendVisible:true})} }>
                  <Text>{friend.firstName.concat(" ", friend.lastName)}</Text>
                  <Text>{this.state.status[friend.status]}</Text>
              </Callout>
          </Marker>
        )
      }
    })


    // var markers = Object.keys(this.state.userLocations).map((key) => {
    //   var friend = this.state.userLocations[key]
    //   console.log(friend)
    //   return (
    //     <Marker
    //       coordinate={{latitude:Number(friend["latitude"]), longitude:Number(friend["longitude"])}}
    //       key = {key}
    //       onCalloutPress={event => {console.log(event.nativeEvent)}}
    //       title= {friend["firstName"].concat(" ", friend["lastName"])}
    //       description={this.state.status[0]}
    //     >
    //         <Callout onPress={() => {console.log("Callout Pressed")}}>
    //             <Text>{friend["firstName"].concat(" ", friend["lastName"])}</Text>
    //             <Text>{this.state.status[0]}</Text>
    //         </Callout>
    //     </Marker>
    //   )
    // })

    //Groups for Group Swiper that shows groups at the bottom
    const groups= this.state.groups.map((group, key) => {
      return (
        <View key={key} style={styles.groupSelectTextView}>
          <TouchableOpacity onPress={this.goToChat}>
            <Text style={styles.groupSelectText}>{group}</Text>
          </TouchableOpacity>
        </View>
      )
    })


    //Initialize the menubar
    const menu = <CustomSideMenu activeScene="map" onItemSelected={this.onMenuItemSelected} />;

    return (
      <View style = {{flex:1}} ref="rootRef">
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.region}
          style= {{flex:1}}
          onMapReady={() => {
            this.setState({ regionSet: true });
          }}>
          {mymarker}
          {markers}
        </MapView>
        {this.renderAvatar()}

        { this.state.popoverVisible &&
          <View animation="bounceIn" style={styles.bubbleView1}>
            <View style={styles.bubbleView3}>
              {this.renderPokeButton()}
            </View>
            <View style={styles.bubbleView1}>
              <TouchableOpacity style = {styles.bubble1} onPress={this.changeUserStatus}>
                <Avatar medium icon={{name: 'face', color: 'gray', type: 'material-community', size:23}}  rounded activeOpacity = {0.85}/>
              </TouchableOpacity>
            </View>
            <View style={styles.bubbleView2}>
      				<TouchableOpacity style = {styles.bubble2} onPress={this.goToUserProfile}>
      				  <Avatar medium icon={{name: 'face-profile', color: 'gray', type: 'material-community', size:23}}  rounded activeOpacity = {0.85}/>
      				</TouchableOpacity>
			     </View>
          </View>
        }

        <View style ={styles.friendScreenArrowContainer}>
          <TouchableOpacity style={styles.friendScreenArrow} onPress = {this.goToFriendScreen}>
            <Icon name='chevron-right' type='entypo' color = '#696969' />
          </TouchableOpacity>
        </View>

        {this.state.utilityPopUp && <View  animation="bounceIn" style = {styles.utilityContainer}>
          <TouchableOpacity style = {styles.groupPlusButton} onPress = {() => {this.setState({modalVisible: 1})}}>
            <Icon raised
              name = 'account-multiple-plus'
              type = 'material-community'
              color= 'gray'
            />
          </TouchableOpacity>
          <TouchableOpacity style = {styles.radiusEventPlusButton} onPress = {() => {this.setState({modalVisible: 2})}} >
            <Icon raised
              name = 'map-marker-plus'
              type = 'material-community'
              color= 'gray'
            />
          </TouchableOpacity>
          <TouchableOpacity style = {styles.groupEventPlusButton} onPress = {() => {this.setState({modalVisible: 3})}}>
            <Icon raised
              name = 'calendar-plus'
              type = 'material-community'
              color= 'gray'
            />
          </TouchableOpacity>
        </View>}
        <View style = {styles.utilityPopUp}>
          <TouchableOpacity style = {styles.utilityPlusButton} onPress = {() => {this.setState({utilityPopUp: !this.state.utilityPopUp})}}>
            <Icon raised
              name = 'plus-circle'
              type = 'material-community'
              color= 'gray'
            />
          </TouchableOpacity>
        </View>

        <CreateGroupModal containerStyle={styles.modalContent} hideModal={() => {this.setState({modalVisible:null})}} modalVisible={this.state.modalVisible === 1} />
        <CreateRadiusEventModal containerStyle={styles.modalContent} hideModal={() => {this.setState({modalVisible:null})}} modalVisible={this.state.modalVisible === 2} />
        <CreateGroupEventModal containerStyle={styles.modalContent} userLoc= {this.state.region} hideModal={() => {this.setState({modalVisible:null})}} modalVisible={this.state.modalVisible === 3}/>

        <View style ={styles.groupSwiperContainer}>
          <Swiper
            key = {this.state.groups.length}
            ref='swiper'
            style ={styles.groupSwiper}
            height = {25}
            loop = {false}
            showsPagination= {false}
            showsButtons = {true}
            nextButton = {<Icon name='chevron-right' type='entypo' color = '#696969' />}
            prevButton = {<Icon name='chevron-left' type='entypo' color = '#696969' />}
            ref={(s: React.Element<Swiper>) => this.swiper = s}
            onMomentumScrollEnd={(e, state) => {
              this.setState({currentGroupIndex:state.index})
            }}>
            {groups}
          </Swiper>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.services.user.user,
    user_render: state.services.user,
    latest_group_id:state.services.messages.group_id,
    messages: state.services.messages.messages,
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

// <View style ={styles.infoBox}>
//   <View style={styles.infoBoxTextView}>
//     <Text style={styles.infoBoxText}>Status Message:</Text>
//     <Text style={styles.infoBoxText}>Distance:</Text>
//   </View>
// </View>

// <TouchableOpacity style = {styles.bubble4} onPress={this.showPopover}>
//    <Avatar small icon={{name: 'face', color: 'gray', type: 'material-community', size:15}}  rounded activeOpacity = {0.85}/>
// </TouchableOpacity>

// <PopoverTouchable>
//   <Popover
//     contentStyle={styles.content}
//     arrowStyle={styles.arrow}
//     backgroundStyle={styles.popoverBackground}
//     contentStyle={styles.popoverContent}
//     placement="bottom"
//   >
//     <Text>Eat Me!</Text>
//   </Popover>
// </PopoverTouchable>
