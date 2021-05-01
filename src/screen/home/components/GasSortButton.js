import React from 'react'
import {TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '../../../common/elements'
import { COLORS } from '../../../common/elements/theme'

export default function GasSortButton({ selectBgColor, selectTextColor, select, onPress, text }) {
    return (
        <TouchableOpacity onPress={onPress} style={[ styles.sortButton,  { backgroundColor: select ? selectBgColor : COLORS.color_gray_200 }  ]}>
            <Text subHeaderHeavy color={select ? selectTextColor : COLORS.color_gray_700}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    sortButton: {
        borderRadius: 14,
        marginRight: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
    }
})