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
  }
});
