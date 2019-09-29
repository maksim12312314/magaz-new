import React, {useState} from "react";
import {   LayoutAnimation, Platform, UIManager, View, StyleSheet, TextInput, Text, Dimensions, Button, TouchableOpacity } from "react-native";
import {LinearGradient} from "expo-linear-gradient";



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
    button: {
       
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffff',
        position: "absolute",
        left: 1,
        right: 1,
        bottom: 1
    },
    text_button: {
        color: "#3BF3AE",
        
    },
});


const TextField = (props)=>{

    const [isFocused, setFocus] = useState(false);
    
    const [text, setText] = useState("");

    console.log(isFocused, text);

    return (
                <View style={styles.container}>
                    <Text style={{...styles.text, top: (isFocused||text)?-20:0, opacity: (isFocused||text)?0.7:1}} >{props.text}</Text>
                    <TextInput value={text} onChangeText={(e)=>{setText(e)}} style={styles.text_input} onFocus={()=>{setFocus(true);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}} onBlur={()=>{setFocus(false);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}} ></TextInput>
                </View>
    )   

}


const DeliveryDetails = (props) =>
{



    

    

    return (
        <>
        <LinearGradient style={styles.grad} locations={[0, 1.0]} colors={["#1DC44F", "#3BF3AE"]}/>
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.textDelivery}>Детали доставки</Text>
                <View style={styles.line}></View>
		    </View>
            <View style={styles.data}>
                <TextField text="Имя"/>
                <TextField text="Телефон"/>
                <TextField text="Адрес"/>
                <TextField text="Этаж"/>
                <TextField text="Примечания"/>
                <TextField text="Когда привезти"/>
            </View>
            
            
            
        </View>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.text_button}>Hi padla</Text>
        </TouchableOpacity>
        </>
    );
}

export default DeliveryDetails;