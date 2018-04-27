import React, { Component } from 'react';
import { Text, FlatList, TextInput, View, ScrollView, Image, Platform, TouchableOpacity, ActivityIndicator} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { fetchApi } from '../../services/api'
import {Icon} from 'react-native-elements'
import { fetchFriendsFromAPI } from '../../data/friends/apis'
import { fetchRequestsFromAPI } from '../../data/friendrequests/apis'
import _ from 'lodash'
import styles from './styles'

class FriendScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      email:"",
      searchPhrase:"",
      friends:[],
      addFriendSuccess: false,
      friendRequestNotificationVisible:false
    }

    this.props.getFriendRequests()
    setTimeout(()=> {
      if (!(_.isEmpty(this.props.friends))){
        this.setState({friends:this.props.friends.friends})
      }
    }, 500)
    // this.props.getFriends()
    // if(!_.isEmpty(this.props.credentials.tokens.access.value)){
    //   Actions.map()
    // }
  }

  getRequestList = () => {
    this.props.getFriendRequests()
  }

  getFriendsList = () => {
    this.props.getFriends()
  }

  acceptRequests = () => {
    if(!_.isEmpty(this.props.friendrequests.requests)){
      requests = this.props.friendrequests.requests;
      requests.forEach(function(request){
        fetchApi(`api/friend/accept/`,payload = {id:request.id}, method = 'post', headers = {})
        .then(response => {
          console.log("Response Accept Friend:", response)
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
      })
    }
  }

  acceptRequest(req_id){
    fetchApi(`api/friend/accept/`,payload = {id:req_id}, method = 'post', headers = {})
    .then(response => {
      console.log("Response Accept Friend:", response)
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

  rejectRequests = () => {
    if(!_.isEmpty(this.props.friendrequests.requests)){
      requests = this.props.friendrequests.requests;
      requests.forEach(function(request){
        fetchApi(`api/friend/reject/`,payload = {id:request.id}, method = 'post', headers = {})
        .then(response => {
          console.log("Response Accept Friend:", response)
          if(response.success){
            this.state({addFriendSuccess:true})
          }
          else{
            this.state({addFriendSuccess:false})
          }
        })
        .catch(error => {
          console.log("error",error)
        })
      })
    }
  }

  addFriend(){
    if(!_.isEmpty(this.state.email)){
      fetchApi(`api/friend/add/`,payload = {user_email:this.state.email}, method = 'post', headers = {})
      .then(response => {
        console.log("Response Add Friend:", response)
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

  goToUserProfile(userProf){
    console.log("entered here")
    console.log(userProf)
    Actions.profile({user_prof:userProf})
  }

  handleSearchFriend = (text) =>{
    newFriendList = []
    if (!_.isEmpty(this.props.friends)) {
      for (var i = 0; i < this.props.friends.friends.length; i++){
        if(this.props.friends.friends[i].buddycode.search(text) != -1 || this.props.friends.friends[i].firstName.search(text) != -1 || this.props.friends.friends[i].lastName.search(text) != -1 || this.props.friends.friends[i].email.search(text) != -1){
          console.log("found")
          newFriendList.push(this.props.friends.friends[i])
        }
      }
    }
    setTimeout(()=> {
      this.setState({friends: newFriendList})
    }, 100)
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.getFriendsList();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar
      lightTheme
      platform="ios"
      onChangeText={this.handleSearchFriend}
      cancelButtonTitle="Cancel"
      placeholder='Search Messages ...' />
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render(){
    // console.log("hi:   2 1")
    // console.log(JSON.stringify(this.props.friendrequests))
    // console.log(JSON.stringify(this.props.friends))

    // lst = []
    // if ( this.props.friends.friends.length > 0 ) {
    //   console.log(this.props.friends.friends[0].firstName)
    //   for (var i = 0; i < this.props.friends.friends.length; i++){
    //     lst.push(<Text key={i} style={styles.paragraph2}>{this.props.friends.friends[i].firstName + " " + this.props.friends.friends[i].lastName}</Text>)
    //   }
    // }
    //console.log(JSON.stringify(this.props.friends.friends[0].firstName))

    if(!(_.isEmpty(this.props.friendrequests))){
      friendRequests = this.props.friendrequests.requests
    }
    friendReqestsJSX = friendRequests.map((req) => {
      // console.log(req)
      return (
        <TouchableOpacity id={req.id} onPress = {() => this.acceptRequest(req.id)}>
          <Text>User: {req.from_user.email}</Text>
          <Text>Message: {req.message}</Text>
        </TouchableOpacity>
      )
    })
    // console.log(JSON.stringify(this.props.friendrequests))
      return(
      <View style = {styles.container}>
        <View style = {{backgroundColor: '#6fbbd7'}}>
          <View style={{height:15}} />
          <View style={styles.headerView}>
            <TouchableOpacity onPress={() => {Actions.drawerOpen()}}>
              <Icon name='menu' style={styles.searchImage} type='entypo' color = '#696969' />
            </TouchableOpacity>
            <Text style={styles.titleText}>Friend List</Text>
            <View></View>
         </View>
        </View>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.friends}
              renderItem={({ item }) => (
                <TouchableOpacity onPress = {() => this.goToUserProfile(item)}>
                  <ListItem
                    roundAvatar
                    title={`${item.firstName} ${item.lastName} (${item.buddycode})`}
                    subtitle={item.email}
                    avatar={{ uri: item.faceboookAvatar }}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.email}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
          </List>

          <View style={styles.emailEntryContainer}>
            <TextInput style={styles.emailEntry} onChangeText={(text) => this.setState({email:text})}  underlineColorAndroid='rgba(0,0,0,0)' placeholder='Email Address' />
            <TouchableOpacity style = {styles.addFriendButton} onPress = {() => {this.addFriend(); this.setState({friendRequestNotificationVisible:true})}}>
              <Text style={styles.paragraph}>	Add Friend</Text>
            </TouchableOpacity>
          </View>
          {this.state.friendRequestNotificationVisible && this.state.addFriendSuccess &&
            <Text>Successfuly sent friend request</Text>}
          {this.state.friendRequestNotificationVisible && !this.state.addFriendSuccess &&
            <Text>User does not exist!</Text>}
          {friendReqestsJSX}
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    credentials: state.services.session,
    friendrequests: state.data.friendrequests,
    friends: state.data.friends
  }
}

function mapDispatchToProps(dispatch){
  return{
    getFriendRequests: () => dispatch(fetchRequestsFromAPI()),
    getFriends: () => dispatch(fetchFriendsFromAPI())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FriendScreen)
// <View>
//   {lst}
// </View>
