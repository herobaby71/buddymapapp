import React, { Component } from "react"
import { View, ScrollView, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native"
import { List, ListItem, SearchBar, ButtonGroup} from "react-native-elements"
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux' //navigation
import { Avatar, Icon } from 'react-native-elements'
import styles from './styles'
// import * as plateSelector from '../../data/plates/selector'
// import * as cartSelector from '../../data/cart/selector'

//fix refreshing and load more (pages, seeds)
class ProfileScreen extends Component {
  constructor(props){
    super(props)
	this.state={
	  status:{0:"Free", 1:"Chill", 2:"Away", 3:"Busy", 4:"Hidden", 5:"Sleeping"},

	}
  }


  render(){
    //Redux Store State items
    if (this.props.user.user.status==0){
		var temp = <Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >Status: </Text> Free </Text>
	}
		if (this.props.user.user.faceboookAvatar==undefined){
			var pictureURI= <Avatar 
							large icon={{name: 'face', color: 'gray', type: 'material-community', size:57}}  rounded activeOpacity = {0.85}/>
		}
		else{
			var pictureURI=<Image
					style={{width: 100, height: 100}}
					source={{uri: this.props.user.user.faceboookAvatar}}
					/>
	}
	return(
	
      <View style = {styles.container}>
			 <TouchableOpacity style={styles.chevronArrow} onPress = {() => Actions.pop()}>
				<Icon name='chevron-left' type='entypo' color = '#696969' />
			</TouchableOpacity>
			<View style={{
			  justifyContent:'center',
			  alignItems: 'center'}}>
			  {pictureURI}
			</View>
			
			<Text style={styles.title}>PROFILE SCREEN</Text>
			<Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >Name:</Text> {this.props.user.user.firstName} {this.props.user.user.lastName}</Text>
			<Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >Description:</Text>  {this.props.user.user.description}</Text>
			<Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >Status: </Text> {this.state.status[this.props.user.user.status]} </Text>
			<Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >Email: </Text> {this.props.user.user.email}</Text>
			<Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >BuddyCode: </Text> {this.props.user.user.buddycode}</Text>
			
			
      </View>
	  
	  
	  
	  
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)