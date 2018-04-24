import React, { Component } from "react"
import { View, ScrollView, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native"
import { List, ListItem, SearchBar, ButtonGroup} from "react-native-elements"

import { Actions } from 'react-native-router-flux' //navigation
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
    return(
      <View style = {styles.container}>
		  <Text style = {styles.notificationTitle}>Notifications:</Text>
        
      </View>
    )
  }
}


export default NotificationScreen
