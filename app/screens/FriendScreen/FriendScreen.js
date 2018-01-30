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
  state = {email:""}

  constructor(props){
    super(props)
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
  rejectRequests = () => {
    if(!_.isEmpty(this.props.friendrequests.requests)){
      requests = this.props.friendrequests.requests;
      requests.forEach(function(request){
        fetchApi(`api/friend/reject/`,payload = {id:request.id}, method = 'post', headers = {})
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
    text3 = JSON.stringify(this.props.friendrequests)
    text4 = JSON.stringify(this.props.friends)
    return(
      <View style = {styles.container}>
        <KeyboardAwareScrollView>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({email:text})}  underlineColorAndroid='rgba(0,0,0,0)' placeholder='Email Address' />
          <Text>Click the name of the person to add friend:</Text>
          <TouchableOpacity onPress={() => {this.setState({email:"AversiveBias@buddymap.com"}); this.addFriend()}}>
              <Text>AversiveBias@buddymap.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.setState({email:"deven298@buddymap.com"}); this.addFriend()}}>
              <Text>deven298@buddymap.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.setState({email:"adityapatelgithub@buddymap.com"}); this.addFriend()}}>
              <Text>adityapatelgithub@buddymap.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.setState({email:"apoorvas47@buddymap.com"}); this.addFriend()}}>
              <Text>apoorvas47@buddymap.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.setState({email:"tgt5@psu.edu"});this.addFriend()}}>
              <Text>tgt5@psu.edu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.setState({email:"herobaby71@buddymap.com"});this.addFriend()}}>
              <Text>herobaby71@buddymap.com</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.singinButton} onPress={this.acceptRequests}>
            <Text>Click To Accept All Friend Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.singinButton} onPress={this.getRequestList}>
            <Text>Click To get Friend Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.singinButton} onPress={this.getFriendsList}>
            <Text>Click To get Friend Lists</Text>
          </TouchableOpacity>
          <Text>Friend Requests That is Pending:</Text>
          <Text>{text3}</Text>
          <Text>Your Friends (Previously Added):</Text>
          <Text>{text4}</Text>
          <TouchableOpacity style={styles.singinButton} onPress={this.redirectMap}>
            <Text>Click To Go to Map Screen</Text>
          </TouchableOpacity>
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
