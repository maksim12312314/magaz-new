import React, { useContext } from "react";
import { stateContext, dispatchContext } from "../../../contexts";

import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CartIcon from "./CartIcon";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import styles from "./styles";
import Header from "../../Header/index";

/** Компонент блока товаров  */
const ItemsBlock = (props)=>{

    const state = useContext(stateContext);
    
    
    return (
        <View style={styles.itemsBlock}> 
            { !state.cartItems.length
                ? <Text style={{color: "#FFF"}}>Товаров нет</Text>
                : state.cartItems.map( (v, i) =>
                {
                    return <CartItem key={i} data={v}/>
                }) }
            
        </View>
    )
}

/** Компонент корзины */
const Cart = (props) =>
{
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const {navigation} = props;

    return (
        <View style={styles.container}>
            <LinearGradient
               style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }}
                locations={[0, 1.0]} 
                colors={["#E81C1C", "#E4724F"]}/>
                <Header {...props} showBack={true} showTitle={true}/>
                <CartIcon style={styles.icon}/>

                
                <ItemsBlock/>
          
                   
                
                <CartTotal/>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('DeliveryDetails')}}>
                    <Text style={styles.text_button}>Оформить заказ</Text>
                </TouchableOpacity>
		</View>
    );
}

export default Cart; 