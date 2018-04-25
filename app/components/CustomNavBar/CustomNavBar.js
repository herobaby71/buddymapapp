import React, { Component } from "react"
import { View, ScrollView, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native"
import { List, ListItem, SearchBar, ButtonGroup} from "react-native-elements"
import { connect } from 'react-redux'
import { Actions as Navigator} from 'react-native-router-flux' //navigation

class CustomNavBar extends Component {
  constructor(props){
    super(props)

  }

  render(){

    return(
      <View style = {{backgroundColor: '#6fbbd7'}}>
        <View style={{height:15}} />
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => {Navigator.pop()}}>
            <Icon name='chevron-left' style={styles.searchImage} type='material-community' color = '#696969' />
          </TouchableOpacity>
          <Text style={styles.titleText}>{this.props.title}</Text>
          <TouchableOpacity onPress={() => {Navigator.drawerOpen()}}>
            <Icon name='menu' style={styles.searchImage} type='entypo' color = '#696969' />
          </TouchableOpacity>
       </View>
      </View>
    )
  }
}


export default connect()(CustomNavBar)
