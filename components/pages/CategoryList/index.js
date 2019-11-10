import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator, AsyncStorage } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { stateContext, dispatchContext } from "../../../contexts";
import CategoryItem from "./CategoryItem";
import styles from "./styles";
import Header from "../../Header/index";
import config from "../../../config";

const address = config.getCell("StoreAddress");

/**Список категорий товаров*/
const CategoryList = (props) =>
{
    const { navigation } = props;
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
	
	const [error, setError] = useState(false);

    // Получаем данные от сервера или хранилища
    useEffect( () =>
    {
        if ( !state?.categories?.length )
        {
            var categories;
            ( async () =>
            {
                // Получаем список категорий с хранилища
                categories = await AsyncStorage.getItem("categoryList");
                
                // И устанавливаем его если есть
                if ( categories )
                {
                    categories = JSON.parse(categories);
                    dispatch({type: "SetCategoriesList", payload: categories})
                }
            })();
            
            fetch(`${address}graphql`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                        {
                            productCategories(where: {hideEmpty: true}) {
                                nodes {
                                  name
                                  productCategoryId
                                  image {
                                    mediaDetails {
                                      file
                                    }
                                  }
                                }
                              }
                        }
                    `,
                }),
                })
				.then(res => res.json())
                .then( ({data}) => 
                    {
                        ( async () =>
                        {
                            dispatch({type: "SetCategoriesList", payload: data});
                            await AsyncStorage.setItem("categoryList", JSON.stringify(data));
                        })()
                    })
                .catch(err => setError(true))

        }
    }, []);


    return (
        <ScrollView style={styles.view}>
            <LinearGradient
                style={styles.background}
                locations={[0, 1.0]} 
                colors={['#078998', '#65B7B9']}>
					<Header {...props} showTitle = {true} showCart={true}/>
                    <View style={styles.categorylist}>
						{ state?.categories?.length ?
							state.categories.map( (v, k) =>
							{
								return <CategoryItem navigation={navigation} name={v.name} id={v.productCategoryId} imageUrl={v?.image?.mediaDetails?.file} key={k}/>
							})
						: error ? <Text style={styles.error}>Произошла ошибка при подключении. Проверьте интернет соединение и повторите попытку.</Text>
							: <ActivityIndicator style={styles.loading} size="large" color="#fff"/>
						}
					</View>
            </LinearGradient>
		</ScrollView>
    );
}

export default CategoryList;