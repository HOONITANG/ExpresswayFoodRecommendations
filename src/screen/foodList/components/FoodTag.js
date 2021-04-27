import React, { useState, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Block, Text } from '../../../common/elements'
import { COLORS } from '../../../common/elements/theme'

export default function FoodTag({imageSource, text}) {
    return (
        <Block style={styles.foodTagView} card >
            <Image source={imageSource} style={{ width: 25, height: 25 }}/>
            <Block center middle marginLeft={4}>
                <Text bodyHeavy>{text}</Text>
            </Block>
        </Block>
        // <Block style={styles.foodTagView} card >
        //     <Image source={images.flame} style={{ width: 25, height: 25 }}/>
        //     <Block center middle marginLeft={4}>
        //         <Text bodyHeavy>프리미엄</Text>
        //     </Block>
        // </Block>
        // <Block style={styles.foodTagView} card >
        //     <Image source={images.recommend} style={{ width: 25, height: 25 }}/>
        //     <Block center middle marginLeft={4}>
        //         <Text bodyHeavy>추천</Text>
        //     </Block>
        // </Block>
        // <Block style={styles.foodTagView} card >
        //     <Image source={images.tv} style={{ width: 25, height: 25 }}/>
        //     <Block center middle marginLeft={4}>
        //         <Text bodyHeavy>TV</Text>
        //     </Block>
        // </Block>
    )
}


const styles = StyleSheet.create({
    foodTagView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.color_gray_200,
        padding: 8,
        marginRight: 8,
    }
})