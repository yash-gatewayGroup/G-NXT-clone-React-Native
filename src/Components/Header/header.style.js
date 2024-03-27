import Colors from "../../Config/Colors/Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    customheader: {
        height: "6%",
        backgroundColor: Colors.SmokyWhite,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    backButton: {
        paddingLeft: 10,
    },
    customheaderText: {
        color: Colors.Black,
        fontSize: 18,
        paddingRight: 30
    },
    centerTextContainer: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        backgroundColor: Colors.Yellow,
        alignItems: 'center',
        height: "7%",
    },
    headerText: {
        fontSize: 40,
        color: Colors.Black,
        fontWeight: 'bold',
    },

});
export default styles;