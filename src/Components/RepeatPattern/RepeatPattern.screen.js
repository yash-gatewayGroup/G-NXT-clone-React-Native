import React from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Colors from '../../Config/Colors/Colors';
import moment from 'moment';
import FastImage from 'react-native-fast-image'
import styles from "./RepeatPattern.style"
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                    {hoursAgo === 0 ? "An hour ago" : `${hoursAgo} hours ago`}
                </Text>
            </View>
        );
    } else {
        const daysAgo = Math.floor(differenceInSeconds / secondsInDay);
        return (
            <View style={styles.daysAgotxt}>
                <Text style={{ fontSize: 11 }}>{daysAgo} days ago</Text>
            </View>
        );
    }
};

const UnixTimestampToDate = ({ timestamp }) => {
    const timestampNumber = typeof timestamp === 'number' ? timestamp : parseInt(timestamp);
    const date = new Date(timestampNumber * 1000);
    const formattedDate = moment(date).format('DD MMM YYYY');
    return formattedDate
}

function cleanDescription(description) {
    const cleanedDescription = description.replace(/<\/?p>/g, '');
    return cleanedDescription;
}

const RepeatPattern = ({ data, onPressItem }) => {
    const swiperDataLength = 3;
    const verticalDataLength = 3;
    const horizontalDataLength = 2;
    const patterns = Math.ceil(data.length / (swiperDataLength + verticalDataLength + horizontalDataLength));
    const patternArray = Array.from({ length: patterns }, (_, index) => {
        const highlightItems = data.filter(item => item.news_display_position === 'highlight');
        const generalItems = data.filter(item => item.news_display_position != 'highlight');
        return (
            <React.Fragment key={index}>
                <View style={{ padding: 5 }}>
                    {index === 0 && highlightItems.length > 0 && (
                        <Swiper
                            style={{ height: 200 }}
                            paginationStyle={styles.pagination}
                            dotStyle={styles.dot}
                            activeDotStyle={styles.activeDot}
                            horizontal={true}
                        >
                            {highlightItems.slice(0, swiperDataLength).map((item, idx) => (
                                <TouchableOpacity onPress={() => onPressItem(item.id)} key={idx} style={styles.slide}>
                                    {item.news_image && item.news_video ?
                                        (
                                            <>
                                                <FastImage
                                                    source={{ uri: item.news_image, priority: FastImage.priority.normal }}
                                                    style={styles.image}
                                                />
                                                <Image
                                                    source={require('../../assets/ic_media_play.png')}
                                                    style={styles.overlayImage}
                                                />
                                            </>
                                        ) :
                                        <Image
                                            source={{ uri: item.news_image }}
                                            style={styles.image}
                                        />
                                    }
                                    <View style={styles.overlapView}>
                                        <Text style={[styles.swiperDescription, { overflow: 'hidden' }]} numberOfLines={1}>{cleanDescription(item.title)}</Text>
                                        <View style={styles.viewersMainContainer}>
                                            <View style={styles.viewersSubContainer}>
                                                <Image
                                                    source={require('../../assets/eye.png')}
                                                    style={styles.imgViewer}
                                                />
                                                <Text style={styles.verticalViewerText}>{item.view_count}</Text>
                                            </View>
                                            <View style={styles.likeContainer}>
                                                <Image
                                                    source={require('../../assets/like.png')}
                                                    style={styles.likeImg}
                                                />
                                                <Text style={styles.verticalViewerText}>{item.like_count}</Text>
                                            </View>
                                            <View style={styles.commentContainer}>
                                                <Image
                                                    source={require('../../assets/comment.png')}
                                                    style={styles.commentImg}
                                                />
                                                <Text style={styles.verticalViewerText}>{item.comment_count}</Text>
                                            </View>
                                            <View style={styles.verticalDateViewerText}>
                                                <Text >{<UnixTimestampToDate timestamp={item.created_date} />}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </Swiper>
                    )}
                </View>
                {generalItems.length > 0 && (
                    <View style={{ paddingTop: 20, height: 300 }}>
                        {generalItems.slice(
                            index * (swiperDataLength + verticalDataLength + horizontalDataLength),
                            (index + 1) * (swiperDataLength + verticalDataLength + horizontalDataLength)
                        )
                            .slice(0, verticalDataLength)
                            .map((item, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={styles.card}
                                    onPress={() => onPressItem(item.id)}
                                >
                                    {item.news_image && item.news_video ?
                                        (
                                            <>
                                                <FastImage
                                                    source={{ uri: item.news_image, priority: FastImage.priority.normal }}
                                                    style={styles.cardImage}
                                                />
                                                <Image
                                                    source={require('../../assets/ic_media_play.png')}
                                                    style={styles.overlayCardImage}
                                                />
                                            </>
                                        ) :
                                        <FastImage
                                            source={{ uri: item.news_image, priority: FastImage.priority.normal, }}
                                            style={styles.cardImage}
                                        />
                                    }
                                    <View style={styles.descriptionContainer}>
                                        <Text style={[styles.descriptionText, { overflow: 'hidden' }]} numberOfLines={2}> {cleanDescription(item.title)} </Text>
                                        <Text style={[styles.titleDescription, { overflow: 'hidden' }]} numberOfLines={1}>{item.news_category.category_name}</Text>
                                        <View style={styles.imageIconContainer}>
                                            <View style={styles.horizontalIconContainer}>
                                                <Image
                                                    source={require('../../assets/eye.png')}
                                                    style={styles.viewerImage}
                                                />
                                                <Text style={styles.viewerText}>
                                                    {item.view_count}
                                                </Text>
                                            </View>
                                            <View style={styles.subContainer}>
                                                <Image
                                                    source={require('../../assets/like.png')}
                                                    style={styles.likeImage}
                                                />
                                                <Text style={styles.viewerText}>
                                                    {item.like_count}
                                                </Text>
                                            </View>
                                            <View style={styles.subContainer}>
                                                <Image
                                                    source={require('../../assets/comment.png')}
                                                    style={styles.commentImage}
                                                />
                                                <Text style={styles.commentText}>
                                                    {item.comment_count}
                                                </Text>
                                            </View>
                                            <DaysAgo date={item.created_date} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                    </View>
                )}
                {generalItems.length > 0 && (
                    <View style={{ flexDirection: "row", height: 200 }}>
                        {generalItems.slice(
                            index * (swiperDataLength + verticalDataLength + horizontalDataLength),
                            (index + 1) * (swiperDataLength + verticalDataLength + horizontalDataLength)
                        )
                            .slice(swiperDataLength + verticalDataLength)
                            .map((item, idx) => (
                                <TouchableOpacity onPress={() => onPressItem(item.id)} key={idx} style={styles.horizontalCard}>
                                    {item.news_image && item.news_video ?
                                        (
                                            <>
                                                <FastImage
                                                    source={{ uri: item.news_image, priority: FastImage.priority.normal, }}
                                                    style={styles.verticalCardImage}
                                                />
                                                <Image
                                                    source={require('../../assets/ic_media_play.png')}
                                                    style={styles.overlayCardImageVertical}
                                                />
                                            </>
                                        ) :
                                        <FastImage
                                            source={{ uri: item.news_image, priority: FastImage.priority.normal, }}
                                            style={styles.verticalCardImage}
                                        />
                                    }

                                    <View style={styles.horizontalDescriptionContainer}>
                                        <Text style={[styles.horizontalDescriptionText, { overflow: 'hidden' }]} numberOfLines={2}>{cleanDescription(item.title)} </Text>
                                        <Text style={{ color: Colors.Yellow, fontSize: 14 }}> {item.news_category.category_name} </Text>
                                        <View style={styles.horizontalIconContainer}>
                                            <Image
                                                source={require('../../assets/eye.png')}
                                                style={styles.imgSize}
                                            />
                                            <Text style={styles.horizontalLikeText}>
                                                {item.view_count}
                                            </Text>
                                            <View style={styles.subContainer}>
                                                <Image
                                                    source={require('../../assets/like.png')}
                                                    style={styles.horizontalLikeImg}
                                                />
                                                <Text style={styles.horizontalLikeText}> {item.like_count} </Text>
                                            </View>
                                            <View style={styles.subContainer}>
                                                <Image
                                                    source={require('../../assets/comment.png')}
                                                    style={styles.horizontalCommentImage}
                                                />
                                                <Text style={styles.horizontalCommentText}>{item.comment_count}</Text>
                                            </View>
                                        </View>
                                        <DaysAgo date={item.created_date} />
                                    </View>
                                </TouchableOpacity>
                            ))}
                    </View>
                )}
            </React.Fragment>
        )
    });
    return <ScrollView style={styles.scrollViewHeight}>{patternArray}</ScrollView>;
};

export default RepeatPattern;