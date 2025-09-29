import { images } from '@/constants';
import { useCartStore } from '@/store/cart.store';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
    const { itemsCount } = useCartStore();

    const cartPressHandler = () => {
        // Handle cart button press
        console.log("Cart button pressed");
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