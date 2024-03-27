import { StyleSheet } from 'react-native';
import string from '../../Components/Strings/Strings';
import Colors from '../../Config/Colors/Colors';

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.Yellow,
    justifyContent: string.Styles.FlexEnd,
    height: string.Percent.Hundred,
  },

  logo: {
    height: string.Size.NinetyFive,
    width: string.Size.Ninety,
  },

  GnxtText: {
    fontSize: string.Size.Twenty,
    marginTop: string.Size.Twenty,
    color: Colors.Black,
    fontWeight: '400'
  },

  Gnxttitle: {
    fontSize: string.Size.ThirtyFive,
    alignSelf: string.Styles.Center,
    fontWeight: '500'
  },
  card: {
    width: string.Percent.Hundred,
    justifyContent: string.Styles.FlexEnd,
    backgroundColor: Colors.SmokyWhite,
    borderTopRightRadius: string.Size.Ten,
    borderTopLeftRadius: string.Size.Ten,
    elevation: string.Size.Fifty,
    paddingHorizontal: string.Size.TwentyFour,
    paddingTop: string.Size.FiftySix,
    height: string.Percent.SixtyThree,
  },

  Textinputcontainer: {
    borderWidth: string.Size.Two,
    borderColor: Colors.Black,
    justifyContent: string.Styles.Center,
    borderRadius: string.Size.Five,
    margin: string.Size.Five,
    height: string.Percent.Fifteen,
    width: string.Percent.NinetyFive,
    flexDirection: string.Styles.Row,
  },

  eye_icon_touch: {
    justifyContent: string.Styles.Center,
  },

  Textinputcontainerpassword: {
    borderWidth: string.Size.Two,
    borderColor: Colors.Black,
    justifyContent: string.Styles.Center,
    borderRadius: string.Size.Five,
    margin: string.Size.Five,
    height: string.Percent.Fifteen,
    width: string.Percent.NinetyFive,
    flexDirection: string.Styles.Row,
    color: Colors.Black,
  },

  icon: {
    alignSelf: string.Styles.Center,
    paddingStart: string.Size.Five,
  },
  Acitvitybanner: {
    backgroundColor: Colors.Yellow,
    justifyContent: string.Styles.Center,
    borderRadius: string.Size.Ten,
    height: string.Size.FortySix,
    margin: string.Size.Ten,
    alignItems: string.Styles.Center,
    width: string.Percent.NinetyEight,
    marginTop: string.Size.Thirty,
    elevation: string.Size.Five,
    alignSelf: string.Styles.Center,
  },
  emailview: {
    flexDirection: string.Styles.Row,
  },

  Commontxtinput: {
    width: string.Percent.Eighty,
  },
  forgotpass_container: {
    alignSelf: "center",
  },

  img: {
    alignItems: string.Styles.Center,
    alignContent: string.Styles.Center,
    flexDirection:"row",
    paddingStart:30,
  },

  textcontain: {
    flexDirection: string.Styles.Row,
    justifyContent: string.Styles.Center,
    marginBottom: string.Size.Twenty,
  },

  textusername: {
    fontWeight: string.Styles.Bold,
    fontSize: string.Size.Fourteen,
    color: Colors.Silver,
    paddingStart: string.Size.Thirteen,
    paddingTop: string.Size.Ten,
  },

  textpassword: {
    fontWeight: string.Styles.Bold,
    fontSize: string.Size.Fourteen,
    color: Colors.Silver,
    paddingStart: string.Size.Thirteen,
    paddingTop: string.Size.Ten,
  },

  textforgot: {
    fontSize: string.Size.Eighteen,
    textDecorationLine: string.Styles.Underline,
    color: Colors.Black,
  },

  textsignup: {
    fontSize: string.Size.Eighteen,
    alignSelf: string.Styles.FlexEnd,
    textDecorationLine: string.Styles.Underline,
    color: Colors.Black,
  },

  loginbtn: {
    backgroundColor: Colors.Yellow,
    elevation: string.Size.Five,
    borderRadius: string.Size.Eight,
    height: string.Size.Fifty,
    margin: string.Size.Ten,
    alignItems: string.Styles.Center,
    width: string.Percent.NinetyEight,
    marginTop: string.Size.Thirty,
    alignSelf: string.Styles.Center,
    justifyContent: string.Styles.Center,
  },
  loginbtntext: {
    fontSize: string.Size.Twenty,
    alignSelf: string.Styles.Center,
    color: Colors.Black,
    fontWeight: string.Styles.Bold,
  },
  password_container: {
    width: string.Percent.Ninty,
  },
  eye_Image: {
    height: 30,
    width: 30
  }
});

export default styles;