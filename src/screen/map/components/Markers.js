
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

function Markers ({ data, onMarkerPress, myLocation }) {
    if(!myLocation) {
        return <Block></Block>
    }
    return data?.map((item,index) => {
        return (
            <Marker
                key={index}
                coordinate={{
                    latitude: parseFloat(item.yValue),
                    longitude: parseFloat(item.xValue),
                }}
                //image={images.mapMarker}
                isPreselected={true}
            >
                <>
                    <Animated.View style={styles.markerWrap}>
                        <Animated.Image
                            source={item.tvShow == "Y" ? images.foodMarker : images.mapMarker} 
                            style={styles.marker}
                            resizeMode="cover"
                        />
                    </Animated.View>
                    <Callout onPress={() => onMarkerPress(item.stdRestCd)}>
                        <Block width={160}>
                            <Text style={styles.calloutTitle}>{item.unitName}</Text>
                            <Text style={styles.calloutDescription}>{
                                item.routeName + "\n"
                                + helper.getDistance(myLocation, item) + "KM" + "\n"
                                + "상세보기"} 
                            </Text>
                        </Block>
                    </Callout>
                </>
            </Marker>
        )
    })
}

export default Markers;