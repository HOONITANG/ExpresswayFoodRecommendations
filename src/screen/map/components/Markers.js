
import React from 'react'
import { Marker, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Animated, StyleSheet } from 'react-native'
import { Block, Text, Icon } from '../../../common/elements'
import images from '../../../constants/images';
import lib from '../../../lib';
import { COLORS } from '../../../common/elements/theme';
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
                tracksViewChanges={false}
            >
                <>
                    <Animated.View style={styles.markerWrap}>
                        <Animated.Image
                            source={item.tvShow == "Y" ? images.foodMarker : images.mapMarker} 
                            style={styles.marker}
                            resizeMode="cover"
                        />
                    </Animated.View>
                    <Callout onPress={() => onMarkerPress(item)}>
                        <Block width={160}>
                            <Text style={styles.calloutTitle}>{item.unitName}</Text>
                            <Text style={styles.calloutDescription}>{ item.routeName } </Text>
                            { myLocation && <Text style={styles.calloutDescription}>{ helper.getDistance(myLocation, item) + "KM" + "\n" } </Text>}
                            <Text color={COLORS.skyblue}>????????????</Text>
                        </Block>
                    </Callout>
                </>
            </Marker>
        )
    })
}

export default React.memo(Markers);