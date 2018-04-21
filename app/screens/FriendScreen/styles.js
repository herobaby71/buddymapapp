import { StyleSheet } from 'react-native';
import Constants from '../../themes/constants'

export default styles = StyleSheet.create({
  container:{top: Constants.Harin4, flex:1},
  emailEntryContainer:{
    marginLeft:Constants.Marin5,
    marginRight: Constants.Marin6,
    flexDirection:'row',
  },
  emailEntry: {
    flex:3,
    borderColor: '#696969',
    color: '#696969',
    paddingVertical: Constants.Harin2,

    borderWidth:1,
    borderRadius:10,
    paddingLeft:Constants.Harin3,
  },
  addFriendButton:{
    flex:1,
  },
  paragraph:{
	  position: 'absolute',
	  top: Constants.Harin2,
	  right: Constants.Marin1,
  },
  paragraph2: {
    margin: 5,
    fontSize: 20,
    textAlign: 'left',
  },

  title: {
    margin: 24,
    fontSize: 30,
    textAlign: 'center',
	color: 'rgb(111,187,215)',
  },
});
