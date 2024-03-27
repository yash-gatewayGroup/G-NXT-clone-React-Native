import { StyleSheet } from 'react-native';
import Colors from '../../Config/Colors/Colors';
import string from '../Strings/Strings';
const styles = StyleSheet.create({
  textinput: {
    fontSize: string?.Size?.Eighteen,
    height: string?.Size?.Fifty,
    textAlign: string?.Styles?.Left,
    borderRadius: string?.Size?.Seventy,
    borderColor: Colors?.Black,
    textDecorationStyle: string?.Styles?.Solid,
    textDecorationColor: Colors?.Black,
    paddingStart: string?.Size?.Two,
    alignSelf: string?.Styles?.Center,
    color: Colors?.Black,
  },
});

export default styles;