import React from 'react'
import { View, Text, TextInput, StyleSheet, Touchable } from 'react-native'
import { Block, Icon } from '../../../common/elements'
import { COLORS, FONTS } from '../../../common/elements/theme';
import { useRoutes } from '../../../api/apiHandler';
import helper from '../../../api/helper';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SearchList() {

    const { status, data, fetchNextPage, hasNextPage } = useRoutes();
    let routes;
    let test = [];
    if (status === "loading") return <Text>Loading...</Text>;
    if (status === "error") return <Text>Error :(</Text>;
    if (hasNextPage) {
        fetchNextPage();
    }
    if (!hasNextPage) {
        data?.pages.map((item) => {
            test = test.concat(item.list);
        });
        routes = helper.findRestLocations(test, 'routeName');
    }

    const clickHandler = (item) => {
        const a = test.filter((e, i, self) => {
            return e.routeName == item 
        })
    }

    return (
        <Block scroll >
            <View>
                {routes?.map((item) => (
                    <TouchableOpacity onPress={() => clickHandler(item)}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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