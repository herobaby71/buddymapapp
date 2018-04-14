import React, {Component} from 'react';
import { View, Text} from 'react-native'
import styles from './styles'
import { Actions} from 'react-native-router-flux'; //navigation

class CustomSideMenu extends Component{
  onItemSelected = item => {
    Actions[item.toLowerCase()]()
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }
  render(){
    const {onItemSelected, activeScene} = this.props
    return(
      <View style={styles.Container}>
        <Text style={[styles.text, (activeScene=='map') && styles.redtext]} onPress={() => this.onItemSelected('map')}>Home</Text>
        <Text style={[styles.text, (activeScene=='profile') && styles.redtext]} onPress={() => this.onItemSelected('profile')}>Profile</Text>
        <Text style={[styles.text, (activeScene=='notifications') && styles.redtext]} onPress={() => this.onItemSelected('notifications')}>Notifications</Text>
        <Text style={[styles.text, (activeScene=='groups') && styles.redtext]} onPress={() => this.onItemSelected('groups')}>Groups</Text>
        <Text style={[styles.text, (activeScene=='friend') && styles.redtext]} onPress={() => this.onItemSelected('friend')}>Friends</Text>
        <Text style={[styles.text, (activeScene=='logout') && styles.redtext]} onPress={() => this.onItemSelected('login')}>Logout</Text>
      </View>
    );
  }
}
export default CustomSideMenu
