import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, StatusBar } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CustomHeader from '../../../Components/Header/customHeader';
import Colors from '../../../Config/Colors/Colors';
import string from '../../../Components/Strings/Strings';
import styles from './options.style';

export default function ApplyOutofOffice() {
    const [inDate, setInDate] = useState('');
    const [inTime, setInTime] = useState('');
    const [outDate, setOutDate] = useState('');
    const [outTime, setOutTime] = useState('');
    const [description, setDescription] = useState('');
    const [isInDatePickerVisible, setInDatePickerVisible] = useState(false);
    const [isOutDatePickerVisible, setOutDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isOutTimePickerVisible, setOutTimePickerVisibility] = useState(false);

    const handleApplyLeave = () => {
        if (!inDate || !description || !outTime || !inTime) {
            Alert.alert('Error', 'Kindly Fill out all the Information.');
            return;
        }
        clear()
    };

    const clear = () => {
        setDescription('');
        setOutDate('');
        setOutTime('');
        setInDate('');
        setInTime('');
    }
    const showInDatePicker = () => { setInDatePickerVisible(true) };

    const hideInDatePicker = () => { setInDatePickerVisible(false) };

    const showOutDatePicker = () => { setOutDatePickerVisible(true) };

    const hideOutDatePicker = () => { setOutDatePickerVisible(false) };

    const showTimePicker = () => { setTimePickerVisibility(true) };

    const hideTimePicker = () => { setTimePickerVisibility(false) };

    const hideOutTimePicker = () => { setOutTimePickerVisibility(false) };

    const showOutTimePicker = () => { setOutTimePickerVisibility(true) };

    const handleInDateConfirm = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setInDate(formattedDate);
        hideInDatePicker();
    };

    const handleOutDateConfirm = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setOutDate(formattedDate);
        hideOutDatePicker();
    };

    const handleTimeConfirm = (time) => {
        setInTime(time.toLocaleTimeString());
        hideTimePicker();
    };

    const handleOutTimeConfirm = (time) => {
        setOutTime(time.toLocaleTimeString());
        hideOutTimePicker();
    };

    return (
        <>
            <CustomHeader title={"APPLY WORK FROM HOME"} />
            <ScrollView>
                <View style={styles.workFromHomeConatiner}>
                    <StatusBar
                        barStyle={string.Text.Statusbar_Style}
                        hidden={false}
                        backgroundColor={Colors.SmokyWhite}
                    />
                    <View style={styles.reasonStyle}>
                        <Text style={styles.mainText}> In Time Information</Text>
                        <View style={styles.dateMainContainer}>
                            <View style={styles.workFromHomeDateContainer}>
                                <View style={styles.dateFrom}>
                                    <Text style={styles.textStyle}>Date:</Text>
                                </View>
                                <View style={styles.dateTo}>
                                    <Text style={styles.textStyle}>Time:</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dateTimeContainer}>
                            <TouchableOpacity onPress={showInDatePicker} style={styles.mainDateSelect}>
                                <Text style={styles.dateSelect}>{inDate || 'Select Date'}</Text>
                                <Image source={require('../../../assets/calendar.png')} style={styles.imgCalender} />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isInDatePickerVisible}
                                mode="date"
                                onConfirm={handleInDateConfirm}
                                onCancel={hideInDatePicker}
                            />
                            <TouchableOpacity onPress={showTimePicker} style={styles.mainTimeSelect}>
                                <Text style={styles.dateSelect}>{inTime || 'Select Time'}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleTimeConfirm}
                                onCancel={hideTimePicker}
                            />
                        </View>
                        <Text style={styles.mainText}> Out Time Information</Text>
                        <View style={styles.dateMainContainer}>
                            <View style={styles.workFromHomeDateContainer}>
                                <View style={styles.dateFrom}>
                                    <Text style={styles.textStyle}>Date:</Text>
                                </View>
                                <View style={styles.dateTo}>
                                    <Text style={styles.textStyle}>Time:</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dateTimeContainer}>
                            <TouchableOpacity onPress={showOutDatePicker} style={styles.mainDateSelect}>
                                <Text style={styles.dateSelect}>{outDate || 'Select Date'}</Text>
                                <Image source={require('../../../assets/calendar.png')} style={styles.imgCalender} />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isOutDatePickerVisible}
                                mode="date"
                                onConfirm={handleOutDateConfirm}
                                onCancel={hideOutDatePicker}
                            />
                            <TouchableOpacity onPress={showOutTimePicker} style={styles.mainTimeSelect}>
                                <Text style={styles.dateSelect}>{outTime || 'Select Time'}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isOutTimePickerVisible}
                                mode="time"
                                onConfirm={handleOutTimeConfirm}
                                onCancel={hideOutTimePicker}
                            />
                        </View>
                        <Text style={styles.descriptionText}>Task And Reason</Text>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Enter your description"
                            value={description}
                            textAlignVertical="top"
                            onChangeText={(text) => setDescription(text)}
                        />
                        <View style={styles.submittedMain}>
                            <View style={styles.workFromHomeSubContainer}>
                                <Text style={styles.textStyle}>Submitted to: </Text>
                                <Text style={styles.nameStyle}>Madhav Anadkat </Text>
                            </View>
                        </View>
                        <View style={styles.mainBtn}>
                            <TouchableOpacity onPress={handleApplyLeave} style={styles.submitButton}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleApplyLeave} style={[styles.submitButton, { backgroundColor: Colors.Yellow }]}>
                                <Text style={styles.btnText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}