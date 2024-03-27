import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomHeader from '../../../Components/Header/customHeader';
import Colors from '../../../Config/Colors/Colors';
import ModalDropdown from 'react-native-modal-dropdown';
import string from '../../../Components/Strings/Strings';
import formatDate from '../../../Components/DateFormatter/formatDate';
import { useNavigation } from '@react-navigation/native';
import styles from './options.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptdecrypt } from '../../../Components/encrypt';
import apiConstants from '../../../Config/Api/apiConstants';
import { loader } from '../../../Components/Loader/SimpleLoader';

function MyLeaves() {
  const currentYear = new Date().getFullYear();
  const navigation = useNavigation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [leaves, setLeaves] = useState('');
  const [data, setData] = useState([])

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const dropdownOptions = [
    { label: 'Edit Leave', imageSource: require('../../../assets/pencil.png') },
    { label: 'Delete Leave', imageSource: require('../../../assets/bin.png') },
    { label: 'Cancel Leave', imageSource: require('../../../assets/close.png') }
  ];

  useEffect(() => {
    getLeaveList()
  }, []);

  function localToUTC() {
    const date = new Date();
    const gmt = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const currentDate = new Date(gmt.getTime() + 720000);
    return String(currentDate.getTime());
  };

  const onResponse = async (response) => {
    if (response.ok) {
      response.json()
        .then((responseData) => {
          if (Array.isArray(responseData.Data) && responseData.Data.length > 0) {
            const totalLeaves = responseData.Data[0].TotalLeaves;
            const leaveDetails = responseData.Data[0].leaveDetails;
            setData(leaveDetails)
            setLeaves(totalLeaves)
          }
        })
    }
  }

  const getLeaveList = async () => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    const reportingHead = await AsyncStorage.getItem('reportingHead');
    const currentUserId = await AsyncStorage.getItem('currentUserId');
    const EncryptedHeader = `${email}:${password}:${localToUTC()}:${reportingHead}`;
    if (email && password && reportingHead && currentUserId) {
      const Res = (await encryptdecrypt(EncryptedHeader, true))
      const headers = {
        'Authorization': "basic " + Res,
        'Content-Type': 'application/json',
      };
      const crypt = await encryptdecrypt("EmpId=" + currentUserId + "&year=" + currentYear, true)
      const cryptvalue = crypt.replace(/\+/g, '__Plus__');
      const response = await fetch(apiConstants.BASE_URL + apiConstants.MyLeaves + `?cryptValue=${cryptvalue}`, {
        method: 'GET',
        headers: headers,
      });
      if (response.status == apiConstants.STATUSCODE.SUCCESS) {
        onResponse(response)
      } else {
        return null
      }
    } else {
      loader()
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.leaveItemContainer}>
        <View style={styles.calendarContainer}>
          <Image source={require('../../../assets/calendar.png')} style={styles.calendarImage} />
          <Text style={styles.leaveDateText}>{formatDate(new Date(item.AppliedOn))}</Text>
        </View>
        <View style={styles.leaveSubContainer}>
          <View style={styles.subTitle}>
            <Text style={styles.leaveItemText}>{"Duration"} {":"}</Text>
            <Text style={styles.subText}> {item.TotalDays}</Text>
          </View>
          <View style={styles.subTitle}>
            <Text style={styles.leaveItemText}>{"Date"} {":"}</Text>
            <Text style={styles.subText}>{formatDate(new Date(item.FromDate)) + " To " + formatDate(new Date(item.ToDate))}</Text>
          </View>
          <View style={styles.subTitle}>
            <Text style={styles.leaveItemText}>{"Reason"} {":"}</Text>
            <Text style={styles.subText}> {item.Reason}</Text>
          </View>
          <View style={styles.subTitle}>
            <Text style={styles.leaveItemText}>{"Leave Status"} {":"}</Text>
            <Text style={styles.subText}> {item.LeaveStatus}</Text>
          </View>
          <View style={styles.subTitle}>
            <Text style={styles.leaveItemText}>{"Leave Type"} {":"}</Text>
            <Text style={styles.subText}> {item.LeaveType}</Text>
          </View>
        </View>
        <ModalDropdown
          options={dropdownOptions}
          isVisible={isDropdownVisible}
          onClose={closeDropdown}
          defaultValue={<Image source={require('../../../assets/menu.png')} style={styles.menuImage} />}
          dropdownStyle={styles.dropdownContainer}
          renderRow={(option, index, isSelected) => (
            <TouchableOpacity onPress={() => handleDropdownSelection(option)} style={styles.dropdownOption}>
              <View style={styles.dropdownItem}>
                <Image source={option.imageSource} style={styles.dropdownImage} />
                <Text style={styles.dropdownText}>{option.label}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <>
      {data != '' ? (
        <>
          <View style={styles.leavesContainer}>
            <View style={styles.subLeave}>
              <Text style={styles.leaveText}>{"Leaves Taken"}</Text>
            </View>
            <View style={styles.hoursSubcontainer}>
              <Text style={styles.hoursText}>{leaves}</Text>
            </View>
            <View style={styles.yearContainer}>
              <Text style={styles.yearText}>{currentYear}</Text>
            </View>
            <TouchableOpacity style={styles.applyLeaveBtn} onPress={() => navigation.navigate('ApplyLeave')} >
              <Text style={styles.applyLeaveText}>{"Apply Leave"}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : loader()}
    </>
  );
}

function Workfromhome() {
  const [data, setData] = useState([])
  const navigation = useNavigation();

  function localToUTC() {
    const date = new Date();
    const gmt = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const currentDate = new Date(gmt.getTime() + 720000);
    return String(currentDate.getTime());
  };

  useEffect(() => {
    getWorkFromHomeList()
  })

  const onResponse = async (response) => {
    if (response.ok) {
      response.json()
        .then((responseData) => {
          if (Array.isArray(responseData.Data) && responseData.Data.length > 0) {
            setData(responseData.Data)
          }
        })
    }
  }

  const getWorkFromHomeList = async () => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    const reportingHead = await AsyncStorage.getItem('reportingHead');
    const currentUserId = await AsyncStorage.getItem('currentUserId');
    const EncryptedHeader = `${email}:${password}:${localToUTC()}:${reportingHead}`;
    if (email && password && reportingHead && currentUserId) {
      const Res = (await encryptdecrypt(EncryptedHeader, true))
      const headers = {
        'Authorization': "basic " + Res,
        'Content-Type': 'application/json',
      };
      const crypt = await encryptdecrypt("EmpId=" + currentUserId, true)
      const cryptvalue = crypt.replace(/\+/g, '__Plus__');
      const response = await fetch(apiConstants.BASE_URL + apiConstants.Work_From_Home + `?cryptValue=${cryptvalue}`, {
        method: 'GET',
        headers: headers,
      });
      if (response.status == apiConstants.STATUSCODE.SUCCESS) {
        onResponse(response)
      } else {
        navigation.goBack()
      }
    } else {
      loader()
    }
  }

  const dateFormmater = (res) => {
    const parts = res.split('T');
    const datePart = parts[0];
    const timePart = parts[1];
    const time = timePart.slice(0, 5);
    return `${datePart} at ${time}`;
  }

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.homeitemContainer}>
        <View style={styles.itemContent}>
          <View style={styles.itemSubContainer}>
            <Text style={styles.fromText}>From Date: </Text>
            <Text>{dateFormmater(item.FromDate)}</Text>
          </View>
          <View style={styles.toDateContainer}>
            <Text style={styles.text}>To Date: </Text>
            <Text>{dateFormmater(item.ToDate)}</Text>
          </View>
          <View style={styles.WhiteContainer}></View>
          <View style={styles.goldenContainer}>
            <Text style={styles.text}>Date In Submit: </Text>
            <Text>{dateFormmater(item.DateInSubmit)}</Text>
          </View>
          <View style={styles.goldenContainer}>
            <Text style={styles.text}>Date Out Submit: </Text>
            <Text>{dateFormmater(item.DateOutSubmit)}</Text>
          </View>
          <View style={styles.reasonContainer}>
            <Text style={styles.text}>Reason: </Text>
            <Text>{item.Reason}</Text>
          </View>
          {item.Status === 'Approved' &&
            <View style={styles.approvedContainer}>
              <Text style={styles.text}>Approved On: </Text>
              <Text>{dateFormmater(item.ApprovedOn)}</Text>
            </View>}
          <View style={styles.iconContainer}>
            <Image
              source={item.Status === 'Approved' ? require('../../../assets/approved.png') : require('../../../assets/rejected.png')}
              style={styles.icon}
            />
          </View>
        </View>
      </View>

    </View>
  );

  return (
    <>
      {data != '' ? (
        <>
          <View style={styles.leavesContainer}>
            <View style={{ width: "80%", alignItems: "center", paddingStart: 50 }}>
              <TouchableOpacity style={styles.btnWorkFromHome} onPress={() => navigation.navigate('ApplyWorkFromHome')} >
                <Text style={styles.applyLeaveText}>{"Apply Work From Home"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : loader()}
    </>
  );
}

function OutOfOffice() {
  const [data, setData] = useState([])
  const navigation = useNavigation();

  useEffect(() => {
    getOutOfOffice()
  })

  const onResponse = async (response) => {
    if (response.ok) {
      response.json()
        .then((responseData) => {
          if (Array.isArray(responseData.Data) && responseData.Data.length > 0) {
            setData(responseData.Data)
          }
        })
    }
  }

  function localToUTC() {
    const date = new Date();
    const gmt = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const currentDate = new Date(gmt.getTime() + 720000);
    return String(currentDate.getTime());
  };

  const getOutOfOffice = async () => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    const reportingHead = await AsyncStorage.getItem('reportingHead');
    const currentUserId = await AsyncStorage.getItem('currentUserId');
    const EncryptedHeader = `${email}:${password}:${localToUTC()}:${reportingHead}`;
    if (email && password && reportingHead && currentUserId) {
      const Res = (await encryptdecrypt(EncryptedHeader, true))
      const headers = {
        'Authorization': "basic " + Res,
        'Content-Type': 'application/json',
      };
      const crypt = await encryptdecrypt("EmpId=" + currentUserId, true)
      const cryptvalue = crypt.replace(/\+/g, '__Plus__');
      const response = await fetch(apiConstants.BASE_URL + apiConstants.outOfOffice + `?cryptValue=${cryptvalue}`, {
        method: 'GET',
        headers: headers,
      });
      if (response.status == apiConstants.STATUSCODE.SUCCESS) {
        onResponse(response)
      } else {
        navigation.goBack()
      }
    } else {
      loader()
    }
  }

  const dateFormmater = (res) => {
    const parts = res.split('T');
    const datePart = parts[0];
    const timePart = parts[1];
    const time = timePart.slice(0, 5);
    return `${datePart} at ${time}`;
  }

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.homeitemContainer}>
        <View style={styles.itemContent}>
          <View style={styles.itemSubContainer}>
            <Text style={styles.fromText}>From Date: </Text>
            <Text>{dateFormmater(item.FromDate)}</Text>
          </View>
          <View style={styles.toDateContainer}>
            <Text style={styles.text}>To Date: </Text>
            <Text>{dateFormmater(item.ToDate)}</Text>
          </View>
          <View style={styles.WhiteContainer}></View>
          <View style={styles.goldenContainer}>
            <Text style={styles.text}>Date In Submit: </Text>
            <Text>{dateFormmater(item.DateInSubmit)}</Text>
          </View>
          <View style={styles.goldenContainer}>
            <Text style={styles.text}>Date Out Submit: </Text>
            <Text>{dateFormmater(item.DateOutSubmit)}</Text>
          </View>
          <View style={styles.reasonContainer}>
            <Text style={styles.text}>Reason: </Text>
            <Text>{item.Reason}</Text>
          </View>
          {item.Status === 'Approved' &&
            <View style={styles.approvedContainer}>
              <Text style={styles.text}>Approved On: </Text>
              <Text>{dateFormmater(item.ApprovedOn)}</Text>
            </View>}
          <View style={styles.iconContainer}>
            <Image
              source={item.Status === 'Approved' ? require('../../../assets/approved.png') : require('../../../assets/rejected.png')}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <>
    {data!= '' ? (
      <>
      <View style={styles.leavesContainer}>
        <View style={{ width: "80%", alignItems: "center", paddingStart: 50 }}>
          <TouchableOpacity style={styles.btnWorkFromHome} onPress={() => navigation.navigate('ApplyOutofOffice')} >
            <Text style={styles.applyLeaveText}>{"Apply Out of Office"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      </>
    ) : loader() }
    </>
  );
}

const Tab = createMaterialTopTabNavigator();

const Leave = () => {
  const [tabWidth, setTabWidth] = useState(90);

  const calculateTabWidth = (fontSize) => {
    return fontSize * 12;
  };

  useEffect(() => {
    const fontSize = 10;
    const newTabWidth = calculateTabWidth(fontSize);
    setTabWidth(newTabWidth);
  }, []);

  return (
    <>
      <StatusBar
        barStyle={string.Text.Statusbar_Style}
        hidden={false}
        backgroundColor={Colors.SmokyWhite}
      />
      <CustomHeader title={"Leaves"} />
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          height: 40,
          backgroundColor: Colors.SmokyWhite
        },
        tabBarTabStyle: {
          width: tabWidth,
        },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.Yellow,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          color: Colors.Black,
        },
      }}>
        <Tab.Screen name="My Leaves" component={MyLeaves} />
        <Tab.Screen name="Work From Home" component={Workfromhome} />
        <Tab.Screen name="Out Of Office" component={OutOfOffice} />
      </Tab.Navigator>
    </>
  );
}

export default Leave;