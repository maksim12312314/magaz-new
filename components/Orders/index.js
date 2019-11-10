import React, {useState, useContext} from "react";
import { LayoutAnimation, Platform, UIManager, View, StyleSheet, TextInput, Text, Dimensions, Button, TouchableOpacity, ScrollView } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { stateContext, dispatchContext } from "../../contexts";
import { NavigationActions } from "react-navigation";
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
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        width: 90,
        marginLeft: 25,
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
       

    },
    data: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: 300,
    },
    header: {
        marginBottom: 20,
    },
    Buttons: {
       
    },
    button_back: {
       
        paddingHorizontal: 4,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffff',
       // position: "absolute",
        left: 0,
        right:0,
        width: Dimensions.get("window").width,
        marginBottom: 15,
        marginTop: 10,
    },
    button_go: {
       
        paddingHorizontal: 4,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffff',
        //position: "absolute",
        left: 0,
        right:0,
        marginBottom:10,
    },    
    text_button: {
        color: "#961EC4",
        
    }, 
    time: {
        bottom: 18,
    }, 
    UpHeader: {
        color: '#fff',
    },
    text_info: {
        
        color: "#fff",
    }
});

const TextField = (props)=>{

    const [isFocused, setFocus] = useState(false);
    
    const [text, setText] = useState("");
    

    

    return (
                <View style={styles.container}>
                    <Text style={{...styles.text, top: (isFocused||text)?-20:0, opacity: (isFocused||text)?0.7:1}} >{props.text}</Text>
                    <TextInput value={text} onChangeText={(e)=>{setText(e)}} style={styles.text_input} onFocus={()=>{setFocus(true);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}} onBlur={()=>{setFocus(false);LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);}} ></TextInput>
                </View>
    )   

}



/** Компонент списка заказов */
const Orders = (props) =>
{

    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const { navigation } = props;

    return (
        <ScrollView>
        <LinearGradient style={styles.grad} locations={[0, 1.0]} colors={["#931DC4", "#F33BC8"]}/>
        
        <Header {...props} showBack={true} showCart={true}/>
        <View style={styles.main}>
            <View>
                <Text style={styles.UpHeader}>Заказы</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.textDelivery}>Выполненые заказы</Text>
                <View style={styles.line}></View>
		    </View>
            <View style={styles.time}>
                <Text style={styles.text}>26 августа 2019, 4 часа утра</Text>
            </View>
            <View style={styles.data}>
                <Text style={styles.text_info}>Имя: {state["name"]}</Text>
                <Text style={styles.text_info}>Телефон: {state["phone"]}</Text>
                <Text style={styles.text_info}>Адрес: {state["address"]}</Text>
                <Text style={styles.text_info}>Этаж: {state["floor"]}</Text>
                <Text style={styles.text_info}>Примечания: {state["notes"]}</Text>
                <Text style={styles.text_info}>Когда привезти: {state["when"]}</Text> 
                    
            </View>
            <View style={styles.Buttons}>
                   <TouchableOpacity style={styles.button_back} onPress={()=>{navigation.navigate('DeliveryDetails')}}>
                        <Text style={styles.text_button}>Редактировать</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.button_go}>
                         <Text style={styles.text_button}>Разместить</Text>
                   </TouchableOpacity>
                </View>
                
                <View style={styles.data}>
                    <Text style={styles.text_info}>Имя: {state["name"]}</Text>
                    <Text style={styles.text_info}>Телефон: {state["phone"]}</Text>
                    <Text style={styles.text_info}>Адрес: {state["address"]}</Text>
                    <Text style={styles.text_info}>Этаж: {state["floor"]}</Text>
                    <Text style={styles.text_info}>Примечания: {state["notes"]}</Text>
                    <Text style={styles.text_info}>Когда привезти: {state["when"]}</Text> 
                </View>
                <View style={styles.Buttons}>
                   <TouchableOpacity style={styles.button_back} onPress={()=>{navigation.navigate('DeliveryDetails')}}>
                        <Text style={styles.text_button}>Редактировать</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.button_go}>
                         <Text style={styles.text_button}>Разместить</Text>
                   </TouchableOpacity>
                </View>
                <View style={styles.data}>
                    <Text style={styles.text_info}>Имя: {state["name"]}</Text>
                    <Text style={styles.text_info}>Телефон: {state["phone"]}</Text>
                    <Text style={styles.text_info}>Адрес: {state["address"]}</Text>
                    <Text style={styles.text_info}>Этаж: {state["floor"]}</Text>
                    <Text style={styles.text_info}>Примечания: {state["notes"]}</Text>
                    <Text style={styles.text_info}>Когда привезти: {state["when"]}</Text>
                </View>
                <View style={styles.Buttons}>
                   <TouchableOpacity style={styles.button_back} onPress={()=>{navigation.navigate('DeliveryDetails')}}>
                        <Text style={styles.text_button}>Редактировать</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.button_go}>
                         <Text style={styles.text_button}>Разместить</Text>
                   </TouchableOpacity>
                </View>
        
            </View>

               
        </ScrollView>
    );
}

export default Orders;