import { StyleSheet } from 'react-native';
import Colors from '../../Config/Colors/Colors';

const styles = StyleSheet.create({
    horizontalLikeContainer: {
        paddingLeft: 6,
        flexDirection: 'row'
    },
    overlayImage: {
        position: 'absolute',
        top: "35%",
        left: "45%",
        width: "15%",
        height: "30%",
    },
    overlayCardImage: {
        position: 'absolute',
        top: "30%",
        left: "13%",
        width: "10%",
        height: "40%",
    },
    overlayCardImageVertical: {
        position: 'absolute',
        top: "25%",
        left: "43%",
        width: "20%",
        height: "20%",
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
        paddingLeft: 2,
        flexDirection: 'row',
        paddingTop: 2,
        width: '20%',
    },
    horizontalLikeText: {
        color: Colors.grey,
        fontSize: 12
    },
    horizontalIconContainer: {
        flexDirection: 'row',
    },
    horizontalDescriptionText: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        height:"50%"
    },
    horizontalDescriptionContainer: {
        flexDirection: 'column',
        flex: 2
    },
    likeImageContainer: {
        paddingLeft: 10,
        flexDirection: 'row',
        paddingTop: 2,
        height: 20
    },
    commentText: {
        color: Colors.grey,
        fontSize: 12,
        width:"20%",
        alignSelf:"center",
    },
    commentImage: {
        height: 13,
        width: 13,
        alignSelf:"center"
    },
    viewerText: {
        color: Colors.grey,
        fontSize: 12,
        alignSelf:"center"
    },
    likeImage: {
        height: 15,
        width: 15,
        alignSelf:"center"
    },
    viewerImage: {
        height: 15,
        width: 25,
        alignSelf:"center"
    },
    imageIconContainer: {
        flexDirection: 'row',
        width: "100%",
        fontSize:12,
        height:20,
    },
    subContainer: {
        flexDirection: "row",
        paddingStart: 10
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
        height:"45%"
    },
    descriptionContainer: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: 4,
    },
    mainContainer: {
        flex: 1,
        padding: 10,
    },
    swiperContainer: {
        height: 220,
    },
    pagination: {
        bottom: -17,
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
        padding: 5,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        height:"30%",
        marginBottom: 10,
    },
    fixedHeightCard: {
        height: 200,
    },
    horizontalContainer: {
        flexDirection: "row",
        flex:1
    },
    horizontalCard: {
    width:"50%",
    height:"100%",
    alignContent:"center",
    padding:5
    },
    scrollViewHeight: {
        flex:1,
    },
    horizontalCardImage: {
        width: "100%",
        height: '55%',
    },
    verticalCardImage: {
        width: "90%",
        height: '50%',
        borderRadius: 20,
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
        alignItems: "flex-end",
        width: "50%"
    },
    viewersMainContainer: {
        width: "100%",
        flexDirection: "row",
    },
    swiperDescription: {
        color: Colors.white,
        fontSize: 14,
        paddingStart: 20,
        
    },
    daysAgotxt: {
        color: Colors.grey,
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    imageContainer: {
        width: '100%',
        height: '30%',
        position: 'relative',
        alignItems: "center",
        padding: 4
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 35,
    },
    cardImage: {
        width: '35%',
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
        top: "75%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: "100%",
        borderBottomLeftRadius: 33,
        borderBottomRightRadius: 33,
    },
});
export default styles;