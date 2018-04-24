import React, {Component} from 'react'
import {TouchableOpacity, TextInput, View, Text} from 'react-native'
import Modal from 'react-native-modal'
import { MapView } from 'expo';

import { Actions } from 'react-native-router-flux' //navigation
// import * as plateSelector from '../../data/plates/selector'
// import * as cartSelector from '../../data/cart/selector'

//import styles from './styles'

import DateTimePicker from 'react-native-modal-datetime-picker';

class CreateGroupEventModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      isDateTimePickerVisible: false,
      locPickerVisibleWidth: 0,
      nameOfEvent: "Enter text",
      //descriptionOfEvent: null,
      locOfEventLat: 37.78825, //<-- default
      locOfEventLong: -122.4324,
      dateOfEvent: null
      //timeOfEvent: null
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _showLocPicker = () => this.setState({ locPickerVisibleWidth:200});
  _hideLocPicker = () => this.setState({ locPickerVisibleWidth:0});

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    this.setState({dateOfEvent: date});
    console.log('the date stored is', this.state.dateOfEvent);
  }

  componentWillReceiveProps(newProps) {
    //Handle props
    this.setState({modalVisible: newProps.modalVisible})
    if (typeof newProps.userLoc != 'undefined') {
      this.setState({
          locOfEventLat: newProps.userLoc.latitude,
          locOfEventLong: newProps.userLoc.longitude
        }); // this part def works!
        //console.log("area here was entered",this.state.locOfEventLat)
    }
  }

  _renderModalContent = () => (
      <View style = {this.props.containerStyle}>
        <Text> {"Name of Event:"}</Text>
        <TextInput
          placeholder = "Enter Text"
          value={this.state.nameOfEvent}
          onChangeText = { value => this.setState({nameOfEvent: value})}
        />
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        <TouchableOpacity onPress={this._showLocPicker}>
          <Text>Show LocPicker</Text>
        </TouchableOpacity>
        <MapView
        style={{position:"absolute",
                width: this.state.locPickerVisibleWidth,
                height: this.state.locPickerVisibleWidth
              }}
       initialRegion={{
         latitude: this.state.locOfEventLat,
         longitude: this.state.locOfEventLong,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }}
       />
      </View>
  );

  render(){
    return(
      <Modal
        isVisible={this.state.modalVisible}
        onBackdropPress={this.props.hideModal}
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


export default CreateGroupEventModal
