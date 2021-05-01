import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet, Image, Platform, PermissionsAndroid, Alert } from 'react-native'
import { Block, Text, Icon } from '../../../common/elements'
import { images } from '../../../constants';
import { COLORS } from '../../../common/elements/theme';
import lib from '../../../lib';
import FoodTag from './FoodTag';
const { price } = lib;

function FoodItemCard({ item }) {
    return (
        <Block card style={styles.cardView} shadow>
            <Block color={COLORS.primary} height={8}/>
            {/* Title */}
            <Block row marginVertical={16} marginHorizontal={20} >
                <Block flex={7}>
                    <Text titleHeavy>{item.foodNm}</Text>
                </Block>
                <Block flex={3} row right center>
                    <Text titleHeavy>{price.comma(item.foodCost)} 원</Text>
                </Block>
            </Block>
            {/* FoodTag */}
            <Block row left marginHorizontal={20}>
                {item.bestfoodyn == 'Y' ? (<FoodTag imageSource={images.star} text='Best'/>): null}
                {item.premiumyn == 'Y'  ? (<FoodTag imageSource={images.flame} text='프리미엄'/>) : null}
                {item.recommendyn == 'Y'  ?  (<FoodTag imageSource={images.recommend} text='추천'/>) : null }
                {item.tvShow == 'Y'  ? (<FoodTag imageSource={images.tv} text='TV '/>) : null }
            </Block>
            {/* FoodInfo */}
            <Block  marginTop={16}>
                <Block marginHorizontal={20} paddingVertical={16}>
                    <Text subHeaderHeavy marginVertical={4}>Detail</Text>
                    <Text>{item.etc}</Text>
                    <Text subHeaderHeavy marginVertical={4}>성분</Text>
                    <Text>{item.foodMaterial}</Text>
                </Block>
            </Block>
        </Block>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: 'white',
        marginVertical: 16,
        borderBottomWidth: 0.5,
        borderColor: COLORS.color_gray_500
    },
    foodTagView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.color_gray_200,
        padding: 8,
        marginRight: 8,
    },
    foodInfo: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: COLORS.color_gray_400
    }
})

export default React.memo(FoodItemCard);