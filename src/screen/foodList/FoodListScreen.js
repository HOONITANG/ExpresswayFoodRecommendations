import React from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Dimensions, Alert } from 'react-native'
import { Block, Text, Icon } from '../../common/elements';
import { connect } from 'react-redux';
import { addTodo } from '../../state/todo/todoActions';
import { useFoods } from '../../api/apiHandler';
import { COLORS } from '../../common/elements/theme';
import { useState } from 'react/cjs/react.development';
import lib from '../../lib';
import FoodItemCard from './components/FoodItemCard';


const { price } = lib;
const { width, height } = Dimensions.get("window");

function FoodListScreen ({ navigation, route, addTodo }) {

    const { params } = route;
    const { stdRestCd } = params;
    const { 
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage } = useFoods(stdRestCd);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentInfoIndex, setCurrentInfoIndex] = useState(null);

    const handleAddFavorite = () => {
        params.gas = "N";
        params.rest = "Y";
        addTodo(params);
        Alert.alert("즐겨찾기에 등록되었습니다. ")
    }

    const initialState = {
        categories: [
            { 
                name: '대표', 
                icon: <Icon type="antdesign" style={styles.infoIcon} name="star" size={25}/>,
                onPress: () => {}
            },
            {
                name: 'BEST',
                icon: <Icon type="antdesign"  name="heart" style={styles.infoIcon} size={25} />,
                onPress: () => {}
            },
            {
                name: '추천',
                icon: <Icon type="antdesign"  name="like1" style={styles.infoIcon} size={25} />,
                onPress: () => {}
            },
            {
                name: 'Tv',
                icon: <Icon type="antdesign" name="iconfontdesktop" style={styles.infoIcon} size={25} />,
                onPress: () => {}
            },
            {
                name: '정보',
                icon: <Icon type="antdesign"  name="infocirlce" style={styles.infoIcon} size={25} />,
                onPress: (findex, index) => { 
                    setCurrentIndex(findex === currentIndex ? null : findex)
                    setCurrentInfoIndex(index);
                }
            },
        ]
    }

    if (status === "loading") return <Text>Loading...</Text>;
    if (status === "error") return <Text>Error :(</Text>;

    return (
        <Block white>
            <Text marginHorizontal={20} titleHeavy marginVertical={16}> 음식 리스트 </Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatListView}
                data={data?.pages.flat()}
                renderItem={({ item }) => (
                    item.list.map( (food, findex) => (
                        <FoodItemCard item={food} key={food.seq}/>
                    ))
                )}
                onEndReached={ hasNextPage ? fetchNextPage : ()=>{}}
                keyExtractor={(item,index) => index.toString()}
            />
            <TouchableOpacity style={{ position: 'absolute', right: 20, left: 20, bottom: 100, }} onPress={handleAddFavorite}>
                <Block 
                    center 
                    middle 
                    padding={12} 
                    borderRadius={4} borderWidth={0.5} 
                    borderColor={COLORS.skyblue} 
                    backgroundColor={COLORS.skyblue}
                    row
                >
                    <Icon type="fontisto" name="favorite" color={COLORS.white} size={18}/>
                    <Text subHeaderHeavy white marginLeft={8}>즐겨찾기 추가</Text>
                </Block>
            </TouchableOpacity>
        </Block>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 16,
    },
    flatListView: {
        marginBottom: 140
    },
    cardHeaderColor: {
        backgroundColor: COLORS.color_primary_300,
        height: 8,
    },  
    cardViewSection: {
        padding: 16,
    },
    cardAddInfo: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: COLORS.gray,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        justifyContent: 'flex-end'
    },
    iconView: {
        height: 60,
        width: 60,
        borderWidth: 0.5,
        borderColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center',
    },
    iconBackground: {
        backgroundColor: COLORS.color_primary_400
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        todo: state.todo_list
    }
}

const mapDispatchToProps = { addTodo }

export default connect(mapStateToProps, mapDispatchToProps)(FoodListScreen)