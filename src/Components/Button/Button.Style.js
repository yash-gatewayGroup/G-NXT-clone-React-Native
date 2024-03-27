import { StyleSheet } from 'react-native';
import Colors from '../../Config/Colors/Colors';
import string from '../Strings/Strings';

const styles = StyleSheet.create({
  loginbtn: {
    backgroundColor: Colors.Yellow,
    justifyContent: string.Styles.Center,
    borderRadius: string.Size.TwentyFive,
    height: string.Size.FortySix,
    margin: string.Size.Ten,
    alignItems: string.Styles.Center,
    width: string.Percent.NintySeven,
    marginTop: string.Size.Thirty,
    elevation: string.Size.Five,
    marginTop: string.Size.Thirty,
    alignSelf: string.Styles.Center,
    justifyContent: string.Styles.Center,
  },
  loginbtntext: {
    fontSize: string.Size.Twenty,
    color: Colors.black,
    justifyContent: string.Styles.Center,
    fontWeight: string.Size.Fontweight.Bold,
    textAlign: string.Styles.Center,
  },
});

export default styles;
