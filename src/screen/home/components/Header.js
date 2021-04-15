import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Block, Icon } from '../../../common/elements'
import { COLORS, FONTS } from '../../../common/elements/theme';

export default function Header({ openModal, placeholder }) {
    return (
        <Block marginHorizontal={20}>
            <TouchableOpacity onPress={openModal}>
                <View  style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Icon type='feather' name='search' style={styles.searchIcon} />
                    <TextInput 
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        textAlign="center"
                        editable={false}
                        pointerEvents="none"
                        // onTouchStart={()=>  alert("Hello...")}
                        // onChangeText={text => onChangeText(text)}
                        // placeholder={placeholder}
                        // placeholderTextColor={COLORS.color_gray_500}
                        value={placeholder}
                    />
                </View>
            </TouchableOpacity>
                
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
        fontWeight: "bold",
    },
    searchIcon: {
        position: 'absolute',
        left: 10,
        zIndex: 2,
    }
})