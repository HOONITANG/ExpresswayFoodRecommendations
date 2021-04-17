import React from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native'
import { Block, Text, Icon } from '../../common/elements';
import { useFoods } from '../../api/apiHandler';
import { COLORS } from '../../common/elements/theme';
import { useState } from 'react/cjs/react.development';
import lib from '../../lib';

const { price } = lib;
const { width, height } = Dimensions.get("window");

export default function FoodListScreen ({ navigation, route }) {

    const { params } = route;
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
        hasPreviousPage } = useFoods(params);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentInfoIndex, setCurrentInfoIndex] = useState(null);

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
                        <Block shadow style={styles.cardView} key={food.seq}>
                            <Block style={styles.cardHeaderColor}/>
                            <Block style={styles.cardViewSection}>
                                <Text headLineHeavy marginBottom={8}>{food.foodNm}</Text>
                                <Text titleHeavy marginBottom={8} color={COLORS.color_gray_700}>{price.comma(food.foodCost)}원</Text>
                                <Text>{food.lsttmAltrDttm}</Text>
                            </Block>
                            <Block style={styles.cardAddInfo}>
                                {
                                    initialState.categories.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => item.onPress(findex, index)}>
                                                <View style={[styles.iconView, 
                                                        (index==0 && food.bestfoodyn == 'Y') ||
                                                        (index==1 && food.premiumyn == 'Y') ||
                                                        (index==2 && food.recommendyn == 'Y') ||
                                                        (index==3 && food.tvShow == 'Y') ||
                                                        (findex === currentIndex && index == currentInfoIndex) ? styles.iconBackground : ""]}>
                                                    {item.icon}
                                                    <Text style={styles.iconText}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </Block>
                            {findex === currentIndex && (
                                <Block padding={16}>
                                    <Text bodyHeavy>설명: </Text>
                                    <Text>{food.etc}{"\n"}</Text>
                                    <Text bodyHeavy>재료: </Text>
                                    <Text>{food.foodMaterial}</Text>
                                </Block>
                            )}
                        </Block>
                    ))
                )}
                onEndReached={ hasNextPage ? fetchNextPage : ()=>{}}
                keyExtractor={(item,index) => index.toString()}
            />
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
        marginBottom: 100
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