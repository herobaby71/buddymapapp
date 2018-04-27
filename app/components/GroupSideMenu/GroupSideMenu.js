import React, {Component} from 'react'
import { View, ScrollView, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native"
import styles from './styles'
import { Avatar } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'; //navigation
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import  MapScreen  from '../../screens/MapScreen'
import _ from 'lodash'
import { fetchApi } from '../../services/api'
class GroupSideMenu extends Component{
  onItemSelected = item => {
    Actions[item.toLowerCase()]()
    this.setState({
		email:"",
      isOpen: false,
      selectedItem: item,
    });
  }
  addMember(){
    if(!_.isEmpty(this.state.email)){
      fetchApi(`api/group/adduser/`,payload = {user_email:this.state.email, group_id:this.props.items[0].routes[0].params.group.id}, method = 'post', headers = {})
      .then(response => {
        console.log("Response Add Member to Group:", response)
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

	lst = []
	console.log("HERE ",this.props.members )
    if ( this.props.groups.groups.length> 0 ) {
      //console.log(this.props.friends.friends[0].firstName)
      for (var i = 0; i < this.props.groups.groups.length; i++){
        lst.push(<Text key={i} style={styles.paragraph2}>{this.props.groups.groups[i].name}</Text>)
      }
    }
    const {onItemSelected, activeScene} = this.props
    const group = this.props.items[0].routes[0].params.group
    return(
      <View style={styles.Container}>
        <Avatar
          xlarge
          icon={{name: 'panda', color: 'gray', type: 'material-community', size:150}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Text style={styles.groupNameText}>{group.name}</Text>
        <Text style={styles.groupDescriptionText}>{group.description}</Text>
		<Text style={styles.title}>GROUP MEMBERS</Text>

		<KeyboardAwareScrollView>
        <View>{lst}</View>
        </KeyboardAwareScrollView>
		<View style={styles.emailEntryContainer}>
            <TextInput style={styles.emailEntry} onChangeText={(text) => this.setState({email:text})} placeholder='Enter Friend Email' />

          </View>
		  <TouchableOpacity style = {styles.addFriendButton} onPress = {() => {this.addMember(); }}>
              <Text style={styles.paragraph}>Add Member</Text>
            </TouchableOpacity>
		{/*<Text style={[styles.text, (activeScene=='profile') && styles.redtext]} onPress={() => this.onItemSelected('profile')}>Members</Text>*/}
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
	members: state.data.members
  }
}

function mapDispatchToProps(dispatch){
  return{
    postLocation: (coords) => dispatch(postLocationToAPI(coords)),
    getFriends: () => dispatch(fetchFriendsFromAPI()),
    getGroups: () => dispatch(fetchGroupsFromAPI()),
	getMembers: () => dispatch(GetUsersInGroup()),
    getUserInfo: () => dispatch(getUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupSideMenu)
