import Colors from '../../../Config/Colors/Colors';
import { Dimensions, StyleSheet } from 'react-native';
import string from '../../../Components/Strings/Strings';

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        alignSelf: "center"
    },
    btnImgStyle: {
        height: 20,
        width: 20,
    },
    backImage: {
        height: 20,
        width: 20,
        alignSelf: "center",
        top: 5
    },
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      fullscreenImage: {
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').height - 40,
      },
    descriptionText: {
        color: Colors.black,
        fontSize: 18
    },
    scrollContainer: {
        height: "80%",
    },
    commentContainer: {
        flexDirection: string.Styles.Row,
        width: string.Percent.Hundred,
        alignSelf: string.Styles.Center,
        justifyContent: string.Styles.Center,
        backgroundColor: Colors.DEFAULT_WHITE,
        height: string.Size.Seventy,
    },
    commentImageMainView: {
        backgroundColor: Colors.DEFAULT_GREY,
        borderRadius: string.Size.Hundred,
        width: string.Size.Fifty,
        height: string.Size.Fifty,
        alignSelf: string.Styles.Center,
    },
    commentBody: {
        width: string.Percent.EightyEight,
        paddingStart: 10
    },
    titleview: {
        marginLeft: string.Size.Ten,
        width: string.Size.TwoFifty,
    },
    imageLable_Container: {
        alignSelf: string.Styles.FlexStart,
        borderRadius: string.Size.Hundred,
        height: string.Size.Fifty,
        width: string.Size.Fifty,
        justifyContent: string.Styles.Center,
        backgroundColor: Colors.lightorange,
    },
    commentMainContainer: {
        paddingHorizontal: string.Size.Fifteen,
        flexDirection: string.Styles.Row,
        borderBottomWidth: 1, 
        borderBottomColor: 'lightgray',
        flex:1
      },

    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'lightgray', 
        borderTopColor: 'lightgray',
        height: "12%"
  
    },

    commentInput: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        marginRight: 10, 
        width:"90%"
    },

    commentButtonInside: {
        backgroundColor: 'blue',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageLable: {
        fontSize: string.Size.Twenty,
        borderRadius: string.Size.Hundred,
        textAlign: string.Styles.Center,
        backgroundColor: Colors.lightorange,
        color: Colors.lightBlack,
    },

    card: {
        width: "100%",
        backgroundColor: Colors.SmokyWhite,
        borderTopRightRadius: string.Size.Thirty,
        borderTopLeftRadius: string.Size.Thirty,
        elevation: string.Size.Fifty,
        paddingHorizontal: string.Size.TwentyFour,
        paddingTop: 10,
        height: string.Percent.SixtyThree,
        marginTop: -20
    },
    imgStyle: {
        height: 300,
        width: "100%",
        alignSelf: "center"
    },
    overlayImage: {
        position: 'absolute',
        top: 50, 
        left: 70,
        width: 70, 
        height: 70,
      },
    timeText: {
        color: Colors.LightGrey,
        fontSize: 12,
        alignSelf: "center"
    },
    contentStyle: {
        color: Colors.Black,
        paddingTop: 10,
        fontWeight: "bold",
        fontSize: 18
    },
    subContainerText: {
        color: Colors.LightGrey,
        fontSize: 12,
        alignSelf: "center"
    },
    commentText: {
        color: Colors.LightGrey,
        fontSize: 12,
        alignSelf: "center",
        paddingStart: 4
    },
    timeContainer: {
        width: "100%",
        height: 30,
        flexDirection: "row",
        fontSize: 12
    },
    subContainer: {
        flexDirection: "row",
        paddingStart: 20
    },
    subContainerImage: {
        height: 15,
        width: 15,
        alignSelf: "center"
    },
    subContainerViewerImage: {
        height: 25,
        width: 25,
        alignSelf: "center"
    },
    titleStlye: {
        color: Colors.Yellow,
        paddingTop: 10,
        fontWeight: "800"
    },
    body: {
        backgroundColor: Colors.Yellow,
        justifyContent: string.Styles.FlexEnd,
        height: "100%",
        width: "100%"
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 10,
        zIndex: 1,
        backgroundColor: Colors.lightBlack,
        height: 30,
        width: 30
    },
    mainContainer: {
        flexDirection: 'row',
        borderColor: Colors.black
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.SmokyWhite,
        borderTopWidth: 1
    },
    likeButton: {
        flex: 1,
        padding: 10,
        marginRight: 5,
        borderRightWidth: 1,
    },
    commentButton: {
        flex: 1,
        padding: 10,
    },
    buttonText: {
        color: Colors.Black,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "bold",
        paddingStart: 7,
    },
    buttonTextLike: {
        color: Colors.Yellow,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold",
        paddingStart: 7,
    },
});

export default styles;