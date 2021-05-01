import React from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { Block, Text } from '../../../common/elements'
import { COLORS } from '../../../common/elements/theme';

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
    if (todo_list.length == 0) return <Text> 즐겨찾기 데이터가 없습니다. </Text>

    const renderTodoList = () => {
        const renderRest = ({ item, index }) => {
            return  item.rest == 'Y' ? (
                <TouchableOpacity key={item.unitCode} onPress={() => onNavi(item)}>
                            <View style={styles.cardView}>
                        {/* <Image style={styles.cardViewImage} source={{uri: "https://via.placeholder.com/80"}} /> */}
                        <View style={styles.cardTextView}>
                            <View style={[styles.row,{ marginBottom: 8, alignItems: 'center', justifyContent: 'space-between'}]}>
                                <Text subHeaderHeavy>{item.unitName}</Text>
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
                            {item.tvShow == 'Y' ? <Text>#맛비네이션 TV 방송 </Text> : <></>}
                            <View style={[styles.row,{ alignItems: 'center', justifyContent: 'space-between'}]}>
                                <Text color={COLORS.color_gray_700} style={styles.textMargin}>대표음식: {item.batchMenu}</Text> 
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                ) : (<></>)
                
        }

        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={renderRest}
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
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        paddingBottom: 8,
    },
    cardViewImage: {
        width: 80, 
        height: 80,
        marginRight: 16, 
        alignSelf: 'center'
    },
    cardTextView: {
        flex: 1, // flex:1 을 해줘야 아래 row가 width 100%를 가짐
        justifyContent: 'center',
    }
})