import React, { useContext } from "react";
import { View, Dimensions, Alert } from "react-native";
import { dispatchContext } from "../../../../../contexts";
import { faPlusCircle, faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styles from "./styles";
import { useTranslation } from "react-i18next";
import OurIconButton from "../../../../OurIconButton";

import {
    DeleteProductFromCart,
    DecreaseProductQuantity,
    IncreaseProductQuantity,
} from "../../../../../actions";


const size = Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * .05;

/** Компонент, который отображает количество товаров в корзине */
const ItemCount = (props) => {
    const dispatch = useContext(dispatchContext);
    const { productId } = props;
    const { t } = useTranslation();

    const plusPressed = (e) => {
        // Добавляем 1 товар
        dispatch(IncreaseProductQuantity(productId));
    };
    const minusPressed = (e) => {
        // Вычитаем 1 товар
        dispatch(DecreaseProductQuantity(productId, dispatch, t));
    };
    const deletePressed = (e) => {
        Alert.alert(t("cartDeleteTitle"), t("cartDeleteMessage"), [
            {
                text: t("cancel"),
                style: "cancel"
            },
            {
                text: t("ok"),
                onPress: () => {
                    dispatch(DeleteProductFromCart(productId, true));
                },
            },
        ],
        {cancelable: false});
    };

    return (
        <View style={styles.container}>
            <View style={styles.itemControl}>
                <OurIconButton size={size}
                               style={{margin: 1, marginLeft: 0}}
                               icon={faPlusCircle}
                               onPress={plusPressed}
                               doLongPress={true}/>
                <OurIconButton size={size}
                               style={{margin: 1}}
                               icon={faMinusCircle}
                               onPress={minusPressed}
                               doLongPress={true}/>
                <OurIconButton size={size}
                               style={{margin: 1, marginRight: 0}}
                               icon={faTimesCircle}
                               onPress={deletePressed}/>
            </View>
        </View>
    );
}

export default React.memo(ItemCount); 