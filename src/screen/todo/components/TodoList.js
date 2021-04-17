import React from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet, Image, Platform, PermissionsAndroid } from 'react-native'
import { useRoutes } from '../../../api/apiHandler';
import { Block, Text, Icon } from '../../../common/elements'
import { COLORS } from '../../../common/elements/theme';
import lib from '../../../lib';

const { helper } = lib;

export default function TodoList({ todo_list, handleDeleteTodo, onNavi }) {

    // const { status, data, fetchNextPage, hasNextPage } = useRoutes();
    // let favorList;
    // let list = [];
    // if (status === "loading") return <Text>Loading...</Text>;
    // if (status === "error") return <Text>Error :(</Text>;

    // if (hasNextPage) {
    //     fetchNextPage();
    //     return <Text>Loading...</Text>
    // }
    // if (!hasNextPage) {
    //     data?.pages.map((item) => {
    //         list = list.concat(item.list);
    //     });
    //     // favorList = helper.findByIds(list, todo_list, 'serviceAreaCode');
    //     // console.log(favorList);
    // }

    const renderTodoList = () => {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity key={item.unitCode} onPress={() => onNavi(item.stdRestCd)}>
                    <Block card shadow style={styles.cardView}>
                        {/* <Image style={styles.cardViewImage} source={{uri: "https://via.placeholder.com/80"}} /> */}
                        <View style={styles.cardTextView}>
                            <View style={[styles.row,{ alignItems: 'center', justifyContent: 'space-between'}]}>
                                <View style={[styles.row,{ alignItems: 'center', justifyContent: 'space-between'}]}>
                                    <Text titleHeavy style={styles.textMargin}>{item.routeName}</Text> 
                                </View>
                                <TouchableOpacity onPress={() =>handleDeleteTodo(item.serviceAreaCode)}>
                                    <Block 
                                        center 
                                        middle 
                                        padding={16} 
                                    >
                                        <Text color={COLORS.tertiary}>삭제</Text>
                                    </Block>
                                </TouchableOpacity>
                            </View>
                            <Text subHeaderHeavy  marginBottom={8}>{item.unitName}</Text>
                            {item.tvShow == 'Y' && <Text>#맛비네이션 TV 방송 </Text>}
                            <View style={[styles.row,{ alignItems: 'center', justifyContent: 'space-between'}]}>
                                <Text color={COLORS.color_gray_700} style={styles.textMargin}>대표음식: {item.batchMenu}</Text> 
                                {/* <Text primary>{helper.getDistance(myLocation, item)}KM</Text> */}
                            </View>
                        </View>
                    </Block>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.container}>
                <Text>휴게소 | 주유소</Text>
                <FlatList
                    renderItem= { renderItem }
                    data= {todo_list}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

    return (
        renderTodoList()
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
    },  
    textMargin: {
        marginRight: 16,
    },
    cardView: {
        flexDirection: 'row',
        marginVertical: 16, 
        marginHorizontal: 8,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8,
    },
    cardViewImage: {
        width: 80, 
        height: 80,
        marginRight: 16, 
    },
    cardTextView: {
        flex: 1, // flex:1 을 해줘야 아래 row가 width 100%를 가짐
        justifyContent: 'space-around'
    }
})