import string from "../../../Components/Strings/Strings";
import Colors from "../../../Config/Colors/Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.SmokyWhite
    },
    cardview2: {
        borderRadius: string.Size.FortyFive,
        height: string.Size.FortyFive,
        width: string.Size.FortyFive,
        justifyContent: string.Styles.Center,
        backgroundColor: Colors.Yellow,
      },
      cardtext: {
        fontSize: string.Size.Twenty,
        borderRadius: string.Size.Hundred,
        textAlign: string.Styles.Center,
        backgroundColor: Colors.Yellow,
        color: Colors.Black,
        fontWeight: string.Size.Fontweight.SevenHundered,
      },
    image: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.black,
    },
    date: {
        color: 'gray',
    },
    dateGroup: {
        marginTop: 10,
    },
    groupDate: {
        fontSize: 18,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderColor: Colors.Black,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    searchIcon: {
        width: 15,
        height: 15,
        tintColor: Colors.black,
    },
    birthdayText: {
        fontSize: 16,
        color: Colors.black,
        alignSelf: "center",
        height: 30,
        paddingTop: 8
    },
    birthdayContainer: {
        borderBottomWidth: 0.3,
        color: Colors.SmokyWhite,
        backgroundColor: Colors.SmokyWhite,
        paddingBottom: 5,
    },
    subContainer: {
        alignSelf: "center"
    },
    birthdayImage: {
        height: 20,
        width: 20,
        alignSelf: "center"
    },
    settingContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    middle: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    versionText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    settingBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    holidayContainer: {
        flex: 1,
    },
    dropdownContainer: {
        marginBottom: 10,
        padding: 6
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 8,
        borderBottomWidth: 0.5,
        borderColor: Colors.grey
    },
    dateContainer: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    dateText: {
        fontWeight: 'bold',
        color: 'white'
    },
    detailsContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: '400',
        paddingBottom: 14
    },
    countryText: {
        color: Colors.black,
        fontSize: 14,
    },
    shiftText: {
        fontWeight: 'bold',
        color: Colors.Black,
        fontSize: 16
    },
    timingsMainContainer: {
        flexDirection: "row"
    },
    reasonTypeText: {
        fontWeight: "400",
        fontSize: 15,
        paddingTop: 12,
        paddingBottom: 7,
        color: Colors.Black
    },
    entryTimeText: {
        color: Colors.red,
        fontWeight: "bold",
        paddingTop: 10
    },
    mainText: {
        color: Colors.black,
        fontWeight: "bold",
        paddingTop: 10
    },
    dateMainContainer: {
        height: "5%",
        width: "100%",
        paddingStart: 5
    },
    dateTimeContainer: {
        width: "100%",
        height: "7%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    descriptionText: {
        color: Colors.black,
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10
    },
    reasonStyle: {
        height: "100%"
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.grey,
        height: "20%",
    },
    workFromHomeConatiner: {
        backgroundColor: Colors.SmokyWhite,
        height: string.Size.SixNinety,
        padding: 20
    },
    dropDown: {
        borderWidth: 1,
        padding: 7,
        height: "8%",
        borderColor: Colors.grey
    },
    textStyle: {
        fontWeight: "400",
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    workFromHomeDateContainer: {
        width: "100%",
        flexDirection: "row",
        paddingTop: 4
    },
    dateFrom: {
        width: "47%",
    },
    dateTo: {
        paddingStart: 25,
        width: "50%"
    },
    mainBtn: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"
    },
    mainDateSelect: {
        borderWidth: 1,
        width: "40%",
        flexDirection: "row",
        alignItems: "center",
        borderColor: Colors.grey
    },
    mainTimeSelect: {
        borderWidth: 1,
        width: "45%",
        flexDirection: "row",
        alignItems: "center",
        borderColor: Colors.grey
    },
    dateSelect: {
        paddingEnd: 20,
        alignSelf: "center",
        paddingStart: 10
    },
    imgCalender: {
        width: 20,
        height: 20
    },
    submittedMain: {
        height: "8%",
        paddingTop: 5
    },
    workFromHomeSubContainer: {
        flexDirection: "row"
    },
    nameStyle: {
        fontWeight: "bold",
        color: Colors.Black,
        paddingTop: 6
    },
    leaveNameStyle: {
        fontWeight: "bold",
        color: Colors.Black,
        paddingTop: 2
    },
    submitButton: {
        width: "40%",
        backgroundColor: Colors.LightGrey,
        padding: 10,
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 16
    },
    leaveTextStyle: {
        color: Colors.black,
        fontSize: 16,
        paddingBottom: 5
    },
    leaveDateContainer: {
        width: "100%",
        height: "5%",
        flexDirection: "row",
        alignItems: "center"
    },
    leaveDateFrom: {
        width: "50%"
    },
    maincontainer: {
        padding: 20
    },
    fromDatePicker: {
        height: "8%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    leaveMainDateSelect: {
        borderWidth: 1,
        width: "45%",
        flexDirection: "row",
        alignItems: "center",
        height: "100%"
    },
    inputStyle: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        height: 40
    },
    WhiteContainer: {
        paddingStart: 10,
        backgroundColor: Colors.SmokyWhite,
        flexDirection: "row",
        padding: 4
    },
    approvedContainer: {
        paddingStart: 10,
        flexDirection: "row"
    },
    reasonContainer: {
        paddingStart: 10,
        flexDirection: "row",
        padding: 4
    },
    goldenContainer: {
        paddingStart: 10,
        backgroundColor: Colors.LightGodlen,
        flexDirection: "row",
        padding: 4
    },
    text: {
        fontWeight: "bold",
        color: Colors.black
    },
    toDateContainer: {
        paddingStart: 10,
        backgroundColor: Colors.LightBlue,
        flexDirection: "row",
        paddingBottom:5
    },
    leaveItemContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingStart: 16,
        borderBottomColor: '#ccc',
        paddingTop: 8,
      },
    hoursText: {
        fontSize: 16,
        color: Colors.white,
        paddingTop: 4
    },
    itemSubContainer: {
        backgroundColor: Colors.LightBlue,
        flexDirection: "row",
        padding: 4
    },
    applyLeaveBtn: {
        height: "70%",
        width: "33%",
        alignItems: "center",
        top: 10,
        backgroundColor: Colors.Yellow
    },
    btnWorkFromHome: {
        height: "70%",
        width: "80%",
        alignItems: "center",
        top: 10,
        backgroundColor: Colors.Yellow,
    },

    fromText: {
        fontWeight: "bold",
        paddingStart: 6,
        color: Colors.black
    },
    yearContainer: {
        height: "50%",
        width: "15%",
        alignItems: "center",
        top: 10
    },
    subTitle: {
        flexDirection: "row",
    },
    applyLeaveText: {
        fontSize: 16,
        color: Colors.white,
        paddingTop: 9
    },
    yearText: {
        fontSize: 16,
        color: Colors.Black,
        paddingTop: 4
    },
    leaveText: {
        padding: 10,
        paddingTop: 15,
        fontSize: 16,
        color: Colors.Black
    },
    leavesContainer: {
        height: "10%",
        flexDirection: 'row',
        borderBottomWidth: 0.6,
        borderColor: Colors.grey
    },
    hoursSubcontainer: {
        height: "50%",
        width: "17%",
        alignItems: "center",
        backgroundColor: Colors.Yellow,
        top: 10
    },
    leaveSubContainer: {
        width: "68%",
    },
    calendarContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 16,
    },
    calendarImage: {
        width: 60,
        height: 60,
    },
    leaveDateText: {
        fontSize: 16,
        position: 'absolute',
        top: 25,
        color: Colors.Black
    },
    leaveItemText: {
        fontWeight: "bold",
        fontSize: 14,
        color: Colors.black,
        paddingTop: 3
    },
    subText: {
        fontSize: 14,
        color: Colors.black,
        paddingTop: 3,
        fontWeight: "300",
        width:"70%"
    },
    menuIcon: {
        padding: 8,
    },
    menuImage: {
        width: 20,
        height: 20,
    },
    leaveDropdownContainer: {
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 10,
        height: 150
    },
    dropdownOption: {
        padding: 10,
        backgroundColor: 'white',
    },
    dropdownText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500'
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownImage: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    subLeave: {
        height: "90%",
        width: "33%"
    },
    homeitemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemContent: {
        flex: 1,
        width: "100%"
    },
    iconContainer: {
        width: "40%",
        alignSelf: "flex-end",
        paddingStart: 15
    },
    icon: {
        width: 120,
        height: 30,
    },
});

export default styles;