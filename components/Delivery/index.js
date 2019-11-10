import React, {useState, useContext} from "react";
import {   LayoutAnimation, Platform, UIManager, View, StyleSheet, TextInput, Text, Dimensions, Button, TouchableOpacity } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { stateContext, dispatchContext } from "../../contexts";
import Header from "./../Header/index";


if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: "row",
    },
    textDelivery: {
        color: '#fff',
        fontWeight: "normal",
        paddingBottom: 10,    
    },
    text: {
        color: '#fff',
        fontWeight: "normal",
        marginRight: 10,   
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: 'center',
        

        
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        width: 90,
        marginLeft: 13,
        opacity: 0.7,
    },
    text_input: {
        height: 20,
        borderBottomWidth: 1,
        borderColor: "#fff",
        color: "#fff",
        maxWidth: 310,
        flexGrow: 1,
        
    },
    grad: {
        //height: Dimensions.get("window").height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 220,

    },
    data: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: 233,
    },
    header: {
        marginBottom: 20,
    },
    button_enabled: {
       
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffff',
        position: "absolute",
        left: 1,
        right: 1,
        bottom: 40,
    },
    button_disabled: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffffaa',
        position: "absolute",
        left: 1,
        right: 1,
        bottom: 40,
    },
    text_button: {
        color: "#3BF3AE",
        
    },
});

/** Компонент текстового поля */
const TextField = (props)=>{

    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const [isFocused, setFocus] = useState(false);
    const {fieldName} = props;

    const [text, setText] = useState("");
   

    return (
                <View style={styles.container}>
                    <Text style={{...styles.text, top: (isFocused||text)?-20:0, opacity: (isFocused||text)?0.7:1}} >{props.text}</Text>
                    <TextInput value={state[fieldName]} onChangeText={(e)=>{dispatch({type:"SetField",fieldName:fieldName,payload:e})}} style={styles.text_input} onFocus={()=>{setFocus(true);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}} onBlur={()=>{setFocus(false);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}} ></TextInput>
                </View>
    )   

}

const hahaha = () =>
{
    const state = useContext(stateContext);
    for ( value in state.deliveryDetails)
    {
        if (!state.deliveryDetails[value])
            return true;
    }
    return false;
}

const ZakazButton = (props) =>
{
    const {navigation, enabled} = props;

    return (
        <TouchableOpacity activeOpacity={enabled ? 0.2 : 1} style={enabled ? styles.button_enabled : styles.button_disabled} onPress={()=>{
            if (enabled)
                navigation.navigate('Orders')
        }
        }>            
                <Text style={styles.text_button}>Оформить заказ</Text>
        </TouchableOpacity>
    )
}

/** Компонент деталей доставки */
const DeliveryDetails = (props) =>
{
    const {navigation} = props;

    const [enabled, setEnabled] = useState(false);
    
    return (
        <>
        <LinearGradient style={styles.grad} locations={[0, 1.0]} colors={["#1DC44F", "#3BF3AE"]}/>
        <Header {...props} showBack={true} showTitle={true} showCart={true}/>
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.textDelivery}>Детали доставки</Text>
                <View style={styles.line}></View>
		    </View>
            <View style={styles.data}>
                <TextField fieldName="name" text="Имя"/>
                <TextField fieldName="phone"  text="Телефон"/>
                <TextField fieldName="address"  text="Адрес"/>
                <TextField fieldName="floor"  text="Этаж"/>
                <TextField fieldName="notes"  text="Примечания"/>
                <TextField fieldName="when" text="Когда привезти"/>
            </View>
            
            
        </View>

        <ZakazButton navigation={navigation}/>
        
        </>
    );
}

export default DeliveryDetails;