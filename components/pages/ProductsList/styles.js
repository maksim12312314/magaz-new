import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    view: {
    },
    items: {
        justifyContent: "center",
    },
    headTitle:{
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 8,
    },
    textTitle:{
        fontSize: 25,
        color:"#fff",
        textAlign:"center",
        borderBottomWidth: 2,
        borderColor: "#FFF",
    },
    productslist: {
        minHeight: Dimensions.get("window").height,
    },
    loading: {
        alignSelf: "center",
        justifyContent: "center",
    },
    error: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
    },
});

export default styles;