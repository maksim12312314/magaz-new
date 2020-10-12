import React, { useLayoutEffect } from "react";
import { Animated, FlatList } from "react-native";
import styles from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderBackButton, HeaderCartButton, HeaderTitle } from "./../../Header/index";
import ProductsItem from './ProductsItem/index';
import { STORE_ADDRESS } from "../../../config";

import {
    SetProductsList,
} from "../../../actions";

import { getProductListQuery } from "../../../queries";
import OurActivityIndicator from "../../OurActivityIndicator";
import useFetch from "../../../network_handler";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const LocallyAnimatedFlatList = ({data, refreshing, onRefresh}) => {
    const x = new Animated.Value(0);
    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x, y } } }], {
        useNativeDriver: true,
    });

    const renderProductItem = ({item, index})=>{
        return (
            <ProductsItem index={index} id={item.productId} data={item} x={x} y={y} galleryImg={item.galleryImages?.nodes[1]?.mediaDetails?.file}
            imageUrl={item.image?.mediaDetails?.file} name={item.name} />
        )
    };

    return (
        <AnimatedFlatList
            contentContainerStyle={{paddingTop: 12}}
            initialNumToRender={2}
            data={data}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={ renderProductItem }
            keyExtractor={item => String(item.productId)}

            {...{ onScroll }}
        />
    )
};

const MemoedLocallyAnimatedFlatList = React.memo(LocallyAnimatedFlatList);

/**Список товаров той или иной категории */
const ProductsList = (props) => {
    const { navigation } = props;
    const { currentCategory } = props.route.params;

    const [gradStart, gradEnd] = ['#499eda', '#2454e5'];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={currentCategory.name}/>,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    const [
        data,
        loading,
        error,
        fetchData,
        abortController
    ] = useFetch(`${STORE_ADDRESS}graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: getProductListQuery(currentCategory.id),
    });

    return (
        <>
            <LinearGradient
                style={styles.productList}
                locations={[0, 1.0]}
                colors={[gradStart, gradEnd]} />
            {
                ( loading || error) ?
                    <OurActivityIndicator error />
                :
                    <MemoedLocallyAnimatedFlatList data={data.data.products.nodes} refreshing={loading} onRefresh={()=>{fetchData()}}/>
            }
        </>
    );
};

export default React.memo(ProductsList);