import React, { Component } from "react"
import { View, ScrollView, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native"
import { List, ListItem, SearchBar, ButtonGroup} from "react-native-elements"
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux' //navigation
import styles from './styles'
// import * as plateSelector from '../../data/plates/selector'
// import * as cartSelector from '../../data/cart/selector'

//fix refreshing and load more (pages, seeds)
class ProfileScreen extends Component {
  constructor(props){
    super(props)

  }


  render(){
    //Redux Store State items
    return(
      <View style = {styles.container}>
        <Text style={styles.title}>PROFILE SCREEN</Text>
		<Text style={styles.paragraph}>Name: {this.props.user.user.firstName} {this.props.user.user.lastName}</Text>
		<Text style={styles.paragraph}>Email: {this.props.user.user.email}</Text>
		<Text style={styles.paragraph}>BuddyCode: {this.props.user.user.buddycode}</Text>
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