import { StyleSheet } from 'react-native';
import { Constants } from '../../themes/';
export default styles = StyleSheet.create({
	chevronArrow:{
    position: 'absolute',
    top: Constants.Harin3,
    left: Constants.Marin3,
  },
	title: {
    margin: 24,
    fontSize: 30,
    textAlign: 'center',
	color: 'rgb(111,187,215)',
  },
  paragraph: {
    margin: 24,
    fontSize: 20,
    textAlign: 'left',
  },
  container: {
    flex: 1,
    paddingTop: Constants.Harin10,
  }
});
