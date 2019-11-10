import React, { useContext, useState, useEffect } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { stateContext, dispatchContext } from "../../../../contexts";

/** Компонент, который показывает итоговую цену */
const CartTotal = (props) =>
{
    const context = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    
    useEffect( () =>
    {
        dispatch({type: "ComputeTotalPrice"});
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Итого: {context.cartTotalPrice}$</Text>
        </View>
    );
}

export default CartTotal; 