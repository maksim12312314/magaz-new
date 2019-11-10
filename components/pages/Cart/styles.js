import { StyleSheet } from "react-native";

// CART PAGE STYLES

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    items: {
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        
    },
    itemsBlock: {
        flexDirection: "column",
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
        bottom: 40,
    },
    text_button: {
        color: "#E4724F",
    },
});

export default styles;