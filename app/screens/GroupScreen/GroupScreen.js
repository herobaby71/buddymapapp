import React, { Component } from "react"
import { View, ScrollView, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native"
import { List, ListItem, SearchBar, ButtonGroup} from "react-native-elements"
import CreateGroupModal from '../../components/CreateGroupModal'
import { Actions } from 'react-native-router-flux' //navigation
import { Avatar, Icon } from 'react-native-elements'
// import * as plateSelector from '../../data/plates/selector'
// import * as cartSelector from '../../data/cart/selector'

import styles from './styles'

//Communication with the server
import { connect } from 'react-redux'


class GroupScreen extends Component {
  constructor(props){
    super(props)
	this.state={
		modalVisible:null,
		modalDict:{1:'groupModal'},
	}
  }
  render(){
    //Redux Store State items
    return(
      <View style = {styles.container}>
        <Text style={styles.title}>GROUP SEARCH</Text>
		<TextInput style={styles.groupEntry} placeholder='Enter Group Name' />
		<Text>Are we making this search exact results or should we show close names?</Text>
		
		
		
		
		
		<TouchableOpacity style = {styles.addGroupButton} onPress = {() => {this.setState({modalVisible: 1})}}>
            <Icon raised
              name = 'account-multiple-plus'
              type = 'material-community'
              color= 'gray'
            />
			<Text>CREATE GROUP</Text>
		</TouchableOpacity>
		<CreateGroupModal containerStyle={styles.modalContent} hideModal={() => {this.setState({modalVisible:null})}} modalVisible={this.state.modalVisible === 1} />
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
export default connect(mapStateToProps, mapDispatchToProps)(GroupScreen)

