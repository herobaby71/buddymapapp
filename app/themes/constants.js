import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { StatusBar, Platform } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const Constants = {
    Navbar_Height : 45,
    Statusbar_Height : STATUSBAR_HEIGHT,
    Primary_Input_FontSize : responsiveFontSize(2.5),
    textInputHeight1:responsiveHeight(5),
    textInputHeight2:responsiveHeight(4),
    width: responsiveWidth(100),
    height: responsiveHeight(100),

    Marin0: responsiveWidth(0),
    Marin1: responsiveWidth(1),
    Marin2: responsiveWidth(2),
    Marin3: responsiveWidth(3),
    Marin4: responsiveWidth(4),
    Marin5: responsiveWidth(5),
    Marin6: responsiveWidth(6),
    Marin7: responsiveWidth(7),
    Marin8: responsiveWidth(8),
    Marin9: responsiveWidth(9),
    Marin10: responsiveWidth(10),
    Marin11: responsiveWidth(11),
    Marin12: responsiveWidth(12),
    Marin13: responsiveWidth(13),
    Marin14: responsiveWidth(14),
    Marin15: responsiveWidth(15),
    Marin20: responsiveWidth(20),
    Marin25: responsiveWidth(25),
    Marin28: responsiveWidth(28),
    Marin30: responsiveWidth(30),

    Harin0: responsiveHeight(0),
    Harin1: responsiveHeight(1),
    Harin2: responsiveHeight(2),
    Harin3: responsiveHeight(3),
    Harin4: responsiveHeight(4),
    Harin5: responsiveHeight(5),
    Harin6: responsiveHeight(6),
    Harin7: responsiveHeight(7),
    Harin8: responsiveHeight(8),
    Harin9: responsiveHeight(9),
    Harin10: responsiveHeight(10),
    Harin11: responsiveHeight(11),
    Harin12: responsiveHeight(12),
    Harin13: responsiveHeight(13),
    Harin14: responsiveHeight(14),
    Harin15: responsiveHeight(15),
    Harin16: responsiveHeight(16),
    Harin17: responsiveHeight(17),
    Harin18: responsiveHeight(18),
    Harin19: responsiveHeight(19),
    Harin20: responsiveHeight(20),


  	Font0: responsiveFontSize(0.5),
  	Font1: responsiveFontSize(1),
    Font12: responsiveFontSize(1.2),
    Font13: responsiveFontSize(1.3),
    Font14: responsiveFontSize(1.4),
    Font15: responsiveFontSize(1.5),
    Font16: responsiveFontSize(1.6),
    Font17: responsiveFontSize(1.7),
    Font18: responsiveFontSize(1.8),
    Font19: responsiveFontSize(1.9),
    Font20: responsiveFontSize(2),
    Font25: responsiveFontSize(2.5),
    Font30: responsiveFontSize(3),
    Font40: responsiveFontSize(4),
    Font50: responsiveFontSize(5),
}

export default Constants;
