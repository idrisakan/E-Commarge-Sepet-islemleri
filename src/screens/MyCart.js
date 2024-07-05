import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../themes/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../database/Database';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Cart from '../components/Cart';



export default function MyCart() {
  const navigation = useNavigation();

  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  

  useEffect(() => {
    getDataFromDB();
  }, [navigation]);

  const getDataFromDB = async () => {
    // AsyncStorage veriyi al
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items);
    console.log(items);
    let productData = [];

    if (items) {
      
      //  sepetteki ürüne miktar ayarlayabilmek için  dönüp productData dizisine veriyi ekeldik
      Items.forEach(data => {
        if (items.includes(data.id)) {
          data.quantity = 1; //eklenen idli ürünlerin miktarını 1 yap
          productData.push(data); //podyct data dizisine ekle
        }
      });
      // product state günelledik
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct([]);
      setTotal(0);
    }
  };

  const getTotal = productData => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      
      let productPrice =
        productData[index].productPrice * productData[index].quantity;
      total += productPrice;
    }
    setTotal(total);
  };

  const checkout = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }
    navigation.navigate('Home');
  };

  return (
    <>
      {product.length > 0 ? (
        <View
          style={{
            backgroundColor: Colors.white,
            width: '100%',
            height: '100%',
            position: 'relative',
          }}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="chevron-left" size={18} />
            </TouchableOpacity>
            <Text style={styles.orderTitle}>Order Details</Text>
          </View>
          <ScrollView>
            <Text style={styles.myCart}>My Cart</Text>
            <View
              style={{
                paddingHorizontal: 16,
              }}>
              {product.length > 0
                ? product.map(data => (
                    <Cart
                      data={data}
                      product={product}
                      setProduct={setProduct}
                      key={data.id}
                      getDataFromDB={getDataFromDB}
                      getTotal={getTotal}
                    />
                  ))
                : null}
            </View>
            <View>
              <View>
                <Text style={styles.locationText}>Delivery Location</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '80%',
                    }}>
                    <View style={styles.deliveryBox}>
                      <MaterialCommunityIcons
                        name="truck-delivery-outline"
                        size={18}
                        color={Colors.blue}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Colors.black,
                          fontWeight: '500',
                        }}>
                        Adana-Çukurova
                      </Text>
                    </View>
                  </View>
                  <View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={22}
                      color={Colors.black}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.locationText}>Payment Method</Text>
            <View style={{paddingHorizontal: 16, marginVertical: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View style={styles.crediyCard}>
                    <Text style={{color: Colors.blue}}>VISA</Text>
                  </View>
                  <View>
                    <Text>VISA Classic</Text>
                    <Text style={{opacity: 0.6}}>****-1211</Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={22}
                  color={Colors.black}
                />
              </View>
            </View>

            <Text style={styles.locationText}>Order Info</Text>

            <View
              style={{
                paddingHorizontal: 16,
                marginVertical: 10,
                gap: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{opacity: 0.5, fontSize: 12, fontWeight: '400'}}>
                  Subtotal
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  {total} ₺
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{opacity: 0.5, fontSize: 12, fontWeight: '400'}}>
                  Shipiing Tax
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  {total / 20} ₺
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{opacity: 0.5, fontSize: 12, fontWeight: '400'}}>
                  Total
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  {total + total / 20} ₺
                </Text>
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              position: 'absolute',

              bottom: 10,
              height: '8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => checkout()}
              style={{
                backgroundColor: Colors.blue,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                width: '86%',
                height: '90%',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                CHECKOUT {total + total / 20} ₺
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: Colors.white,
          }}>
          <Text>Sepette Ürün Yoktur</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: Colors.blue,
              }}>
              Ürün eklemek İçin ana sayfaya git
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '62%',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 12,
    marginLeft: 10,
  },
  orderTitle: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '400',
  },
  myCart: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 16,
    paddingTop: 20,
    marginBottom: 10,
    color: Colors.black,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.black,
    paddingHorizontal: 16,
    marginVertical: 10,
    letterSpacing: 1,
    fontWeight: '500',
  },
  deliveryBox: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  crediyCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 10,
  },
});
