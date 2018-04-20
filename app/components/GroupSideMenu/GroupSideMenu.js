import React, {Component} from 'react'
import { View, Text} from 'react-native'
import styles from './styles'
import { Avatar } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'; //navigation
import { connect } from 'react-redux'

class GroupSideMenu extends Component{
  onItemSelected = item => {
    Actions[item.toLowerCase()]()
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }
  render(){
    const {onItemSelected, activeScene} = this.props
    const group = this.props.items[0].routes[0].params.group
    return(
      <View style={styles.Container}>
        <Avatar
          xlarge
          icon={{name: 'panda', color: 'gray', type: 'material-community', size:150}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Text style={styles.groupNameText}>{group.name}</Text>
        <Text style={styles.groupDescriptionText}>{group.description}</Text>
        <Text>Members Dropdown</Text>
        <Text style={[styles.text, (activeScene=='map') && styles.redtext]} onPress={() => this.onItemSelected('map')}></Text>
        <Text style={[styles.text, (activeScene=='profile') && styles.redtext]} onPress={() => this.onItemSelected('profile')}>Profile</Text>
      </View>
    );
  }
}
export default connect(null, null)(GroupSideMenu)
