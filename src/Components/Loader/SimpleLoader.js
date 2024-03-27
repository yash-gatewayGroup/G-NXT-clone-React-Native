import { View, Text,ActivityIndicator} from 'react-native'
import Colors from '../../Config/Colors/Colors'
import string from '../Strings/Strings'

export const loader = () => {
    return (
      <>
        <ActivityIndicator style={{paddingTop:6}} size="large" color={Colors.Yellow} />
      </>
    )
  }

