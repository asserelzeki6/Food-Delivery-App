import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { CustomButtonProps, CustomInputProps } from '@/type'
import cn from 'clsx'

const CustomInput = ({
    placeholder="Enter text",
    value,
    onChangeText,
    label,
    secureTextEntry=false,
    keyboardType="default",
}: CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
  return (
    <View className='w-full'>
      <Text className='label'>{label}</Text>
      <TextInput
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor='#888'
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn("input", isFocused ? 'border-primary' : 'border-gray-300')}

      />
    </View>
  )
}

export default CustomInput