import React, {Component} from 'react';
import { TouchableOpacity, View, Text} from 'react-native'
import { Avatar } from 'react-native-elements'
import { Actions} from 'react-native-router-flux'; //navigation
import styles from './styles'

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
        <TouchableOpacity style={styles.logoView} onPress={() => this.onItemSelected('profile')}>
          <Avatar large icon={{name: 'face', color: 'gray', type: 'material-community', size:57}}  rounded activeOpacity = {0.85}/>
        </TouchableOpacity>
        <Text style={[styles.text, (activeScene=='map') && styles.redtext]} onPress={() => this.onItemSelected('map')}>Home</Text>
        <Text style={[styles.text, (activeScene=='profile') && styles.redtext]} onPress={() => this.onItemSelected('profile')}>Profile</Text>
        <Text style={[styles.text, (activeScene=='notifications') && styles.redtext]} onPress={() => this.onItemSelected('notifications')}>Notifications</Text>
        <Text style={[styles.text, (activeScene=='group') && styles.redtext]} onPress={() => this.onItemSelected('group')}>Groups</Text>
        <Text style={[styles.text, (activeScene=='friend') && styles.redtext]} onPress={() => this.onItemSelected('friend')}>Friends</Text>
        <Text style={[styles.text, (activeScene=='logout') && styles.redtext]} onPress={() => this.onItemSelected('login')}>Logout</Text>
      </View>
    );
  }
}
export default CustomSideMenu
