import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './publicNews.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import string from '../../../Components/Strings/Strings';
import { useNavigation } from '@react-navigation/native';
import apiConstants from '../../../Config/Api/apiConstants';
import RepeatPattern from '../../../Components/RepeatPattern/RepeatPattern.screen';

const Dashboard = ({ route }) => {
    const { tabname } = route.params;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
    const [userId, setUserId] = useState('');
    const navigation = useNavigation();

    const fetchData = async () => {
        if (isLoading || isAllDataLoaded) {
            return;
        }
        setIsLoading(true);
        try {
            const savedUser = await AsyncStorage.getItem(string.Auth.Current_User_Id);
            setUserId(savedUser);
            console.log(page);
            const apiUrl = apiConstants.NEWS_BASE_URL + apiConstants.News + `?userId=${userId}&page=${page}`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': string.Token.apiToken
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                const filteredData = responseData.data.filter(
                    (item) => {
                        return item.news_category.category_name === tabname
                    }
                );
                setData((prevData) => [...prevData, ...filteredData]);
                setPage(page + 1);
            } else {
                console.error('Response not OK:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (!isLoading && !isAllDataLoaded) {
            fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId, tabname]);

    const handleItemPress = (itemId) => {
        setIsLoading(true)
        navigation.navigate('NotificationDetails', { myProp: itemId, prevScreen: 'News' });
        setIsLoading(false)
    };

    return (
        <View style={styles.mainContainer}>
            {data.length === 0 ? (
                <Text style={{ alignSelf: "center", fontSize: 18 }}>No data available</Text>
            ) : (
                <FlatList
                    data={[data]}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <RepeatPattern data={item} onPressItem={handleItemPress} />
                    )}
                    onEndReached={handleLoadMore}
                    scrollEnabled={true}
                    ListEmptyComponent={handleLoadMore}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            )}
            {isLoading ? <ActivityIndicator size={'large'} /> : null}
        </View>
    );
};

export default Dashboard;