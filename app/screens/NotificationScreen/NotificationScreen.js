import React, { Component } from "react"
import { View, ScrollView, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native"
import { List, ListItem, SearchBar, ButtonGroup} from "react-native-elements"
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux' //navigation
import { Avatar, Icon } from 'react-native-elements'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { fetchGroupsFromAPI } from '../../data/groups/apis'
// import * as plateSelector from '../../data/plates/selector'
// import * as cartSelector from '../../data/cart/selector'

import styles from './styles'

//fix refreshing and load more (pages, seeds)
class NotificationScreen extends Component {
  constructor(props){
    super(props)

  }

  render(){
    //Redux Store State items
    lst = []
    console.log(this.props.friendrequests)
    if ( this.props.friendrequests.requests.length > 0) {
      //console.log(this.props.friends.friends[0].firstName)
      for (var i = 0; i < this.props.friendrequests.requests.length; i++){
        lst.push(<Text style={styles.paragraph2}>{this.props.friendrequests.requests[i]}</Text>)
      }
    }
    console.log("1", lst)
    return(
      <View style = {styles.container}>
       <KeyboardAwareScrollView>
        <Text style={styles.title}>NOTIFICATIONS</Text>
        <View>{lst}</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
