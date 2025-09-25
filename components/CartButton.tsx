import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants';

const CartButton = () => {
    const totalItems = 3; // Example item count
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
          {totalItems > 0 && (
            <View className="cart-badge">
              <Text className="small-bold text-white">{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      )
}

export default CartButton