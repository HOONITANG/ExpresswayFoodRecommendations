
import React, { useEffect, useState } from 'react'
import { Marker, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Animated, StyleSheet } from 'react-native'
import { Block, Text, Icon } from '../../../common/elements'
import images from '../../../constants/images';
import lib from '../../../lib';
const { helper } = lib;

const styles = StyleSheet.create({
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:60,
        height:60,
    },
    marker: { 
        height: 50, 
        width: 50, 
    },
    calloutTitle: {
        fontSize: 17,
        marginBottom: 5,
        fontWeight: "bold"
    },
    calloutDescription: {
        fontSize: 14
    }
});

function MyMarker ({ myLocation }) {
    if(!myLocation) {
        return (
            <Block></Block>
        )
    }
    return (
        <Marker
            coordinate={{
                latitude: parseFloat(myLocation.latitude),
                longitude: parseFloat(myLocation.longitude),
            }}
        >
            <Animated.View style={styles.markerWrap}>
                <Animated.Image
                    source={images.carMarker} 
                    style={styles.marker}
                    resizeMode="cover"
                />
            </Animated.View>
        </Marker>
    )
}

export default MyMarker;