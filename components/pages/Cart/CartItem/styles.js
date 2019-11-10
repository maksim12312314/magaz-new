import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    item_name: {
        color: "#FFF",
        fontSize: 16,
        width: 150,
    },
    item_price: {
        color: "#FFF",
        fontSize: 16,
        marginHorizontal: 8,
    },
    item_count: {
        color: "#FFF",
        fontSize: 16,
        marginHorizontal: 16,
        flexGrow: 0,
    },
    right: {
        width: 120,
        flexDirection: "row",
        alignItems: "center",
    }
});

export default styles;