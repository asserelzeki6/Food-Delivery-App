import { images } from '@/constants';
import useAuthStore from '@/store/auth.store';
import { Redirect, Slot } from 'expo-router';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function AuthLayout() {
  const {isAuthenticated} = useAuthStore();
  // const isAuthenticated = true; // Replace with actual authentication check
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <ScrollView className='bg-white h-full' keyboardShouldPersistTaps='handled'>
        <View className='w-full relative' style={{height: Dimensions.get('screen').height / 2.25}}>
          <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg' resizeMode='stretch'/>
          <Image source={images.logo} className='self-center size-40 absolute  -bottom-16 z-10' resizeMode='contain' />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}