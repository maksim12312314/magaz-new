import React, {useContext, useState} from "react";
import { ScrollView, Text, Image, View, TouchableOpacity, AsyncStorage } from "react-native";
import styles from "./styles";
import config from "../../../../config";
import { stateContext, dispatchContext } from "../../../../contexts";
import {Picker} from "native-base";

const address = config.getCell("StoreAddress");

const AttrPicker = (props) =>
{
    const {data, onValueChange} = props;
    const [selected, setSelected] = useState(data.options[0]);

    return (
        <>
        <Text style={{color:  "#FFF", fontWeight: "bold"}}>{data.name}</Text>
        <Picker
            note
            mode="dropdown"
            style={styles.picker}
            selectedValue={selected}
            onValueChange={(val) => setSelected(val)}
        >
            {data.options.map( (v, i) => <Picker.Item label={v} key={i} value={i} />)}
        </Picker>
        </>
    )
}

const AttrPickersParent = (props) =>
{
    const {data} = props;
    return (
        <>
            {data.map( (v, i) =>
            {
                return <AttrPicker data={v} key={i}/>
            })}
        </>
    )
}

/** Список товаров той или иной категории */
const ProductsItem = (props) =>
{
    const {data} = props;
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const [selected, setSelected] = useState({});
    const itemAttributes = data?.attributes?.nodes || [];
    
    return (
        <View style={styles.container}>

            <Text style={styles.title}>{data.name}</Text>
            <View style={styles.card}>
                <View style={styles.left}>
                    <Image
                        style={styles.picture}
                        source={{uri: data?.image?.mediaDetails?.file ? `${address}wp-content/uploads/` + data.image.mediaDetails.file
                        :  `${address}wp-content/uploads/woocommerce-placeholder.png` }}
                    />
                </View>
                    <View style={styles.right}>
                        <AttrPickersParent data={itemAttributes}/>
                    </View>
            </View>
                <View style={styles.bottom}>
                    <Text style={styles.price}>Цена: {data.price || "Бесплатно"}</Text>
                        <TouchableOpacity style={styles.button} onPress={ (e) =>
                        {
                            // Обрабатываем нажатие на кнопку "Купить"

                            // Заносим данные
                            let payload = {
                                id: data.productId,
                                name: data.name,
                                count: 1,
                                price: data.price ? data.price.match(/\d{1,5}.*\d*/)[0] : 0,
                                stockQuantity: data.stockQuantity || 99,
                                selectedVariants: [
                                    "variantID"
                                ]
                            }
                            // Добавляем в корзину
                            dispatch({type: "AddToCart", payload:payload, dispatch: dispatch});
                        }}>
                            <Text style={styles.text_button}>Купить</Text>
                        </TouchableOpacity>
                </View>
                    <View>
                        <Text style={styles.descriptionText}>{data.description?.replace(/<\/*.+?\/*>/gi, "") || ""}</Text>
                    </View>
        </View>
            

    );
}

export default ProductsItem;