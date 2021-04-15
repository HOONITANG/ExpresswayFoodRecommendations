import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Block, Icon } from '../../../common/elements'
import { COLORS, FONTS } from '../../../common/elements/theme';

export default function Header() {
    return (
        <Block marginHorizontal={20} middle center >
            <Icon type='feather' name='search' style={styles.searchIcon} />
            <TextInput 
                style={styles.textInput}
                underlineColorAndroid="transparent"
                textAlign="center"
                // onChangeText={text => onChangeText(text)}
                // placeholder={placeholder}
                // placeholderTextColor={COLORS.color_gray_500}
                // value={text}
            />
        </Block>
    )
}

const styles = StyleSheet.create({
    textInput: {
        ...FONTS.subHeaderLight,
        backgroundColor: COLORS.color_gray_300,
        color: COLORS.black,
        height: 40, 
        width: '100%', 
        borderColor: COLORS.color_gray_400, 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10,
        marginVertical: 8,
    },
    searchIcon: {
        position: 'absolute',
        left: 10,
        zIndex: 2,
    }
})