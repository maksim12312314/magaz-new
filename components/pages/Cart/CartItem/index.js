import React from "react";
import { View, Text } from "react-native";
import ItemCount from "./ItemCount";
import styles from "./styles";

/** Компонент товара в корзине */
const CartItem = (props) =>
{
    const {id, name, price, count} = props.data;
    return (
        <View style={styles.container}>
            <Text style={styles.item_name}>{name}</Text>
            <View style={styles.right}>
                <ItemCount id={id} count={count}/>
                <Text style={styles.item_price}>{price*count}$</Text>
            </View>
        </View>
    );
}

export default CartItem; 