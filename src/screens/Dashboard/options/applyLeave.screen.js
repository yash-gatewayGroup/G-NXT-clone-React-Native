import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CustomHeader from '../../../Components/Header/customHeader';
import Colors from '../../../Config/Colors/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import string from '../../../Components/Strings/Strings';
import styles from './options.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptdecrypt } from '../../../Components/encrypt';
import apiConstants from '../../../Config/Api/apiConstants';

const ApplyLeave = () => {
    const [leaveType, setLeaveType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [responsiblePerson, setResponsiblePerson] = useState('');
    const [responsiblePersonName, setResponsiblePersonName] = useState('');
    const [reason, setReason] = useState('');
    const [contactDetails, setContactDetails] = useState('');
    const [totalDays, setTotalDays] = useState(0);
    const [isFromDatePickerVisible, setFromDatePickerVisible] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisible] = useState(false);
    AsyncStorage.getItem('reportingHeadName').then((res)=>setResponsiblePersonName(res));

    const handleApplyLeave = () => {
        if (!leaveType || !fromDate || !toDate || !responsiblePerson || !reason || !contactDetails) {
            Alert.alert('Error', 'Kindly Fill out all the Information.');
            return null;
        } else {
            applyLeave()
        }
    };

    const leaveData = [
        { label: 'Previlage Leave', value: 'PL', name: 'Previlage Leave' },
        { label: 'Half Privilege Leave', value: 'H_PL', name: 'Half Privilege Leave' },
        { label: 'Casual Quarter Leave', value: 'CQLD', name: 'Casual Quarter Leave' },
        { label: 'Bereavement Leave', value: 'BL', name: 'Bereavement Leave' },
        { label: 'Half Bereavement Leave', value: 'H_BL', name: 'Half Bereavement Leave' },
        { label: 'Long Leave', value: 'LL', name: 'Long Leave' },
        { label: 'Tour', value: 'TR', name: 'Tour' },
        { label: 'Marriage Leave', value: 'ML', name: 'Marriage Leave' },
        { label: 'Sick Leave', value: 'SL', name: 'Sick Leave' },
        { label: 'Festival Leave', value: 'FL', name: 'Festival Leave' },
        { label: 'Half Sick Leave', value: 'H_SL', name: 'Half Sick Leave' },
        { label: 'Comp Off', value: 'CO', name: 'Comp Off' },
        { label: 'Half Comp Off', value: 'HC', name: 'Half Comp Off' },
        { label: 'Birthday_CQLD', value: 'BCQLD', name: 'Birthday_CQLD' },
    ];

    function localToUTC() {
        const date = new Date();
        const gmt = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const currentDate = new Date(gmt.getTime() + 720000);
        return String(currentDate.getTime());
    };

    const applyLeave = async () => {
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        const reportingHead = await AsyncStorage.getItem('reportingHead');
        const currentUserId = await AsyncStorage.getItem('currentUserId');
        const EncryptedHeader = `${email}:${password}:${localToUTC()}:${reportingHead}`;
        if (email && password && reportingHead && currentUserId) {
            const Res = (await encryptdecrypt(EncryptedHeader, true))
            const decryptHeader = await encryptdecrypt(Res,false)
            console.log("decryptHeader",decryptHeader);
            const headers = {
                'Authorization': "basic " + Res,
                'Content-Type': 'application/json',
            };
            const params = {
                date_start: fromDate,
                date_end: toDate,
                leaveCode: leaveType,
                totalDays:calculateTotalDays(),
                reason: reason,
                fromFirstHalf: false,
                fromSecondHalf: false,
                toFirsthalf: false,
                toSecondhalf: false,
                qLDType: false,
                contactDetails: contactDetails,
                responsiblePerson: responsiblePerson,
                bLPersonID: -1,
                bLDate: null,
                bLPersonName: null,
                compOffDate: "",
                dOB: null
            }
            const jsonString = JSON.stringify(params);
            const encryptedBody = await encryptdecrypt(jsonString, true);
            console.log(encryptedBody);
            const decrypt =await encryptdecrypt(encryptedBody,false)
            const crypt = await encryptdecrypt("EmpId=" + currentUserId, true)
            const decryptUseRiD =await encryptdecrypt(crypt,false)
            console.log("decryptUseRiD",decryptUseRiD);
            const response = await fetch(apiConstants.BASE_URL + apiConstants.Work_From_Home, {
                method: 'POST',
                headers: headers,
                body: {
                    "Request": encryptedBody,
                    "secretMethod": "Leave/ApplyLeave",
                    "cryptvalue": crypt
                }
            });
            if (response.status == apiConstants.STATUSCODE.SUCCESS) {
                console.log(response);
            } else {
                response.json()
                    .then((responseData) => { console.log(responseData); })
            }
        } else {
            loader()
        }
    }
    const showFromDatePicker = () => { setFromDatePickerVisible(true) };

    const hideFromDatePicker = () => { setFromDatePickerVisible(false) };

    const showToDatePicker = () => { setToDatePickerVisible(true) };

    const hideToDatePicker = () => { setToDatePickerVisible(false) };

    const handleFromDateConfirm = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setFromDate(formattedDate);
        hideFromDatePicker();
    };

    const handleToDateConfirm = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setToDate(formattedDate);
        hideToDatePicker();
    };

    const calculateTotalDays = () => {
        if (!fromDate || !toDate) {
            setTotalDays('');
            return;
        }
        const start = moment(fromDate);
        const end = moment(toDate);
        const days = end.diff(start, 'days') + 1;
        setTotalDays(days.toString());
        return totalDays
    };

    useEffect(() => {
        calculateTotalDays();
    }, [fromDate, toDate]);

    return (
        <>
            <CustomHeader title={"My Leaves"} />
            <StatusBar
                barStyle={string.Text.Statusbar_Style}
                hidden={false}
                backgroundColor={Colors.SmokyWhite}
            />
            <View style={styles.maincontainer}>
                <Text style={styles.leaveTextStyle}>Leave Type:</Text>
                <Dropdown
                    style={styles.dropDown}
                    data={leaveData}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Leave Type"
                    placeholderColor={Colors.Black}
                    value={leaveType}
                    onChange={(value) => setLeaveType(value.value)}
                />
                <View style={styles.leaveDateContainer}>
                    <View style={styles.dateFrom}>
                        <Text style={styles.leaveTextStyle}>From Date:</Text>
                    </View>
                    <View style={styles.dateTo}>
                        <Text style={styles.leaveTextStyle}>To Date:</Text>
                    </View>
                </View>
                <View style={styles.fromDatePicker}>
                    <TouchableOpacity onPress={showFromDatePicker} style={styles.leaveMainDateSelect}>
                        <Text style={styles.dateSelect}>{fromDate || 'Select Date'}</Text>
                        <Image source={require('../../../assets/calendar.png')} style={styles.imgCalender} />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isFromDatePickerVisible}
                        mode="date"
                        onConfirm={handleFromDateConfirm}
                        onCancel={hideFromDatePicker}
                    />
                    <TouchableOpacity onPress={showToDatePicker} style={styles.leaveMainDateSelect}>
                        <Text style={styles.dateSelect}>{toDate || 'Select Date'}</Text>
                        <Image source={require('../../../assets/calendar.png')} style={styles.imgCalender} />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isToDatePickerVisible}
                        mode="date"
                        onConfirm={handleToDateConfirm}
                        onCancel={hideToDatePicker}
                    />
                </View>
                <View style={{ paddingTop: 16 }}>
                    <Text style={styles.leaveTextStyle}>Total Days:</Text>
                    <TextInput
                        value={totalDays}
                        editable={false}
                        placeholder='Total Days'
                        style={styles.inputStyle}
                    />
                </View>
                <Text style={styles.leaveTextStyle}>Responsible Person:</Text>
                <TextInput
                    placeholder='Enter Responsible Person Name'
                    value={responsiblePerson}
                    style={styles.inputStyle}
                    onChangeText={(text) => setResponsiblePerson(text)}
                />
                <Text style={styles.leaveTextStyle}>Reason:</Text>
                <TextInput
                    placeholder='Enter Reason'
                    value={reason}
                    onChangeText={(text) => setReason(text)}
                    style={styles.inputStyle}
                />
                <Text style={styles.leaveTextStyle}>Contact Details:</Text>
                <TextInput
                    value={contactDetails}
                    onChangeText={(text) => setContactDetails(text)}
                    keyboardType="numeric"
                    placeholder='Enter Contact Details'
                    style={styles.inputStyle}
                />
                <View style={styles.submittedMain}>
                    <View style={styles.workFromHomeSubContainer}>
                        <Text style={styles.textStyle}>Submitted to: </Text>
                        <Text style={styles.nameStyle}>{responsiblePersonName} </Text>
                    </View>
                </View>
                <View style={styles.mainBtn}>
                    <TouchableOpacity onPress={handleApplyLeave} style={styles.submitButton}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleApplyLeave} style={[styles.submitButton, { backgroundColor: Colors.Yellow }]}>
                        <Text style={styles.btnText}>Apply Leave</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default ApplyLeave;