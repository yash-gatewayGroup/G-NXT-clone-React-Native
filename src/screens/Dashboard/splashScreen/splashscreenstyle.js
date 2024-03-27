import { StyleSheet } from 'react-native';
import string from '../../../Components/Strings/Strings';
import Colors from '../../../Config/Colors/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Yellow,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden', 
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black', 
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
export default styles;