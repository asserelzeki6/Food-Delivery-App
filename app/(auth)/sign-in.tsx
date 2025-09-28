import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { signIn } from '@/lib/appwrite';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    setIsSubmitting(true);
    try {
      // call appwrite sign in
      await signIn({ email, password });
      Alert.alert('Success', 'You are now signed in');
      router.replace('/(tabs)');
    }catch (error: any) {
      Alert.alert('Error', (error as string) || ' Invalid email or password');
    }finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className='gap-8 bg-white rounded-lg p-5 mt-5'>




      <CustomInput 
          placeholder='Enter your email'
          value={form.email}
          label='Email'
          onChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType='email-address'

        />
      <CustomInput 
          placeholder='Enter your password'
          value={form.password}
          label='Password'
          onChangeText={(text) => setForm({ ...form, password: text })}
          secureTextEntry={true}
        />
      <CustomButton 
        title="Sign In" 
        onPress={submit} 
      />

      <View className='flex-row justify-center items-center mt-5 gap-2'>
        <Text className='base-regular text-gray-500'>
          Don't have an account? 
        </Text>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text className='base-bold text-primary'> Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View className='flex-row justify-center items-center'>
        <Link href="/sign-up" className=''>
          <Text className='base-regular text-gray-300'> Forgot Password?</Text>
        </Link>
      </View>

    </View>
    )
}

export default SignIn