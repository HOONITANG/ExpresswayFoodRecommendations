import React from 'react'
import { Image, StyleSheet, TouchableOpacity} from 'react-native'
import { Block, Text } from '../../../common/elements'
import images from '../../../constants/images';

function GpsButton({ handleGpsClick }) {
    return (
        <Block card shadow white style={styles.wrapper} >
            <TouchableOpacity onPress={handleGpsClick}>
                <Block middle center width={60} height={60}>
                    <Image source={images.gps} style={styles.gpsImage}/>
                    <Text marginTop={4} bodyHeavy>내 위치</Text>
                </Block>
            </TouchableOpacity>
         </Block>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        zIndex: 2,
        top: 80,
        right: 20,
        padding: 4
    },  
    gpsImage: {
       width: 40,
       height: 40,
    }
})

export default GpsButton;