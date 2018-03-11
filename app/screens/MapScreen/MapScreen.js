import React, {Component} from 'react';
import { Text, TouchableOpacity, Platform} from 'react-native';
import ChatScreen from '../ChatScreen'
import Swiper from 'react-native-swiper'
import { View } from 'react-native-animatable'
import { Actions} from 'react-native-router-flux'; //navigation
import { Avatar, Icon } from 'react-native-elements'
import CreateGroupModal from '../../components/CreateGroupModal'
import CreateGroupEventModal from '../../components/CreateGroupEventModal'
import CreateRadiusEventModal from '../../components/CreateRadiusEventModal'
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

class MapScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      //for Swiper Compoenent (does not register unless the )
      groups:['Loading...'],
      groupsLoaded:false,

      //for status on the avatar and animation
      status:{0:"Free", 1:"Chill", 2:"Away", 3:"Busy", 4:"Hidden", 5:"Sleeping"},
      popoverAnimation:"bounceIn",
      popoverVisible:false,
      currentFriendVisible:-1,

      //for google map
      location: null,
      regionSet:false,

      //for utility modals
      modalVisible:null,
      modalDict:{1:'groupModal',2:'radiusEventModal',3:'groupEventModal'},
      //For map (group) overlay
      currentGroupIndex: 0,
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

  // incrementMapLayer = () => {
  //   this.setState({currentGroupIndex: (this.state.currentGroupIndex+1)%this.props.groups.groups.length})
  // }
  //
  // decrementMapLayer = () => {
  //   if(this.state.currentGroupIndex == 0){
  //     this.setState({currentGroupIndex: this.props.groups.groups.length-1})
  //   }
  //   else{
  //     this.setState({currentGroupIndex: (this.state.currentGroupIndex-1)%this.props.groups.groups.length})
  //   }
  // }

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

    //Create a Marker for every friends
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

        <View style = {styles.utilityContainer}>
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
          <TouchableOpacity style = {styles.utilityPlusButton} onPress = {() => {}}>
            <Icon raised
              name = 'plus-circle'
              type = 'material-community'
              color= 'gray'
            />
          </TouchableOpacity>
        </View>

        <CreateGroupModal hideModal={() => {this.setState({modalVisible:null})}} modalVisible={this.state.modalVisible === 1} />
        <CreateRadiusEventModal hideModal={() => {this.setState({modalVisible:null})}} modalVisible={this.state.modalVisible === 2} />
        <CreateGroupEventModal hideModal={() => {this.setState({modalVisible:null})}} modalVisible={this.state.modalVisible === 3} />

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
            }}
          >
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


// <TouchableOpacity style = {styles.bubble4} onPress={this.showPopover}>
//    <Avatar small icon={{name: 'face', color: 'gray', type: 'material-community', size:15}}  rounded activeOpacity = {0.85}/>
// </TouchableOpacity>
