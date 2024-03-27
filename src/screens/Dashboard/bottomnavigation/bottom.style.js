import React from 'react'
import Colors from '../../../Config/Colors/Colors';
import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    timeStampContainer: {
        alignItems: "flex-end",
        paddingEnd: 10
    },
    container: {
        flex: 1,
        paddingBottom: "20%",
      },
    notificationItem: {
        flexDirection: 'row',
        padding: 8,
        alignItems: "center",
    },
    notificationBadge: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    notificationImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        alignItems: "center"

    },
    notificationContent: {
        width: "80%"
    },
    notificationDescription: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.black,
    },
    notificationName: {
    },
    notificationHasNewPost: {
        fontWeight: 'normal',
    },
    notificationTimestamp: {
        fontSize: 12,
        color: '#888',
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },
      gridItem: {
        flex: 1,
        height: 100,
        backgroundColor: Colors.SmokyWhite,
        alignItems: 'center',
        justifyContent: 'center',
      },
      gridItemImage: {
        width: 30,
        height: 30, 
        marginBottom: 5,
      },
});
export default styles;