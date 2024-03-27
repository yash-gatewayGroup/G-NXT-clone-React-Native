import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler, StatusBar, Platform, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './Login.style';
import { BtnLoader } from '../../Components/Loader/ButtonLoader';
import string from '../../Components/Strings/Strings';
import CommonTextInput from '../../Components/TextInput/CommonTextInput';
import Button from '../../Components/Button/Button.Screen';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Config/Colors/Colors';
import DeviceInfo from 'react-native-device-info';
import { encryptdecrypt } from '../../Components/encrypt';
import apiConstants from '../../Config/Api/apiConstants';
import { encode } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../../Components/Alert/Alert.Screen';
import firebase  from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging'

const LoginForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reportingHead, setIsReportingHead] = useState(0);
  const [isSecure, setIsSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const PASSWORD_REGEX = string.Regex.Password_Regex;
  const deviceType = Platform.OS;
  const deviceId = DeviceInfo.getUniqueId();
  const appversion = "5.0.6"

  useEffect(() => {
    const getFCMToken = async () => {
      const fcmtoken = await firebase.messaging().getToken();
      AsyncStorage.setItem('fcmToken', fcmtoken);
      return fcmtoken
    };
    getFCMToken();
  }, []);

  function localToUTC() {
    const date = new Date();
    const gmt = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const currentDate = new Date(gmt.getTime() + 720000);
    return String(currentDate.getTime());
  };

  useEffect(() => {
    const backAction = () => {
      handleShowAlert()
      return true;
    };
    BackHandler.addEventListener(string.BackHandler.BackPress, backAction);
    return () => {
      BackHandler.removeEventListener(string.BackHandler.BackPress, backAction);
    };
  }, []);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const onResponse = async (response) => {
    if (response.ok) {
      response.json()
        .then((responseData) => {
          if (responseData) {
            if (responseData.Data) {
              if (responseData.Data.Response) {
                const responseValue = responseData.Data.Response;
                const loginResponse = responseValue;
                const decrypt = encryptdecrypt(loginResponse, false)
                decrypt.then((res) => {
                  const parsedResponse = JSON.parse(res);
                  setIsReportingHead(parsedResponse.ReportingHeadId)
                  AsyncStorage.setItem(string.Auth.Current_User_Id, JSON.stringify(parsedResponse.EmpId))
                  AsyncStorage.setItem('isLoggedIn', 'true');
                  AsyncStorage.setItem('email', email);
                  AsyncStorage.setItem('password', password);
                  AsyncStorage.setItem('LocationName', parsedResponse.LocationName);
                  AsyncStorage.setItem('reportingHead', JSON.stringify(parsedResponse.ReportingHeadId));
                  AsyncStorage.setItem('reportingHeadName', parsedResponse.ReportingHeadName);
                  AsyncStorage.setItem(string.Auth.Token, JSON.stringify(parsedResponse))
                  setLoading(false)
                  setEmail('')
                  setPassword('')
                  navigation.navigate('BottomNavigator', { screen: 'Home' });
                })
              } else {
                console.error('Response is not valid.');
              }
            }
          }
        })
    }
  };

  const handleLoginPress = async () => {
    setLoading(true);
    if (email === '') {
      setLoading(false);
      ToastAndroid.show('Please Enter the UserName', ToastAndroid.LONG,);
    }
    // Check if password is empty
    else if (password === '') {
      setLoading(false);
      ToastAndroid.show('Invalid Enter Password', ToastAndroid.LONG,);
    }
    // Check if password is valid
    else if (PASSWORD_REGEX.test(password) === false) {
      setLoading(false);
      ToastAndroid.show('Invalid Format Password', ToastAndroid.LONG,);
    }
    // If email and password are not empty or invalid, try to log in
    else {
      try {
        const originalString = password;
        const base64String = encode(originalString);
        const fcmtoken = await firebase.messaging().getToken();
        const params = {
          AppVersion: appversion,
          DeviceId: deviceId["_j"],
          DeviceType: deviceType,
          FCM_Token: fcmtoken,
          password: base64String,
          pswd: password,
          username: email,
        }
        const jsonString = JSON.stringify(params);
        const body = async () => {
          const encryptedBody = await encryptdecrypt(jsonString, true);
          const bodyData = {
            "Request": encryptedBody,
            "SecretMethod": "credential/login",
            "QueryStringParams": ""
          };
          return bodyData;
        };
        const EncryptedHeader = `${email}:${password}:${localToUTC()}:${reportingHead}`;
        const Res = (await encryptdecrypt(EncryptedHeader, true))
        const headers = {
          'Authorization': "basic " + Res,
          'Content-Type': 'application/json',
        };
        body()
          .then(async (bodyData) => {
            fetch(apiConstants.BASE_URL + apiConstants.Post, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(bodyData),
            }).then((response) => {
              if (response.status == apiConstants.STATUSCODE.SUCCESS) {
                onResponse(response)
              } else if (response.status == apiConstants.STATUSCODE.REDIRECTION_ERROR) {
                setLoading(false)
                setEmail('')
                setPassword('')
                ToastAndroid.show(string.Auth.Invalid_Credential, ToastAndroid.LONG);
              } else if (response.status == apiConstants.STATUSCODE.USER_ERROR) {
                setLoading(false)
                setEmail('')
                setPassword('')
                ToastAndroid.show(string.Auth.Unauthorized, ToastAndroid.LONG);
              } else if (response.status == apiConstants.STATUSCODE.INTERNAL_SERVER_ERROR) {
                setLoading(false)
                setEmail('')
                setPassword('')
                ToastAndroid.show(string.Commom_Error_Message.Server_Down, ToastAndroid.LONG);
              }
            })
              .catch((error) => {
                console.error('Fetch Error:', error);
              });
          })
      } catch (err) {
        console.log("Error", err);
      }
    }
  };

  const okbtn = () => {
    BackHandler.exitApp()
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  return (
    <View style={styles.body}>
      <StatusBar
        barStyle={string.Text.Statusbar_Style}
        hidden={false}
        backgroundColor={Colors.Yellow}
      />
      <View style={styles.img}>
        <Image
          source={require('../../assets/Gateway.png')}
          style={styles.logo}
        />
        <Text style={{ paddingStart: 10, fontWeight: "bold", fontSize: 30, color: Colors.black }}>Gateway Group</Text>
      </View>
      <View style={styles.textcontain}>
        <Text style={styles.GnxtText}>{"A Software Engineering Company"}</Text>
      </View>
      <View style={styles.card}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={string.BackHandler.KeyboardScrollTap}>
          <Text style={styles.Gnxttitle}> {"G-NXT"}</Text>
          <Text style={styles.textusername}>{"UserName"}</Text>
          <View style={styles.Textinputcontainer}>
            <View style={styles.emailview}>
              <CommonTextInput
                value={"yashmajithiya"||email.trim()}
                onChangeText={setEmail}
                style={styles.password_container}
              />
            </View>
          </View>
          <Text style={styles.textpassword}>{"Password"}</Text>
          <View style={styles.Textinputcontainerpassword}>
            <CommonTextInput
              value={"Passw0rd@4"||password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.Commontxtinput}
              returnType={string.Returntype.Done}
              secure={isSecure}
            />
            <TouchableOpacity
              onPress={() => {
                setIsSecure(prev => !prev);
              }}
              style={styles.eye_icon_touch}>
              {isSecure ? (
                <Image source={require('../../assets/visible.png')} color={Colors.Black} style={styles.eye_Image} />
              ) : (
                <Image source={require('../../assets/hidden.png')} color={Colors.Black} style={styles.eye_Image} />
              )}
            </TouchableOpacity>
          </View>
          {!loading ? (
            <Button text={string.Buttons.BtnLogin} onPress={handleLoginPress}></Button>
          ) : (
            <View style={styles.Acitvitybanner}>
              {BtnLoader()}
            </View>
          )}
          {showAlert ? (
            <CustomAlert
              title={string.Buttons.BtnExit}
              visible={showAlert}
              message={string.Auth.Login.BackAction1 + string.Auth.Login.BackAction2}
              onClose={() => handleCloseAlert()}
              action={() => okbtn()}
            />
          ) : (
            <></>
          )}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

export default LoginForm;