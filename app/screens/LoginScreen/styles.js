import { StyleSheet } from 'react-native';
import Constants from '../../themes/constants'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.Harin10,
  },
  backgroundImage:{
    position:'absolute',
    width:Constants.width,
    height:Constants.height,
  },
  imageBackgroundBlur:{
    position:'absolute',
    width:Constants.width,
    height:Constants.height,
  },
  logoView:{
    alignItems:'center'
  },
  buttonGroupContainer:{
    height: Constants.Harin7,
    borderRadius:10,
    marginTop:Constants.Harin3,
    marginLeft:Constants.Marin2,
    marginRight:Constants.Marin2,
  },
  contentContainer:{
    borderRadius:16,
    marginTop:Constants.Marin3,
    marginLeft:Constants.Marine1,
    marginRight:Constants.Marine1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  textInput:{
    borderColor: '#696969',
    color: '#696969',
    paddingVertical: Constants.Harin2,

    marginTop:Constants.Marin2,
    marginLeft:Constants.Marin5,
    marginRight:Constants.Marin5,

    borderWidth:1,
    borderRadius:3,
    paddingLeft:Constants.Harin3,
    // shadowOffset:{  width: 1,  height: 2,  },
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
  },
  nameView:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',

    marginTop:Constants.Harin2,
    marginLeft:Constants.Marin5,
    marginRight:Constants.Marin5,
  },
  nameTextInput:{
    flex:1,
    borderColor: '#696969',
    color: '#696969',
    paddingVertical: Constants.Harin2,

    borderWidth:1,
    borderRadius:10,
    paddingLeft:Constants.Harin3,
  },
  signInButton:{
    backgroundColor: '#e5f9ef',
    borderColor: '#919191',

    paddingVertical: Constants.Harin2,
    marginTop:Constants.Harin2,
    marginBottom:Constants.Harin3,
    marginLeft:Constants.Marin5,
    marginRight:Constants.Marin5,

    borderWidth:1,
    borderRadius:10,
    alignItems:'center',
    // shadowOffset:{  width: 1,  height: 2,  },
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
  },
  signInButtonFacebook:{
    paddingVertical: Constants.Harin1,
    marginBottom:Constants.Harin3,
    marginLeft:Constants.Marin5,
    marginRight:Constants.Marin5,
    borderWidth:1,
    borderRadius:10,
  },
  signin:{
    alignItems:'center'
  },
  signInButtonText:{
    color:'white',
    // fontFamily: 'CORBEL',
    fontSize: Constants.Font22,
  },
  redirectView:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:Constants.Marin5,
    marginRight:Constants.Marin5,
    marginTop:Constants.Harin2,
  },
  registerRedirect:{
  },
  passwordRecoveryRedirect:{
  },
});
