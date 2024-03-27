import React, { useState, useEffect } from 'react';
import { Alert, View, Image, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import Colors from '../../../Config/Colors/Colors';
import Header from '../../../Components/Header/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptdecrypt } from '../../../Components/encrypt';
import { loader } from '../../../Components/Loader/SimpleLoader';
import { useNavigation } from '@react-navigation/native';
import apiConstants from '../../../Config/Api/apiConstants';
import { RNCamera } from 'react-native-camera';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Refreshment = () => {
  const [data, setData] = useState([]);
  const [tea1shown, setTea1Shown] = useState(false)
  const [tea2Shown, setTea2Shown] = useState(false)
  const [snacks1, setIsSnacks1] = useState(false);
  const [snacks2, setIsSnacks2] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation()

  const handleScanButtonPress = () => {
    setIsLoading(true)
    request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
      console.log(result);
      if (result === RESULTS.GRANTED) {
        setIsLoading(false)
        navigation.navigate('QRCodeScanner')

      } else if (result === RESULTS.DENIED) {
        setIsLoading(false)
        navigation.goBack();
      } else if (result === RESULTS.BLOCKED) {
        setIsLoading(false)
        Alert.alert(
          'Permission Denied',
          'You have denied camera permission. Please go to app settings to enable it.',
          [
            {
              text: 'No',
              onPress: () => {

              },
            },
            {
              text: 'Yes',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]
        );
      }
    })
  };

  const fetchDataFromAPI = async () => {
    try {
      const EmpId = await AsyncStorage.getItem('currentUserId');
      const Res = await encryptdecrypt("empID=" + EmpId, true, true)
      const Response = Res.replace(/\+/g, '__PLUS__');
      const response = await fetch(apiConstants.BASE_URL + apiConstants.GetSnacksDetails + `?cryptValue=${Response}`, {
        method: "GET",
      });
      const result = await response.json();
      setData(result.Data);
      console.log(result);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    // Morning Tea
    if (data.Tea1 === 0) {
      setTea1Shown(true)
    } else if (data.Tea1 === 1) {
      setIsScanned(true)
    } else if (data.Tea1 === 2) {
      setTea1Shown(false)
      setIsScanned(false)
    }

    // Evening Tea
    if (data.Tea2 === 0) {
      setTea2Shown(true)
    } else if (data.Tea2 === 1) {
      setIsScanned(true)
    } else if (data.Tea2 === 2) {
      setTea2Shown(false)
      setIsScanned(false)
    }

    // Snack One
    if (data.Snack1 === 0) {
      setIsSnacks1(true)
    } else if (data.Snack1 === 1) {
      setIsScanned(true)
    } else if (data.Snack1 === 2) {
      setIsSnacks1(false)
      setIsScanned(false)
    }

    // Snack Two
    if (data.Snack2 === 0) {
      setIsSnacks2(true)
    } else if (data.Snack2 === 1) {
      setIsScanned(true)
    } else if (data.Snack2 === 2) {
      setIsSnacks2(true)
      setIsScanned(false)
    }
  }, [data]);

  return (
    <>
      <Header />
      {isLoading ? (
        <View style={styles.loader}>
          {loader()}
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.topRow}>
            {tea1shown ? (
              <TouchableOpacity style={styles.boxEnable} onPress={() => {
                if (tea1shown) {
                  handleScanButtonPress()
                }
              }}>
                <Image source={require('../../../assets/ic_tea.png')} style={styles.img} />
                <Text style={styles.enableText}>
                  Morning TEA/COFFEE - 120ML
                </Text>
                {isScanned && (
                  <View style={styles.scanView}>
                    <Image source={require('../../../assets/ic_scanned.png')} style={styles.scanImg} />
                  </View>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.boxDisable} activeOpacity={0.9} >
                <Image source={require('../../../assets/ic_tea_bw.png')} style={styles.img} />
                <Text style={styles.disableText}>
                  Morning TEA/COFFEE - 120ML
                </Text>
                {isScanned && (
                  <View style={styles.scanView}>
                    <Image source={require('../../../assets/ic_scanned.png')} style={styles.scanImg} />
                  </View>
                )}
              </TouchableOpacity>
            )}
            {tea2Shown ?
              <TouchableOpacity style={styles.boxEnable} onPress={handleScanButtonPress}>
                <Image source={require('../../../assets/ic_tea.png')} style={styles.img} />
                <Text style={styles.enableText}>Evening TEA/COFFEE - 120ML</Text>
                {isScanned && (
                  <View style={styles.scanView}>
                    <Image source={require('../../../assets/ic_scanned.png')} style={styles.scanImg} />
                  </View>
                )}
              </TouchableOpacity> :
              <TouchableOpacity style={styles.boxDisable} activeOpacity={0.9}>
                <Image source={require('../../../assets/ic_tea_bw.png')} style={styles.img} />
                <Text style={styles.disableText}>Evening TEA/COFFEE - 120ML</Text>
                {isScanned && (
                  <View style={styles.scanView}>
                    <Image source={require('../../../assets/ic_scanned.png')} style={styles.scanImg} />
                  </View>
                )}
              </TouchableOpacity>
            }

          </View>
          {snacks1 ?
            <TouchableOpacity style={styles.middleBoxEnable} onPress={handleScanButtonPress}>
              <Image source={require('../../../assets/snacks.png')} style={styles.img2} />
              <Text style={styles.enableMiddleText}>Plate 1</Text>
              {isScanned && (
                <View style={styles.scanView}>
                  <Image source={require('../../../assets/ic_scanned.png')} style={styles.scanImg} />
                </View>
              )}
            </TouchableOpacity> :
            <TouchableOpacity style={styles.middleBoxDisable} activeOpacity={0.9}>
              <Image source={require('../../../assets/snacks_bw.png')} style={styles.img2} />
              <Text style={styles.middledisableText}>Plate 1</Text>
              {isScanned && (
                <View style={styles.scanView}>
                  <Image source={require('../../../assets/ic_scanned.png')} style={styles.scanImg} />
                </View>
              )}
            </TouchableOpacity>
          }
        </View>
      )}
    </>
  )
};

const styles = StyleSheet.create({
  cameraStyle: {
    flex: 1,
  },
  scannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: "60%",
    width: "50%",
    alignSelf: "center",
  },
  img2: {
    height: "68%",
    width: "55%",
    alignSelf: "center",
  },
  enableText: {
    fontSize: 14,
    color: Colors.black,
    height: "50%",
    width: "90%",
    paddingTop: 10,
    alignSelf: "center",
    fontWeight: '500'
  },
  enableMiddleText: {
    fontSize: 16,
    color: Colors.black,
    height: "50%",
    width: "30%",
    paddingTop: 10,
    alignSelf: "center",
    fontWeight: '700'
  },
  scanImg: {
    height: "100%",
    width: "100%"
  },
  disableText: {
    fontSize: 14,
    color: Colors.grey,
    height: "50%",
    width: "90%",
    paddingTop: 10,
    alignSelf: "center",
    fontWeight: '300'
  },
  scanView: {
    position: 'absolute',
    left: 0,
    height:"100%",
    width:"100%"
  },
  middledisableText: {
    fontSize: 14,
    color: Colors.grey,
    height: "25%",
    width: "100%",
    paddingTop: 10,
    fontWeight: '400',
    textAlign:"center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'lightgray',
    padding: 10,
    alignItems: 'center',
  },

  topRow: {
    flexDirection: 'row',
    width: "80%",
    justifyContent: "center",
    height: "20%",
  },
  middleBox: {
    width: "100%",
    height: "50%",
    backgroundColor: Colors.SmokyWhite,
    marginVertical: 50,
    borderWidth: 2,
  },
  middleBoxEnable: {
    width: "50%",
    height: "25%",
    backgroundColor: Colors.SmokyWhite,
    marginVertical: 50,
    borderWidth: 2,
    paddingTop: 20
  },
  middleBoxDisable: {
    width: "45%",
    height: "20%",
    backgroundColor: Colors.Gainsboro,
    marginVertical: 30,
    borderWidth:1,
    paddingTop: 10,
    borderRadius:10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    width: 170,
    height: 190,
    backgroundColor: Colors.SmokyWhite,
    marginHorizontal: 10,
    borderWidth: 2
  },
  boxEnable: {
    width: "50%",
    height: "100%",
    backgroundColor: Colors.SmokyWhite,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius:10,
    paddingTop:10
  },
  boxDisable: {
    width: "50%",
    height: "100%",
    backgroundColor: Colors.Gainsboro,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius:10,
    paddingTop:10
  }
});

export default Refreshment;
