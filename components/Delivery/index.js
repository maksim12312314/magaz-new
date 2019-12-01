import React, {useState, useContext, useEffect} from "react";
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
    const {fieldName, buttonEnabled, setButtonEnabled} = props;

    const [text, setText] = useState("");
   

    useEffect(()=>{
        
            dispatch({type:"SetDeliveryDetailsField",fieldName:fieldName,payload:""})
    }, [] )


    return (
                <View style={styles.container}>
                    <Text style={{...styles.text, top: (isFocused||state.deliveryDetails[fieldName])?-20:0, opacity: (isFocused||state.deliveryDetails[fieldName])?0.7:1}} >{props.text}</Text>
                    <TextInput value={state.deliveryDetails[fieldName]} onChangeText={(e)=>{ dispatch({type:"SetDeliveryDetailsField",fieldName:fieldName,payload:e});
                    dispatch({type:"ChangeButtonStatus", buttonEnabled:buttonEnabled, setButtonEnabled });
                     console.log(!buttonEnabled,state.deliveryDetails[fieldName])
                //      if(isAllDeliveryDetailsSet(state)&&!buttonEnabled&&state.deliveryDetails[fieldName]) setButtonEnabled(true); 
                //     else if(buttonEnabled&&!(state.deliveryDetails[fieldName])) setButtonEnabled(false); 
                  }} 
                    style={styles.text_input} onFocus={()=>{setFocus(true);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}} onBlur={()=>{setFocus(false);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}
                    } >

                    </TextInput>
                </View>
    )   

}





const PlaceOrderButton = (props) =>
{
    const {navigation, buttonEnabled, setButtonEnabled} = props;

    return (
        <TouchableOpacity activeOpacity={buttonEnabled ? 0.2 : 1} style={buttonEnabled ? styles.button_enabled : styles.button_disabled} onPress={()=>{
            if (buttonEnabled)
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

    const [buttonEnabled, setButtonEnabled] = useState(false);

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
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="name" text="Имя"/>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="phone"  text="Телефон"/>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="address"  text="Адрес"/>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="floor"  text="Этаж"/>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="notes"  text="Примечания"/>
                <TextField buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} fieldName="when" text="Когда привезти"/>
            </View>
            
            
        </View>

        <PlaceOrderButton buttonEnabled={buttonEnabled} setButtonEnabled={setButtonEnabled} navigation={navigation}/>
        
        </>
    );
}

export default DeliveryDetails;