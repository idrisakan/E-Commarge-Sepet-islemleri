import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../themes/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function Cart({
  data,
  product,
  setProduct,
  getDataFromDB,
  getTotal,
}) {
  const navigation = useNavigation();

  //* Gönderilen idli elemanı asyncStorage dan sildik
  const removeItemFromCart = async id => {
    let itemsArray = await AsyncStorage.getItem('cartItems');
    itemsArray = JSON.parse(itemsArray);
    if (itemsArray) {
      Toast.show({
        type: 'error',
        text1: 'Ürün silindi',
        visibilityTime:1500,
      });
      let array = itemsArray.filter(item => item !== id);
      await AsyncStorage.setItem('cartItems', JSON.stringify(array));
      getDataFromDB();
    }
  };

  //* Gönderilen typea göre ve gönderilen idli ürünün miktarını arttırma ve azaltma
  const updateQuantity = (id, type) => {
    let updateProducts = product.map(item => {
      if (item.id === id) {
        let newQuantity =
          //* Gönderilen type increase ise arttırma işlemi gerçekleştir değilse azaltma işlemi gerçekleşti
          type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        // Güncellenmiş miktar sıfırdan büyük ise güncellenmiş miktarı ata değilse 1 olarak kalsın
        item.quantity = newQuantity > 0 ? newQuantity : removeItemFromCart(id);
      }
      return item;
    });
    setProduct(updateProducts);
    getTotal(updateProducts);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
      style={{
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
      }}>
      <View style={styles.imageContainer}>
        <Image source={data.productImage} style={styles.image} />
      </View>
      <View style={styles.productDetail}>
        <View>
          <Text>{data.productName}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              opacity: 0.6,
              marginTop: 4,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                marginRight: 4,
                maxWidth: '85%',
              }}>
              {data.productPrice * data.quantity} ₺
            </Text>
            <Text>
              {data.productPrice * data.quantity +
                (data.productPrice * data.quantity) / 20}{' '}
              ₺
            </Text>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => updateQuantity(data.id, 'decrease')}>
              <MaterialCommunityIcons name="minus" size={16} />
            </TouchableOpacity>
            <Text>{data.quantity}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => updateQuantity(data.id, 'increase')}>
              <MaterialCommunityIcons name="plus" size={16} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => removeItemFromCart(data.id)}
            style={styles.deleteButton}>
            <MaterialCommunityIcons name="delete-outline" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '30%',
    height: 100,
    marginRight: 22,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productDetail: {
    flex: 1,

    justifyContent: 'space-around',
    height: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: Colors.backgroundLight,
    borderWidth: 0.4,
    padding: 4,
    borderRadius: 100,
    opacity: 0.5,
  },
  deleteButton: {
    backgroundColor: Colors.backgroundMedium,
    color: Colors.backgroundLight,
    padding: 8,
    borderRadius: 100,
    opacity: 0.5,
  },
});
