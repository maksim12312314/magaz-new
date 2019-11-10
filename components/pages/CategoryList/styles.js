import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    view: {
    },
    background: {
        minHeight: Dimensions.get("window").height,
    },
    categorylist: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        
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