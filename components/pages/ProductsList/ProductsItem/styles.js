import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        paddingVertical: 30,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 26,
        color: "#fff",
        textAlign: "center",
        marginLeft: 90,
    },
    picture: {
        width: 110,
        height: 110,
        borderRadius: 36,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#707070",
    },
    right:
    {
        flex: 1,
        marginRight: 40,
        marginTop: 20,
    },
    left:
    {
        flex: 1,
        marginLeft: 8,
    },
    card:
    {
        width: 350,
        maxHeight: 400,
        flexDirection: "row",
    },
    bottom:
    {
        width: 350,
        maxHeight: 400,
        marginTop: 15,
        flexDirection: "row",
    },
    price:
    {
        fontSize: 16,
        color: "#fff",
        marginLeft: 20,
    },
    picker:
    {
        width: 180,
        color: "#fff",
    },
    button: {
        paddingHorizontal: 40,
        paddingVertical: 5,
        borderRadius: 15,
        textAlign: "center",
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        marginLeft: 50,
    },
    text_button: {
        color: "#078998",
        
    },
    descriptionText:
    {
        color: "#ffffff",
    }
});

export default styles;