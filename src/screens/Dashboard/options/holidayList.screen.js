import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StatusBar } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CustomHeader from '../../../Components/Header/customHeader';
import Colors from '../../../Config/Colors/Colors';
import string from '../../../Components/Strings/Strings';
import styles from './options.style';
import formatDate from '../../../Components/DateFormatter/formatDate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptdecrypt } from '../../../Components/encrypt';
import apiConstants from '../../../Config/Api/apiConstants';
import { loader } from '../../../Components/Loader/SimpleLoader';

const getDayName = (dateString) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};

const HolidayList = () => {
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const [selectedCity, setSelectedCity] = useState('Pune');
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [location, setLocation] = useState([]);
  const [Holiday, setHoliday] = useState([]);

  useEffect(() => {
    const getDefaultCity = async () => {
      try {
        const defaultCity = await AsyncStorage.getItem('LocationName');
        setSelectedCity(defaultCity);
        getHolidayList()
      } catch (error) {
        console.error('Error retrieving default city: ', error);
      }
    };
    getDefaultCity();
  }, [selectedYear]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    getHolidayList();
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    getHolidayList();
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i <= currentYear + 10; i++) {
      years.push({ label: `${i}`, value: `${i}` });
    }
    return years;
  };

  const yearsData = generateYears()
  const onResponse = async (response) => {
    setLoading(true)
    if (response.ok) {
      response.json()
        .then((responseData) => {
          if (responseData) {
            const data = responseData.Data;
            const locationNames = data.map((item) => item.LocationName);
            const dropdownOptions = locationNames.map((locationName) => ({
              label: locationName,
              value: locationName
            }));
            setLoading(false)
            setLocation(dropdownOptions)
            data.map((item) => {
              if (item.LocationName === selectedCity) {
                setLoading(false)
                setHoliday(item.Holidays)
              }
              else {
                console.log(item.LocationName);
                console.log(selectedCity);
              }
            });
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

  const getHolidayList = async () => {
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
      const crypt = await encryptdecrypt("year=" + selectedYear, true)
      const cryptvalue = crypt.replace(/\=/g, '%3D');
      const response = await fetch(apiConstants.BASE_URL + apiConstants.HolidayList + `?cryptValue=${cryptvalue}`, {
        method: 'GET',
        headers: headers,
      });
      if (response.status == apiConstants.STATUSCODE.SUCCESS) {
        setLoading(false)
        onResponse(response)
      } else {
        setLoading(false)
      }
    } else {
      loader()
    }
  }

  return (
    <>
      <StatusBar
        barStyle={string.Text.Statusbar_Style}
        hidden={false}
        backgroundColor={Colors.SmokyWhite}
      />
      <CustomHeader title={"Holiday List"} />
      <View style={styles.holidayContainer}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            data={location}
            labelField="label"
            valueField="value"
            value={selectedCity}
            placeholderColor={Colors.Black}
            placeholder={selectedCity}
            onChange={(value) => {
              handleCityChange(value.label);
            }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            data={yearsData}
            labelField="label"
            valueField="value"
            placeholderColor={Colors.Black}
            placeholder={selectedYear}
            value={selectedYear}
            onChange={(value) => {
              handleYearChange(value.label);
            }}
            style={{ width: "30%" }}
          />
        </View>
        {loading ? loader() :
          <FlatList
            data={Holiday}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{formatDate(new Date(item.HolidayDate))}</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.itemText}>{item.HolidayName}</Text>
                  <Text style={styles.countryText}>
                    {item.HolidayName}, {getDayName(item.HolidayName + '-01-01')}, {selectedCity}
                  </Text>
                </View>
              </View>
            )}
          />
        }
      </View>
    </>
  );
};

export default HolidayList;