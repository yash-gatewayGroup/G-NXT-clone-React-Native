import React, { useState, useEffect, useId } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../../../Components/Header/header';
import styles from './bottom.style';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../Config/Colors/Colors';
import apiConstants from '../../../Config/Api/apiConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import string from '../../../Components/Strings/Strings';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
const renderFormattedText = (text) => {
    const parts = text.split(/<b>(.*?)<\/b>/g);
    return parts.map((part, index) => {
        if (index % 2 === 1) {
            return (
                <Text key={index} style={{ fontSize: 14, color: Colors.black }}>
                    {part}
                </Text>
            );
        } else {
            return (
                <Text key={index} style={{ fontSize: 11, fontWeight: '500' }}>
                    {part}
                </Text>
            );
        }
    });
};

const DaysAgo = (timestamp) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const differenceInSeconds = currentTimestamp - timestamp.date;
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;

    if (differenceInSeconds < secondsInDay) {
        const hoursAgo = Math.floor(differenceInSeconds / secondsInHour);
        return (
            <View>
                <Text style={styles.daysAgotxt}>
                    {hoursAgo === 0 ? "Less than an hour ago" : `${hoursAgo} hours ago`}
                </Text>
            </View>
        );
    } else {
        const daysAgo = Math.floor(differenceInSeconds / secondsInDay);
        return (
            <View>
                <Text style={styles.daysAgotxt}>{daysAgo} days ago</Text>
            </View>
        );
    }
};

const NotificationItem = ({ item, onPressItem }) => (
    <View >
        <TouchableOpacity onPress={() => onPressItem(item.newsId)} >
            <View style={styles.notificationItem}>
                <Image
                    source={{ uri: item.news_image }}
                    style={styles.notificationImage}
                />
                <View style={styles.notificationContent}>
                    <Text style={styles.notificationDescription}>
                        <Text style={styles.notificationName}>{renderFormattedText(item.title)}</Text>{' '}
                    </Text>
                </View>
            </View>
            <View style={styles.timeStampContainer}>
                <DaysAgo date={item.created_date} />
            </View>
        </TouchableOpacity>
    </View>
);

const Notification = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
    const [userId, setUserId] = useState('');

    const fetchData = async () => {
        if (isLoading || isAllDataLoaded) {
            return;
        }
        setIsLoading(true);
        try {
            const savedUser = await AsyncStorage.getItem(string.Auth.Current_User_Id);
            setUserId(savedUser);
            const response = await fetch(apiConstants.NEWS_BASE_URL + apiConstants.Notification + `?userId=${userId}&page=${page}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic Z25uLWFwaS11c2VyOkZLbjVyN1JjYUtJI2tTcTJvKUByQF4jMg=='
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                const newData = responseData.data;
                if (newData.length === 0) {
                    setIsAllDataLoaded(true);
                } else {
                    setData((prevData) => [...prevData, ...newData]);
                    setPage(page + 1);
                }
            } else {
                console.error('Response not OK:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleItemPress = (itemId) => {
        setIsLoading(true)
        navigation.navigate('NotificationDetails', { myProp: itemId, prevScreen: 'Notification' });
        setIsLoading(false)
    };

    const handleLoadMore = () => {
        if (!isLoading && !isAllDataLoaded) {
            fetchData();
        }
    };

    const renderLoader = () => {
        return isLoading && !isAllDataLoaded ? <ActivityIndicator size={'large'} /> : null;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <NotificationItem item={item} onPressItem={handleItemPress} />
                )}
                onEndReachedThreshold={0.9}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderLoader()}
            />
        </View>
    );
};
export default Notification;