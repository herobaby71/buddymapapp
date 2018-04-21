import React, { Component } from "react"
import { View, ScrollView, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native"
import { List, ListItem, SearchBar, ButtonGroup} from "react-native-elements"

import { Actions } from 'react-native-router-flux' //navigation
// import * as plateSelector from '../../data/plates/selector'
// import * as cartSelector from '../../data/cart/selector'

import styles from './styles'

import DateTimePicker from 'react-native-modal-datetime-picker';


//fix refreshing and load more (pages, seeds)
class NewEventScreen extends Component {
  constructor(props){
    super(props)
  }
  state = {
    isDateTimePickerVisible: false,
    nameOfEvent: "Enter text",
    //descriptionOfEvent: null,
    //locationOfEvent: null,
    dateOfEvent: null,
    //timeOfEvent: null,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    this.setState({dateOfEvent: date});
    console.log('the date stored is', this.state.dateOfEvent);
  }

  render(){
    //Redux Store State items
    return(
      <View style={{ top:50, flex: 1 }}>
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
    )
  }
}


export default NewEventScreen
