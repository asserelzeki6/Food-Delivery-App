import { images } from '@/constants';
import { useCartStore } from '@/store/cart.store';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
    const { itemsCount } = useCartStore();
    const router = useRouter();

    const cartPressHandler = () => {
        router.push('/(tabs)/cart');
    }
  return (
    <TouchableOpacity className="cart-btn" onPress={cartPressHandler}>
        <Image
            source={images.bag}
            className="size-5"
            resizeMode="contain"
          />
          {itemsCount > 0 && (
            <View className="cart-badge">
              <Text className="small-bold text-white">{itemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )
}

export default CartButton