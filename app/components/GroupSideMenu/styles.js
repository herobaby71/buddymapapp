import {StyleSheet} from 'react-native'
import {Constants} from '../../themes/'
export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:50,
    alignItems: 'center',
    paddingLeft:20
  },
  text:{
    fontSize: 18,
    // fontFamily: 'CORBEL',
    marginTop: 20,
  },
  groupNameText:{
    fontSize: Constants.Font30,
  },
  groupDescriptionText:{
    fontSize: Constants.Font25,
  },
  redtext:{
    fontSize: 18,
    // fontFamily: 'CORBEL',
    color: '#fa7d64'
  },
 emailEntry: {
    flex:3,
    borderColor: '#696969',
    color: '#696969',
    paddingVertical: Constants.Harin1,

    borderWidth:1,
    borderRadius:5,
  },
    emailEntryContainer:{
    paddingRight: Constants.Marin5,
	
    flexDirection:'row',
  },
    addFriendButton:{
		flexDirection:'row',
		flex:1,
		
  },
    paragraph:{
	  top: Constants.Harin2,
	  right: Constants.Marin1,
	  textAlign: 'center',
  },
});
