import React, { Component } from "react"
import { Alert, View, ScrollView, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native"
import { Icon, List, ListItem, SearchBar, ButtonGroup} from "react-native-elements"
import Modal from 'react-native-modal'
import SendMessageModal from '../../components/SendMessageModal'
import { fetchFriendsFromAPI } from '../../data/friends/apis'
import { fetchRequestsFromAPI } from '../../data/friendrequests/apis'
import { fetchApi } from '../../services/api'
import { Actions } from 'react-native-router-flux' //navigation
import Constants from '../../themes/constants'
import { connect } from 'react-redux'
// import * as plateSelector from '../../data/plates/selector'
// import * as cartSelector from '../../data/cart/selector'

import styles from './styles'

//fix refreshing and load more (pages, seeds)
class NotificationScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      activities:{},
      friendRequests:{},
      modalVisible:false,
      modalVisible2:false,
      indexMsg:0
    }
    this.fetchActivitiesFromAPI()
    this.props.getFriendRequests()
  }

  handleLoadMore = () =>{
    this.fetchActivitiesFromAPI()
  }

  messageUserAPI = (message) => {
    fetchApi(`api/activity/message/`,payload = {user_to:this.state.activities.messages[this.state.indexMsg].user_from.email, message}, method = 'post', headers = {})
    .then(response => {
      console.log("Successfully change user status:",response)
    })
    .catch(error => {
      console.log("error",error)
    })
  }

  acceptRequest_(req_id){
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
    this.props.getFriendRequests()
  }

  rejectRequest_ = (req_id) => {
    fetchApi(`api/friend/reject/`,payload = {id:req_id}, method = 'post', headers = {})
    .then(response => {
      console.log("Response Reject Friend:", response)
      if(response.success){
        console.log("success")
      }
      else{
        console.log("failed to reject")
      }
    })
    .catch(error => {
      console.log("error",error)
    })
  }

  acceptRequest(req_id){
    Alert.alert(
      'Add Me as Friend.',
      '',
      [
        {text: 'Accept', onPress: () => {this.acceptRequest_(req_id)}},
        {text: 'Reject', onPress: () => {this.rejectRequest_(req_id)}},
      ],
      { cancelable: true }
    )
  }

  pokeUser = (user) =>{
    fetchApi(`api/activity/poke/`,payload = {user_to:user.email}, method = 'post', headers = {})
    .then(response => {
      console.log("Successfully change user status:",response)
    })
    .catch(error => {
      console.log("error",error)
    })
    Alert.alert(
      'Poked'.concat(" ", user.firstName , " ", user.lastName),
      '',
      [
        {text: 'OK', onPress: () => {}},
      ],
      { cancelable: false }
    )
  }

  fetchActivitiesFromAPI = () => {
    fetchApi(`api/activity/get/activities/`,payload = {}, method = 'get', headers = {})
    .then(response => {
      if(response.success){
        console.log("fetch activity from api success")
        this.setState({activities: response.activities})
      }
      else{
        console.log("failed to fetch activity")
      }
    })
    .catch(error => {
      throw error
    })
  }
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
  renderHeaderMsg = () => {
    return <SearchBar
      lightTheme
      platform="ios"
      onChangeText={this.handleSearchFriend}
      cancelButtonTitle="Cancel"
      placeholder='Search Messages, Friend Requests, or Pokes...' />
  };

  renderHeaderPoke = () => {
    return <Divider style={{ backgroundColor: 'blue' }} />
  };

  render(){
    //Redux Store State items
    console.log(this.props.friendrequests.requests)
    return(
      <View style = {styles.container}>
        <View style = {{backgroundColor: '#6fbbd7'}}>
          <View style={{height:15}} />
          <View style={styles.headerView}>
            <TouchableOpacity onPress={() => {Actions.drawerOpen()}}>
              <Icon name='menu' style={styles.searchImage} type='entypo' color = '#696969' />
            </TouchableOpacity>
            <Text style={styles.titleText}>Notifications</Text>
            <TouchableOpacity onPress={() => {Actions.pop()}}>
              <Icon name='chevron-left' style={styles.searchImage} type='material-community' color = '#6fbbd7' />
            </TouchableOpacity>
         </View>
        </View>
        <ScrollView>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.activities.messages}
              renderItem={({ item }) => (
                <TouchableOpacity onPress = {(item) => {this.setState({modalVisible:!this.state.modalVisible})}}>
                  <ListItem
                    roundAvatar
                    title={`${item.user_from.firstName} ${item.user_from.lastName}`}
                    subtitle={item.message}
                    rightIcon={{name:'message'}}
                    avatar={{ uri: item.user_from.faceboookAvatar }}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item,index) => index}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeaderMsg}
              ListFooterComponent={this.renderFooter}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
          </List>
          <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.activities.pokes}
              renderItem={({ item }) => (
                <TouchableOpacity onPress = {() => {this.pokeUser(item.user_from)}}>
                  <ListItem
                    roundAvatar
                    title={`${item.user_from.firstName} ${item.user_from.lastName}`}
                    subtitle={'poke poke poke'}
                    rightIcon={{name:'face'}}
                    avatar={{ uri: item.user_from.faceboookAvatar }}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item,index) => index}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
          </List>
          <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.props.friendrequests.requests}
              renderItem={({ item }) => (
                <TouchableOpacity onPress = {() => {this.acceptRequest(item.id)}}>
                  <ListItem
                    roundAvatar
                    title={`${item.from_user.firstName} ${item.from_user.lastName}`}
                    subtitle={`Add me as friend Senpai!`}
                    rightIcon={{name:'chevron-right'}}
                    avatar={{ uri: item.from_user.faceboookAvatar }}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item,index) => index}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
          </List>
          <SendMessageModal containerStyle={styles.modalContent} messageFunc={this.messageUserAPI} hideModal={() => {this.setState({modalVisible:!this.state.modalVisible})}} modalVisible={this.state.modalVisible}/>
        </ScrollView>
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
