import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StatusBar, TouchableOpacity, Text, ScrollView, TextInput, Modal } from 'react-native';
import string from '../../../Components/Strings/Strings';
import styles from './notificationDetail.style';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import RBSheet from "react-native-raw-bottom-sheet";
import { loader } from '../../../Components/Loader/SimpleLoader';
import { getNameLable } from '../../../Components/GetNamelabel/GetNameLablel.Screen';
import Colors from '../../../Config/Colors/Colors';
import apiConstants from '../../../Config/Api/apiConstants';

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
                <Text style={{
                    color: Colors.grey,
                    fontSize: 13,
                    paddingTop: 5
                }}>
                    {hoursAgo === 0 ? " an hour ago" : `${hoursAgo} hours ago`}
                </Text>
            </View>
        );
    } else {
        const daysAgo = Math.floor(differenceInSeconds / secondsInDay);
        return (
            <View>
                <Text style={{
                    color: Colors.grey,
                    fontSize: 13,
                    paddingTop: 5
                }}>{daysAgo} days ago</Text>
            </View>
        );
    }
};

const NotificationDetails = (props) => {
    const newsId = props.route.params.myProp;
    const prevScreen = props.route.params.prevScreen;
    const navigation = useNavigation();
    const [data, setData] = useState('');
    const [userId, setUserId] = useState('');
    const [commentText, setCommentText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const savedUser = AsyncStorage.getItem(string.Auth.Current_User_Id);
    savedUser.then((res) => setUserId(res))

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };

    useEffect(() => {
        fetchDataforNews();
    }, []);

    const UnixTimestampToDate = ({ timestamp }) => {
        const timestampNumber = typeof timestamp === 'number' ? timestamp : parseInt(timestamp);
        const date = new Date(timestampNumber * 1000);
        const formattedDate = moment(date).format('DD MMM YYYY');
        return formattedDate
    }

    function cleanTitle(title) {
        return title ? title.replace(/<[^>]*>/g, '') : '';
    }

    const fetchDataforNews = async () => {
        try {
            const apiUrl = apiConstants.NEWS_BASE_URL + apiConstants.NewsDetail + `?newsId=${newsId}&userId=${userId}`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic Z25uLWFwaS11c2VyOkZLbjVyN1JjYUtJI2tTcTJvKUByQF4jMg=='
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                setData(responseData.data)
            } else {
                console.error('Response not OK:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            console.log('Finally Block:');
        }
    };

    const likeCount = async () => {
        const requestBody = {
            isLike: 1,
            newsId: newsId,
            userId: userId
        };
        const requestBodyString = JSON.stringify(requestBody);
        if (data.isLiked === 0) {
            try {
                const response = await fetch(apiConstants.NEWS_BASE_URL + apiConstants.SaveLikeCount, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': string.Token.apiToken
                    },
                    body: requestBodyString
                });
                if (response.ok) {
                    fetchDataforNews()
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                console.log('Finally Block of 1:');
            }
        }
        else {
            const requestBody = {
                newsId: newsId,
                userId: userId
            };
            const requestBodyString = JSON.stringify(requestBody);
            try {
                const response = await fetch(apiConstants.NEWS_BASE_URL + apiConstants.Unlike, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': string.Token.apiToken
                    },
                    body: requestBodyString
                });
                if (response.ok) {
                    fetchDataforNews()
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                console.log('Finally Block of 0:');
            }
        }
    }

    const comment = async () => {
        const requestBody = {
            comment: commentText,
            newsId: newsId,
            userId: userId
        };
        const requestBodyString = JSON.stringify(requestBody);
        if (data.isLiked === 0) {
            try {
                const response = await fetch(apiConstants.NEWS_BASE_URL + apiConstants.SaveComment, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': string.Token.apiToken
                    },
                    body: requestBodyString
                });
                if (response.ok) {
                    fetchDataforNews()
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                console.log('Finally Block of Comment:');
            }
        }
    }

    const refRBSheet = useRef();

    return (
        <>
            <StatusBar
                barStyle={string.Text.Statusbar_Style}
                hidden={true}
            />
            {data != '' ? (
                <View style={styles.body}>
                    {data.news_images && data.news_images.length > 0 && !data.news_video ? (
                        <TouchableOpacity onPress={() => handleImageClick(data.news_images[0])}>
                            <Image source={{ uri: data.news_images[0] }} style={styles.imgStyle} />
                        </TouchableOpacity>

                    ) : (
                        <>
                            <Image
                                source={{ uri: data.news_images[0] }}
                                style={styles.imgStyle}
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('VideoScreen', { videoUri: data.news_video })} style={styles.overlayImage}>
                                <Image
                                    source={require('../../../assets/ic_media_play.png')}
                                    style={styles.overlayImage}
                                />
                            </TouchableOpacity>
                        </>
                    )}
                    <Modal visible={modalVisible} transparent={true}>
                        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
                            {selectedImage && (
                                <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} resizeMode="contain" />
                            )}
                        </TouchableOpacity>
                    </Modal>
                    <View style={styles.card}>
                        <Text style={styles.titleStlye}>{cleanTitle(data.news_category.category_name)}</Text>
                        <Text style={styles.contentStyle}>{cleanTitle(data.title)}</Text>
                        <View style={styles.mainContainer}>
                            <View style={styles.timeContainer}>
                                {prevScreen === 'News' ?
                                    <Text style={styles.timeText}>{
                                        <UnixTimestampToDate timestamp={data.created_date} />}</Text> :
                                    <DaysAgo date={data.created_date} />}

                                <View style={styles.subContainer}>
                                    <Image source={require('../../../assets/eye.png')} style={styles.subContainerViewerImage} />
                                    <Text style={styles.subContainerText}>{data.view_count}</Text>
                                </View>
                                <View style={styles.subContainer}>
                                    <Image source={require('../../../assets/like.png')} style={styles.subContainerImage} />
                                    <Text style={styles.subContainerText}>{data.like_count + " Like"}</Text>
                                </View>
                                <View style={styles.subContainer}>
                                    <Image source={require('../../../assets/comment.png')} style={styles.subContainerImage} />
                                    <Text style={styles.commentText}>{data.comment_count + " Comments"}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <ScrollView style={styles.scrollContainer}>
                                <Text style={styles.descriptionText}>{cleanTitle(data.news_description)}</Text>
                            </ScrollView>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/back.png')}
                            style={styles.backImage}
                        />
                    </TouchableOpacity>
                    <RBSheet
                        ref={refRBSheet}
                        height={730}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent"
                            },
                            draggableIcon: {
                                backgroundColor: "#000"
                            },
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            {data.comments.map((comment, index) => (
                                <View key={index} style={{ flexDirection: "row", paddingHorizontal: 15, paddingTop: 10 }}>
                                    <View style={styles.imageLable_Container}>
                                        <Text style={styles.imageLable}>
                                            {getNameLable(comment.firstName + comment.lastName)}
                                        </Text>
                                    </View>
                                    <View style={styles.commentBody}>
                                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.Black }}>
                                                {comment.firstName + ' ' + comment.lastName}
                                            </Text>
                                            <Text style={{ fontSize: 12, color: Colors.grey, paddingStart: 10 }}>
                                                {<UnixTimestampToDate timestamp={comment.commentDate} />}
                                            </Text>
                                        </View>
                                        <Text key={index}>{comment.commentContent}</Text>
                                    </View>
                                </View>
                            ))}
                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                <View style={styles.commentInputContainer}>
                                    <TextInput
                                        style={styles.commentInput}
                                        placeholder="Write a comment..."
                                        onChangeText={(text) => setCommentText(text)}
                                    />
                                    <TouchableOpacity
                                        style={styles.commentButtonInside}
                                        onPress={() => comment()}
                                    >
                                        <Text>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </RBSheet>

                    <View style={styles.actionButtons}>
                        {data.isLiked === 0 ?
                            <TouchableOpacity style={styles.likeButton} onPress={() => likeCount()}>
                                <View style={styles.btnContainer}>
                                    <Image source={require('../../../assets/like.png')} style={styles.btnImgStyle} />
                                    <Text style={styles.buttonText}>Like</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.likeButton} onPress={() => likeCount()}>
                                <View style={styles.btnContainer}>
                                    <Image source={require('../../../assets/like.png')} style={styles.btnImgStyle} />
                                    <Text style={styles.buttonTextLike}>Like</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={styles.commentButton} onPress={() => refRBSheet.current.open()} >
                            <View style={styles.btnContainer}>
                                <Image source={require('../../../assets/comment.png')} style={styles.btnImgStyle} />
                                <Text style={styles.buttonText}>Comment</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View >
            ) : loader()}
        </>
    );
};

export default NotificationDetails;