import Colors from "../../../../Config/Colors/Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    optionText: {
        fontWeight: "bold",
        color: Colors.black,
        fontSize: 14
    },
    radioButtonContainer: {
        flexDirection: "row"
    },
    postText: {
        fontWeight: "bold",
        color: Colors.black,
        fontSize: 16
    },
    postContainer: {
        height: "40%",
        paddingTop: 20
    },
    descriptionSubContainer: {
        borderWidth: 1,
        maxHeight: 250
    },
    descriptionContainer: {
        paddingTop: 20
    },
    titleContainer: {
        borderWidth: 1,
        borderColor: Colors.black,
        paddingStart: 10
    },
    popupOption: {
        paddingVertical: 10,
        width: '100%',
    },
    popupOptionText: {
        fontSize: 16,
        color: 'black',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPlayer: {
        width: 300,
        height: 200,
        alignSelf: "center",
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: "93%",
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    editor: {
        backgroundColor: 'transparent',
    },
    toolbar: {
        backgroundColor: Colors.black,
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: Colors.DEFAULT_WHITE,
    },
    radioContainer: {
        flexDirection: 'row',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    mediaContainer: {
        marginVertical: 20,
    },
    image: {
        width: 200,
        height: 180,
        alignSelf: "center",
        paddingTop: 20
    },
});
export default styles;