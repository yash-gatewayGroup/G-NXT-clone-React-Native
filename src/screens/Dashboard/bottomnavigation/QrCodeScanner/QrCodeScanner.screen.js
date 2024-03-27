import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CustomHeader from '../../../../Components/Header/customHeader';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loader } from '../../../../Components/Loader/SimpleLoader';
import { encryptdecrypt } from '../../../../Components/encrypt';
import apiConstants from '../../../../Config/Api/apiConstants';

const QRCodeScannerScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState('')
    const [reportingHead, setReportingHead] = useState('')

    let PARAM_TEA = 0
    let PARAM_SNACK = 0
    let PARAM_SLOT = 0
    const navigation = useNavigation()

    useEffect(() => {
        getDataFromAsyncStorage('email').then((res) =>
            setEmail(res),
        );
        getDataFromAsyncStorage('password').then((res) =>
            setPassword(res)
        );
        getDataFromAsyncStorage('reportingHead').then((res) =>
            setReportingHead(res)
        );
        getDataFromAsyncStorage('currentUserId').then((res) =>
            setUserId(res)
        );
    }, []);

    const getDataFromAsyncStorage = async (key) => {
        try {
            const jsonData = await AsyncStorage.getItem(key);
            if (jsonData !== null) {
                return jsonData;
            } else {
                return null;
            }
        } catch (error) {
            console.error(`Error fetching data from AsyncStorage for key ${key}:`, error);
            throw error;
        }
    };

    const handleQRCodeScan = (e) => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const { data } = e;
        if (data === 'http://GATEWAY-TEA') {
            PARAM_TEA = 1
            callSnackApi(PARAM_TEA, PARAM_SNACK, PARAM_SLOT);
        } else if (data === 'http://GATEWAY-SNACK') {
            PARAM_SNACK = 1
            callSnackApi(PARAM_TEA, PARAM_SNACK, PARAM_SLOT);
        } else if (data === 'http://GATEWAY-COFFEE') {
            PARAM_TEA = 2
            callSnackApi(PARAM_TEA, PARAM_SNACK, PARAM_SLOT);
        }
        setIsLoading(false);
    }

    const onResponse = async (response) => {
        if (response.ok) {
            navigation.goBack();
            response.json()
                .then((responseData) => {
                    if (responseData) {
                        if (responseData.Data) {
                            if (responseData.Data.Response) {
                                const responseValue = responseData.Data.Response;
                                const loginResponse = responseValue;
                                const decrypt = encryptdecrypt(loginResponse, false)
                                decrypt.then((res) => {
                                    console.log(res);
                                    setIsLoading(false);
                                    ToastAndroid.show(res,ToastAndroid.LONG)
                                })
                            }
                        }
                    }
                })
        }
    }

    const callSnackApi = async (Tea, Snacks, Slots) => {
        setIsLoading(true)
        function localToUTC() {
            const date = new Date();
            const gmt = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const currentDate = new Date(gmt.getTime() + 720000);
            return String(currentDate.getTime());
        };
        
        try {
            const EncryptedHeader = `${email}:${password}:${localToUTC()}:${reportingHead}`;
            const Res = (await encryptdecrypt(EncryptedHeader, true))
            console.log(Res);
            const headers = {
                'Authorization': "basic " + Res,
                'Content-Type': 'application/json',
            };
            const params = {
                empId: userId,
                slot: Slots,
                tea: Tea,
                snacks: Snacks
            }
            const jsonString = JSON.stringify(params);
            const body = async () => {
                const encryptedBody = await encryptdecrypt(jsonString, true);
                const bodyData = {
                    "Request": encryptedBody,
                    "SecretMethod": apiConstants.cafeteria,
                    "QueryStringParams": ""
                };
                return bodyData;
            };
            console.log(jsonString);
            setIsLoading(true);
            body().then(async (bodyData) => {
                fetch(apiConstants.BASE_URL + apiConstants.Post, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(bodyData),
                }).then((response) => {
                    if (response.status == apiConstants.STATUSCODE.SUCCESS) {
                        onResponse(response)
                    }else{
                        setIsLoading(false)
                    }
                })
            })
        }
        catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <CustomHeader title={"Sacn a Qr Code"} />
            {isLoading ? loader() :
                <QRCodeScanner
                    onRead={handleQRCodeScan}
                    cameraStyle={styles.cameraStyle}
                    containerStyle={styles.scannerContainer}
                    showMarker={true}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:"100%",
        height: "100%"
    },
    cameraStyle: {
        width: 350,
        height: "100%"
    },
    scannerContainer: {
        alignItems: 'center',
    },
});

export default QRCodeScannerScreen;