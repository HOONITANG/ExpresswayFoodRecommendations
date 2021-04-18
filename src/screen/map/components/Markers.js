
import React from 'react'
import { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Animated, StyleSheet } from 'react-native'
import images from '../../../constants/images';

const styles = StyleSheet.create({
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:60,
        height:60,
    },
    marker: { 
        height: 40, 
        width: 40, 
    }
});

function Markers ({ data, onMarkerPress }) {
    return data?.map((item,index) => {
        return (
            <Marker
                key={index}
                coordinate={{
                    latitude: parseFloat(item.yValue),
                    longitude: parseFloat(item.xValue),
                }}
                //image={images.mapMarker}
                title={item.unitName}
                description={item.routeName}
                onPress={onMarkerPress}
            >
                <Animated.View style={styles.markerWrap}>
                    <Animated.Image
                        source={images.mapMarker} 
                        style={styles.marker}
                        resizeMode="cover"
                    />
                </Animated.View>
            </Marker>
        )
    })
}

export default Markers;