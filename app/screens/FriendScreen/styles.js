import { StyleSheet } from 'react-native';
import Constants from '../../themes/constants'

export default styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'white'},
  emailEntryContainer:{
    marginTop: Constants.Harin3,
    marginLeft:Constants.Marin5,
    marginRight: Constants.Marin6,
    flexDirection:'row',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Constants.Harin2,
    paddingHorizontal: Constants.Marin4
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  titleText:{
    color:'white',
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
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
    top: Constants.Harin4,
    fontSize: 30,
    textAlign: 'center',
	color: 'rgb(111,187,215)',
  },
});
