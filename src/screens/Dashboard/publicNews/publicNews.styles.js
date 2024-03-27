import Colors from "../../../Config/Colors/Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    horizontalLikeContainer: {
        paddingLeft: 10,
        flexDirection: 'row'
    },
    overlayImage: {
        position: 'absolute',
        top: "25%", 
        left: "45%",
        width: "15%", 
        height: "40%",
      },
      overlayCardImage: {
        position: 'absolute',
        top: "30%", 
        left: "15%",
        width: "10%", 
        height: "40%",
      },
    imgSize: {
        height: 15,
        width: 25
    },
    horizontalLikeImg: {
        height: 15,
        width: 15
    },
    horizontalCommentImage: {
        height: 13,
        width: 13
    },
    horizontalCommentText: {
        color: Colors.grey,
        fontSize: 12,
        paddingLeft: 3,
    },
    horizontalCommentContainer: {
        paddingLeft: 10,
        flexDirection: 'row',
        paddingTop: 2,
        width: '15%',
    },
    horizontalLikeText: {
        color: Colors.grey,
        fontSize: 12
    },
    horizontalIconContainer: {
        flexDirection: 'row'
    },
    horizontalDescriptionText: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        flex: 0.5,
    },
    horizontalDescriptionContainer: {
        flexDirection: 'column',
        flex: 2
    },
    likeImageContainer: {
        paddingLeft: 10,
        flexDirection: 'row',
        paddingTop: 2,
        width: '36%',
        height:20
    },
    commentText: {
        color: Colors.grey,
        fontSize: 12,
    },
    commentImage: {
        height: 13,
        width: 13
    },
    viewerText: {
        color: Colors.grey,
        fontSize: 12
    },
    likeImage: {
        height: 15,
        width: 15
    },
    viewerImage: {
        height: 15,
        width: 25
    },
    imageIconContainer: {
        flex: 0.5,
        flexDirection: 'row',
        width: "70%",
    },
    titleDescription: {
        color: Colors.Yellow,
        fontSize: 14,
        flex: 0.6,
    },
    descriptionText: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
    },
    descriptionContainer: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: 4
    },
    mainContainer: {
        paddingBottom: "5%",
        height:"95%",
        padding:10,
    },
    swiperContainer: {
        height: 250,
    },
    pagination: {
        bottom: -20,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
        backgroundColor: Colors.Yellow,
    },
    verticalContainer: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 25,
        padding: 10,
    },
    card: {
        flex: 1,
        borderColor: Colors.black,
        borderRadius: 10,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        height: 100
    },
    fixedHeightCard: {
        height: 200,
    },
    horizontalContainer: {
        flexDirection: 'row',
        height: 250,
    },
    horizontalCard: {
        flex: 1,
        borderColor: Colors.black,
        borderRadius: 10,
        marginHorizontal: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewHeight: {
        height: "100%"
    },
    horizontalCardImage: {
        width: "100%",
        height: '60%',
    },
    verticalCardImage: {
        width: "100%",
        height: '40%',
        borderRadius: 20
    },
    container: {
        flexDirection: 'row',
        height: "12%"
    },

    cardContainer: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
    },
    commentImg: {
        height: 16,
        width: 16,
        alignSelf: "center"
    },
    commentContainer: {
        paddingStart: 10,
        flexDirection: "row",
        width: "25%",
        paddingLeft: 10,

    },
    likeImg: {
        height: 20,
        width: 20,
        alignSelf: "center"
    },
    likeContainer: {
        alignSelf: "center",
        paddingStart: 10,
        flexDirection: "row"
    },
    viewersSubContainer: {
        alignSelf: "center",
        paddingStart: 20,
        flexDirection: "row"
    },
    imgViewer: {
        height: 30,
        width: 40
    },
    verticalViewerText: {
        color: Colors.white,
        fontSize: 12,
        alignSelf: "center",
    },
    verticalDateViewerText: {
        color: Colors.white,
        fontSize: 14,
        alignItems:"flex-end",
        width:"40%"
    },
    viewersMainContainer: {
        width: "100%",
        flexDirection: "row",
    },
    swiperDescription: {
        color: Colors.white,
        fontSize: 14,
        paddingStart: 10,
        paddingTop: 6
    },
    daysAgotxt: {
        color: Colors.grey,
        fontSize: 12,
        paddingTop:2
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: "center",
        padding: 10
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 35,
    },
    cardImage: {
        width: '40%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 10,
    },
    verticalcardImage: {
        width: '40%',
        height: '80%',
        resizeMode: 'contain',
        borderRadius: 10,
    },
    overlapView: {
        position: 'absolute',
        top: "80%",
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: "25%",
        width: "100%",
        borderBottomLeftRadius: 33,
        borderBottomRightRadius: 33,
    },
});
export default styles;