import React, {Component} from 'react'
import {TouchableOpacity, TextInput, View, Text, ScrollView} from 'react-native'
//import { MapView } from 'expo';
import MapView from 'react-native-maps'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux' //navigation

import {Icon } from 'react-native-elements'
import DateTimePicker from 'react-native-modal-datetime-picker';
import TimePicker from 'react-native-simple-time-picker';
import _ from 'lodash' // library that has something to check for empty objects

import styles from './styles'

class CreateGroupEventModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      isDatePickerVisible: false,
      locPickerVisibleWidth: 0,
      timePickerVisibleWidth: 0,
      locOfMap: {
        latitude: 37.788, // random loc near SF lol
        longitude: -122.43,
      }, // ignore this, needed to initialize map frame position
      groupNameForEvent: "", // used to be displayed instead of group id

      // ^^ARGUMENTS TO BE PASSED IN FOR API CALL TO MAKE NEW EVENT BELOW:
      groupIDForEvent: null, //^^number id?
      nameOfEvent: "", // ^^STRING
      descriptionOfEvent: "", // ^^STRING
      dateOfEvent: "mmm dd yyyy", // ^^STRING in form of mmm dd yyyy (ex of mmm: Apr, Oct, etc)
      locOfEvent: {
        latitude: 37.788825,
        longitude: -122.4324,
      }, // ^^DECIMAL FOR LAT AND LONG POSITION OF EVENT
      timeOfEvent: {
        hour24:0,
        minute:0
      } // ^^24 hour time
    }
  }

  componentWillReceiveProps(newProps) {
    //Handle props
    this.setState({modalVisible: newProps.modalVisible})
    if (!(_.isEmpty(newProps.userLoc))) {
      this.setState({
          locOfMap: {latitude: newProps.userLoc.latitude, longitude: newProps.userLoc.longitude}
        });
        //console.log("area here was entered",this.state.locOfMapLat)
    }
    if (!(_.isEmpty(newProps.group))) {
      this.setState({
          groupIDForEvent: newProps.group.id,
          groupNameForEvent: newProps.group.name
        });
    }
  }

  /*
  _createGroupsAPICall = () => {
    if(!_.isEmpty(this.props.friendrequests.requests)){ // Still need to make sure they don submit garbage!
        fetchApi(`api/friend/accept/`,payload = {id:request.id}, method = 'post', headers = {})
        .then(response => {
          console.log("Response to create Event:", response)
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
  */

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });
  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _showTimePicker = () => this.setState({ timePickerVisibleWidth:300});
  _hideTimePicker = () => this.setState({ timePickerVisibleWidth:0});

  _showLocPicker = () => this.setState({ locPickerVisibleWidth:350});
  _hideLocPicker = () => this.setState({ locPickerVisibleWidth:0});

  _handleDatePicked = (date) => {
    this._hideDatePicker();
    this.setState({dateOfEvent: date.toString().substring(4,15)});
    setTimeout(() => console.log('the date stored is', this.state.dateOfEvent), 1000)
  }

  // called whenever modal exited
  _resetAllStates = () => {
    this.setState({
      nameOfEvent: "", // ^^STRING
      descriptionOfEvent: "", // ^^STRING
      dateOfEvent: "yyyy-mm-dd", // ^^STRING in form of yyyy-mm-dd
      locOfEvent: {
        latitude: this.props.userLoc.latitude,
        longitude: this.props.userLoc.longitude,
      }, // ^^DECIMAL FOR LAT AND LONG POSITION OF EVENT
      timeOfEvent: {
        hour24:0,
        minute:0
      } // ^^24 hour time^
    })
  }

  _escapeModal = () => {
    if (this.state.locPickerVisibleWidth !== 0 || this.state.timePickerVisibleWidth !== 0) {
      this._hideLocPicker()
      this._hideTimePicker()
    }
    else {
      this._resetAllStates()
      this.props.hideModal()
    }
  }

  _createEventButtonAction = () => {
    // API CALL HERE:
    // this._createGroupsAPICall()
    this._escapeModal()
  }

  _renderModalContent = () => ( // jsx holder since its just returning a bunch of stuff

      <View style = {styles.modalContent}>
      <ScrollView>
        {/*Title */}
        <Text style={styles.title} > {"NEW GROUP EVENT"} </Text>

        {/*Selected Group*/}
        <Text style={styles.paragraph} >
        <Text style={styles.paragraphBold} > {"Selected Group: "} </Text>
          {this.state.groupNameForEvent}
        </Text>

        {/*Event Name*/}
        <View style={{flexDirection:'row'}}>
          <Text style={styles.paragraphBold}> {"Name:"} </Text>
          <TextInput
            style={styles.textInput}
            placeholder = "Enter Text"
            value={this.state.nameOfEvent}
            onChangeText = { value => this.setState({nameOfEvent: value})}/>
        </View>

        {/*Description*/}

        <View style={{flexDirection:'column'}}>
        <Text style={styles.paragraphBold} > {"Description:"} </Text>
        <TextInput
          style={styles.textInput2}
          placeholder = "Enter Text"
          value={this.state.descriptionOfEvent}
          onChangeText = { value => this.setState({descriptionOfEvent: value})}/>
        </View>

        {/*Location*/}
        <View style={{flexDirection:'row'}}>
          <Text style={styles.paragraphBold}> {"Location:"} </Text>
          <TouchableOpacity onPress={this._showLocPicker}>
            <Text style={styles.textInput} >{"SELECT"}</Text>
          </TouchableOpacity>
        </View>

        {/*Date*/}
        <View style={{flexDirection:'row'}}>
          <Text style={styles.paragraphBold}> {"Date:"} </Text>
           <TouchableOpacity onPress={this._showDatePicker}>
             <Text style={styles.textInput} >{"SELECT"}</Text>
           </TouchableOpacity>
           <DateTimePicker
             isVisible={this.state.isDatePickerVisible}
             onConfirm={this._handleDatePicked}
             onCancel={this._hideDatePicker}
           />
        </View>

        {/*Time*/}
        <View style={{flexDirection:'row'}}>
           <Text style={styles.paragraphBold}> {"Time:"} </Text>
           <TouchableOpacity onPress={this._showTimePicker}>
             <Text style={styles.textInput}>{"SELECT"}</Text>
           </TouchableOpacity>
        </View>

        {/*Create Event Button*/}
          <TouchableOpacity onPress={this._createEventButtonAction}>
            <Text style={styles.button}>{"Create"}</Text>
          </TouchableOpacity>

        {/* this map has to be kept last so it goes over everything else*/}
        {/*Time*/}
        <View style={{position:"absolute",
                       width: this.state.timePickerVisibleWidth,
                       height: 275,
                       backgroundColor: 'white'}}>

           <TimePicker
             selectedHours={this.state.timeOfEvent.hour24}
             selectedMinutes={this.state.timeOfEvent.minute}
             onChange={(hours, minutes) => this.setState({timeOfEvent: {hour24: hours, minute:minutes}})}
           />
           <TouchableOpacity onPress={this._hideTimePicker}>
             <Text style={styles.textInput} >{"Done"}</Text>
           </TouchableOpacity>
         </View>

        {/*LocationMAP*/}
          <MapView
          style={{position:"absolute",
                  width: this.state.locPickerVisibleWidth,
                  height: this.state.locPickerVisibleWidth}}
          initialRegion={{latitude: this.state.locOfMap.latitude,
                         longitude: this.state.locOfMap.longitude,
                         latitudeDelta: 0.009,
                         longitudeDelta: 0.009,}}>
         <MapView.Marker draggable
            coordinate={this.state.locOfMap}
            onDragEnd={(e) => this.setState({ locOfEvent: e.nativeEvent.coordinate })}/>
          <TouchableOpacity style={styles.arrowContainer} onPress={this._hideLocPicker}>
            <Icon name='chevron-left' type='entypo' color = '#696969' />
          </TouchableOpacity>
         </MapView>
        </ScrollView>
        </View>

  );

  render(){
    return(
      <Modal
        isVisible={this.state.modalVisible}
        onBackdropPress={this._escapeModal}
        backdropOpacity={.2}
        animationIn="fadeIn"
        animationOut="fadeOut"
        //onSwipe = {this.props.hideModal}
        //swipeDirection="left"
        onRequestClose={() =>{
          console.log("Modal Create Radius Event Close")
        }}
      >
        {this._renderModalContent()}
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupEventModal)
