import React, {Component} from 'react'
import {TouchableOpacity, TextInput, View, Text} from 'react-native'
import Modal from 'react-native-modal'

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
      nameOfEvent: "Enter text",
      //descriptionOfEvent: null,
      //locationOfEvent: null,
      dateOfEvent: null
      //timeOfEvent: null
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    this.setState({dateOfEvent: date});
    console.log('the date stored is', this.state.dateOfEvent);
  }

  componentWillReceiveProps(newProps) {
    //Handle props
    this.setState({modalVisible: newProps.modalVisible})
  }

  _renderModalContent = () => (
      <View style = {this.props.containerStyle}>
        <Text> NameofEvent </Text>
        <TextInput
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
        onSwipe = {this.props.hideModal}
        swipeDirection="left"
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
