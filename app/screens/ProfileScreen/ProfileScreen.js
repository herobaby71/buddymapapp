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
      console.log(this.props)
    if (this.props.user_prof.status==0){
		var temp = <Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >Status: </Text> Free </Text>
	}
	if (this.props.user_prof.faceboookAvatar==undefined){
		var pictureURI= <Avatar
						large icon={{name: 'face', color: 'gray', type: 'material-community', size:57}}  rounded activeOpacity = {0.85}/>
	}
	else{
		var pictureURI=<Image
				style={{width: 75, height: 75}}
				source={{uri: this.props.user_prof.faceboookAvatar}}
				/>
	}
	return(
      <View style = {{flex:1}}>
        <View style = {{backgroundColor: '#6fbbd7'}}>
          <View style={{height:15}} />
          <View style={styles.headerView}>
            <TouchableOpacity onPress={() => {Actions.pop()}}>
              <Icon name='chevron-left' style={styles.searchImage} type='entypo' color = '#696969' />
            </TouchableOpacity>
            <Text style={styles.titleText}>Profile</Text>
            <TouchableOpacity onPress={() => {Actions.pop()}}>
              <Icon name='chevron-right' style={styles.searchImage} type='entypo' color = '#6fbbd7' />
            </TouchableOpacity>
         </View>
        </View>
        <View style={{height:15}} />
  			<View style={{
  			  justifyContent:'center',
  			  alignItems: 'center'}}>
  			  {pictureURI}
  			</View>
  			<Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >Name:</Text> {this.props.user_prof.firstName} {this.props.user_prof.lastName}</Text>
  			<Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >Description:</Text>  {this.props.user_prof.description}</Text>
  			<Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >Status: </Text> {this.state.status[this.props.user_prof.status]} </Text>
  			<Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >Email: </Text> {this.props.user_prof.email}</Text>
  			<Text style={styles.paragraph}><Text style={{fontWeight:'bold'}} >BuddyCode: </Text> {this.props.user_prof.buddycode}</Text>
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
