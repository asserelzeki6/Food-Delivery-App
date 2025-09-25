import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { images } from '@/constants'
import { Slot } from 'expo-router'
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function _layout() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <ScrollView className='bg-white h-full' keyboardShouldPersistTaps='handled'>
        <View className='w-full relative' style={{height: Dimensions.get('screen').height / 2.25}}>
          <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg' resizeMode='stretch'/>
          <Image source={images.logo} className='self-center size-40 absolute  -bottom-16 z-10' resizeMode='contain' />
        </View>
        <CustomInput 
          placeholder='Enter your email'
          value={''}
          label='Email'
          onChangeText={(text) => {}}
          keyboardType='email-address'

        />
        <CustomButton />
      </ScrollView>
      <Slot />
    </KeyboardAvoidingView>
  )
}