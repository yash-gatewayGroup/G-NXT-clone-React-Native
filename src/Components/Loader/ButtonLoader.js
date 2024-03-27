import { ActivityIndicator} from 'react-native'
import Colors from '../../Config/Colors/Colors'
export const BtnLoader = () => {
    return (
        <ActivityIndicator style={{paddingTop:6}} size="large" color={Colors.Black} />
    )
  }

