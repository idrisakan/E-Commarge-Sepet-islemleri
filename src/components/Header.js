import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import { Colors } from '../themes/colors';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <Entypo
          name="shopping-bag"
          style={{
            fontSize: 18,
            borderRadius: 10,
            padding: 12,
            backgroundColor: Colors.backgroundLight,
            color: Colors.backgroundMedium,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
        <MaterialCommunityIcons
          name="cart"
          style={{
            fontSize: 18,
            borderRadius: 10,
            padding: 12,
            border: 1,
            borderColor: Colors.backgroundLight,
            color: Colors.backgroundMedium,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%',
      },
});
