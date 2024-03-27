import React, { useState, useEffect } from 'react';
import { StatusBar, View, TextInput, FlatList, Image, Text } from 'react-native';
import CustomHeader from '../../../Components/Header/customHeader';
import string from '../../../Components/Strings/Strings';
import Colors from '../../../Config/Colors/Colors';
import styles from './options.style'
import formatDate from '../../../Components/DateFormatter/formatDate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiConstants from '../../../Config/Api/apiConstants';
import { encryptdecrypt } from '../../../Components/encrypt';
import { loader } from '../../../Components/Loader/SimpleLoader';
import { useNavigation } from '@react-navigation/native';
import { getNameLable } from '../../../Components/GetNamelabel/GetNameLablel.Screen';

const BirthdayList = () => {
  const [searchText, setSearchText] = useState('');
  const [birthdayData, setBirthdayData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()

  function localToUTC() {
    const date = new Date();
    const gmt = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const currentDate = new Date(gmt.getTime() + 720000);
    return String(currentDate.getTime());
  };

  useEffect(() => {
    getBirthdayList()
  }, []);

  const onResponse = async (response) => {
    if (response.ok) {
      response.json()
        .then((responseData) => {
          if (responseData) {
            if (responseData.Data) {
              if (responseData.Data) {
                const responseValue = responseData.Data;
                setBirthdayData(responseValue);
                setFilteredData(responseValue);
              }
            }
          }
        })
    }
  }

  const getBirthdayList = async () => {
    setLoading(true)
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    const reportingHead = await AsyncStorage.getItem('reportingHead');
    const currentUserId = await AsyncStorage.getItem('currentUserId');
    console.log(currentUserId);
    const EncryptedHeader = `${email}:${password}:${localToUTC()}:${reportingHead}`;
    if (email && password && reportingHead && currentUserId) {
      const Res = (await encryptdecrypt(EncryptedHeader, true))
      const headers = {
        'Authorization': "basic " + Res,
        'Content-Type': 'application/json',
      };
      const response = await fetch(apiConstants.BASE_URL + apiConstants.Birthday, {
        method: 'GET',
        headers: headers,
      });
      if (response.status == apiConstants.STATUSCODE.SUCCESS) {
        onResponse(response)
        setLoading(false)
      } else {
        navigation.goBack();
        setLoading(false)
      }
    } else {
      loader()
    }
  }

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = birthdayData.filter((item) =>
      item.empname.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const groupedData = {};
  filteredData.forEach((item) => {
    const date = new Date(item.birthdate);
    const formattedDate = formatDate(date);
    if (!groupedData[formattedDate]) {
      groupedData[formattedDate] = [];
    }
    groupedData[formattedDate].push(item);
  });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.photo == "" ?
        <Image source={require('../../../assets/Gateway.png')} style={styles.image} />
        :
        <Image
          source={{ uri: item.photo }}
          style={styles.image}
        />}
      <View>
        <Text style={styles.name}>{item.empname}</Text>
      </View>
    </View>
  );

  return (
    <View style={{height:"100%"}}>
      <StatusBar
        barStyle={string.Text.Statusbar_Style}
        hidden={false}
        backgroundColor={Colors.SmokyWhite}
      />
      <CustomHeader title={"Birthdays"} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          onChangeText={handleSearch}
          value={searchText}
        />
        <Image source={require('../../../assets/magnifying-glass.png')} style={styles.searchIcon} />
      </View>
      <View style={styles.birthdayContainer}>
        <Text style={styles.birthdayText}>{"Birthdays"}</Text>
      </View>
      {!loading ? 
      <FlatList
        data={Object.keys(groupedData)}
        keyExtractor={(date) => date}
        renderItem={({ item }) => (
          <View style={styles.dateGroup}>
            <View style={styles.subContainer}>
              <Image source={require('../../../assets/birthday.png')} style={styles.birthdayImage} />
              <Text style={styles.groupDate}>{item}</Text>
            </View>
            {groupedData[item].map((person) => (
              <View key={person.empid}>
                {renderItem({ item: person })}
              </View>
            ))}
          </View>
        )}
      /> : loader()}
    </View>
  );
};

export default BirthdayList;