import { StyleSheet } from 'react-native';
import Colors from '../../Config/Colors/Colors';
import string from '../Strings/Strings';

const styles = StyleSheet.create({
  mainconatiner: {
    flex: 1,
    justifyContent: string.Styles.Center,
    alignItems: string.Styles.Center,
    backgroundColor: Colors.ShadowColor,
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: string.Size.Ten,
    width: string.Percent.Eighty,
    maxHeight: string.Percent.Twenty,
    height: string.Percent.Twenty,
  },
  title_container: {
    maxHeight: string.Percent.TwentyFive,
    height: string.Percent.TwentyFive,
    justifyContent: string.Styles.Center,
    backgroundColor: Colors.Yellow,
    borderTopEndRadius: string.Size.Ten,
    borderTopStartRadius: string.Size.Ten,
  },
  title_text: {
    fontSize: string.Size.Twenty,
    fontWeight: string.Size.Fontweight.Bold,
    textAlign: string.Styles.Center
  },
  message_container: {
    maxHeight: string.Percent.Fifty,
    height: string.Percent.Fifty,
    justifyContent: string.Styles.Center,
  },
  message_text: {
    fontSize: string.Size.Fourteen,
    fontWeight: string.Size.Fontweight.Bold,
    textAlign: string.Styles.Center
  },
  button_container: {
    maxHeight: string.Percent.TwentyFive,
    height: string.Percent.TwentyFive,
    flexDirection: string.Styles.Row,
    borderTopWidth: string.Size.ZeroPointFive,
    borderColor: Colors.grey,
  },
  cancel_button: {
    width: string.Percent.Fifty,
    borderRightWidth: string.Size.ZeroPointFive,
    borderColor: Colors.grey,
    justifyContent: string.Styles.Center,
  },
  cancel_text: {
    textAlign: string.Styles.Center,
    fontWeight: string.Size.Fontweight.Bold,
    fontSize: string.Size.Sixteen
  },
  title_btn_container: {
    width: string.Percent.Fifty,
    justifyContent: string.Styles.Center
  },
});
export default styles;
