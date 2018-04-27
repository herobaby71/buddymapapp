import { StyleSheet } from 'react-native';
import Constants from '../../themes/constants'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
