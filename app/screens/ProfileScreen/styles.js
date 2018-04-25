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
  container: {
    flex: 1,
    paddingTop: Constants.Harin10,
  }
});
