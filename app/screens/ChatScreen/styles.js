import { StyleSheet } from 'react-native';
import Constants from '../../themes/constants'

export default styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
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
});
