import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import Colors from '../../Config/Colors/Colors';
import { useNavigation } from '@react-navigation/native';

const BottomNav = () => {
    const [selectedImage, setSelectedImage] = useState('home');
    const navigation = useNavigation();
    const handleImageClick = (imageName) => {
        setSelectedImage(imageName)
        imageName == "square-dot" ? navigation.navigate('BottomNavigator', { screen: 'Options' }) :
            imageName == "notification" ? navigation.navigate('BottomNavigator', { screen: 'Notifications' }) :
                imageName == "snacks" ? navigation.navigate('BottomNavigator', { screen: 'Refreshment' }) :
                    imageName == "home" ? navigation.navigate('BottomNavigator', { screen: 'Home' }) : null
    };
    const getImageStyle = (imageName) => {
        if (imageName === selectedImage) return { tintColor: Colors.Yellow };
        return {};
    };
    const navigateToScreen = () => {
        navigation.navigate('CreatePost');
    };
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <TouchableWithoutFeedback onPress={navigateToScreen}>
                    <View style={[styles.button, styles.actionBtn]}>
                        <Image style={styles.imgFloatButton}
                            resizeMode="contain"
                            source={require('../../assets/add.png')} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.bottomNavMainContainer}>
                <View style={styles.bottomNavSubContainer}>
                    <TouchableOpacity onPress={() => { handleImageClick('home') }}>
                        <Image
                            style={[styles.imgSize, getImageStyle('home')]}
                            source={require('../../assets/home.png')}
                            onPress={() => { Alert.alert("") }} >
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.snacksMainContainer}>
                    <TouchableOpacity onPress={() => { handleImageClick('snacks') }}>
                        <Image
                            style={[styles.imgSize, getImageStyle('snacks')]}
                            source={require('../../assets/bottomSnacks.png')}
                            onPress={() => { Alert.alert("click") }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.imgNotificationContainer}>
                    <TouchableOpacity onPress={() => { handleImageClick('notification') }} >
                        <Image
                            source={require('../../assets/notification.png')}
                            onPress={() => { Alert.alert("click") }}
                            style={[styles.imgSize, getImageStyle('notification')]}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.dotsNavBarContainer}>
                    <TouchableOpacity onPress={() => { handleImageClick('square-dot') }}>
                        <Image
                            source={require('../../assets/square-dot.png')}
                            style={[styles.imgSquareSize, getImageStyle('square-dot')]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

export { BottomNav };

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    mainTabBar: {
        height: 40,
        backgroundColor: Colors.SmokyWhite
    },
    button: {
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 40,
        position: 'absolute',
        bottom: 10,
        right: 0,
        top: 10,
        left: 3,
        elevation: 10

    },
    actionBtn: {
        backgroundColor: Colors.Yellow,
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: Colors.SmokyWhite,
    },
    container: {
        flexDirection: 'column',
        backgroundColor: 'grey'
    },
    subcontainer: {
        position: 'absolute',
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        bottom: 25,
        zIndex: 60,
    },
    bottomNavMainContainer: {
        position: 'absolute',
        backgroundColor: Colors.SmokyWhite,
        border: 2,
        radius: 9,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: { height: 3, width: 3 },
        x: 0,
        y: 0,
        style: { marginVertical: 5 },
        bottom: 3,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 25,
        elevation: 40,
    },
    bottomNavSubContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgNotificationContainer: {
        marginStart: 85,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dotsNavBarContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    snacksMainContainer: {
        justifyContent: 'center',
    },
    imgSize: {
        width: 25,
        height: 25
    },
    imgSquareSize: {
        width: 20,
        height: 20,
    },
    imgFloatButton: {
        width: 30,
        height: 30
    }
});