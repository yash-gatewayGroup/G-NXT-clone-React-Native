import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StatusBar, ToastAndroid } from 'react-native';
import Button from '../../../Components/Button/Button.Screen';
import string from '../../../Components/Strings/Strings';
import { useNavigation } from '@react-navigation/native';
import styles from './options.style';
import CustomHeader from '../../../Components/Header/customHeader';
import Colors from '../../../Config/Colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiConstants from '../../../Config/Api/apiConstants';
import { loader } from '../../../Components/Loader/SimpleLoader';

const Settings = () => {
  const navigation = useNavigation();
  const [type, setType] = useState('Android');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      string.Commom_Error_Message.Alert_Logout1,
      string.Commom_Error_Message.Alert_Logout2,
      [
        {
          text: string.Buttons.BtnCancel,
          style: string.Buttons.BtnCancel,
        },
        {
          text: string.Buttons.Btnok,
          onPress: () => {
            logout()
          },
        },
      ],
      { cancelable: false }
    );
  };

  const logout = () => {
    AsyncStorage.removeItem('isLoggedIn').then(
      navigation.navigate(string.Navigations.Login),
    );
    ToastAndroid.show('Logged Out Sucessfully', ToastAndroid.LONG,);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiConstants.NEWS_BASE_URL + apiConstants.CheckVersion + `?device_type=${type}`, {
          method: 'GET',
          headers: {
            'Authorization': "Basic Z25uLWFwaS11c2VyOkZLbjVyN1JjYUtJI2tTcTJvKUByQF4jMg==",
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData.data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!loading ? (
        <View style={styles.settingContainer}>
          <StatusBar
            barStyle={string.Text.Statusbar_Style}
            hidden={false}
            backgroundColor={Colors.SmokyWhite}
          />
          <CustomHeader title={"Settings"} />
          <View style={styles.middle}>
            <Text style={styles.versionText}>Version: {data} </Text>
          </View>
          <View style={styles.settingBottom}>
            <Button text={string.Text.Logout} onPress={handleLogout}></Button>
          </View>
        </View>
      ) : loader()}
    </>
  );
};
export default Settings;