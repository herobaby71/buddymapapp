import React, { Component } from 'react';
import { Text, TextInput,View, ScrollView, Image, Platform, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { fetchApi } from '../../services/api'
import { fetchFriendsFromAPI } from '../../data/friends/apis'
import { fetchRequestsFromAPI } from '../../data/friendrequests/apis'

import _ from 'lodash'
import styles from './styles'

class FriendScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      email:"",
      addFriendSuccess: false,
      friendRequestNotificationVisible:false
    }

    this.props.getFriendRequests()
    this.props.getFriends()
    // if(!_.isEmpty(this.props.credentials.tokens.access.value)){
    //   Actions.map()
    // }
  }

  redirectMap = () => {
    Actions.map()
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

  render(){
    console.log("hi:   2 1")
    console.log(JSON.stringify(this.props.friendrequests))
    console.log(JSON.stringify(this.props.friends))

    lst = []
    if ( this.props.friends.friends.length > 0 ) {
      console.log(this.props.friends.friends[0].firstName)
      for (var i = 0; i < this.props.friends.friends.length; i++){
        lst.push(<Text style={styles.paragraph2}>{this.props.friends.friends[i].firstName + " " + this.props.friends.friends[i].lastName}</Text>)
      }
    }
    //console.log(JSON.stringify(this.props.friends.friends[0].firstName))


    friendRequests = this.props.friendrequests.requests
    friendReqestsJSX = friendRequests.map((req) => {
      return (
        <TouchableOpacity id={req.id} onPress = {() => this.acceptRequest(req.id)}>
          <Text>User: {req.from_user}</Text>
          <Text>Message: {req.message}</Text>
        </TouchableOpacity>
      )
    })
    console.log(JSON.stringify(this.props.friendrequests))
      return(
      <View style = {styles.container}>
        <KeyboardAwareScrollView>
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
          <Text style={styles.title}>My Friend List</Text>
          <View>
            {lst}
          </View>
        </KeyboardAwareScrollView>
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
