import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { createUser } from '@/lib/appwrite';
import useAuthStore from '@/store/auth.store';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const SignUp = () => {
  const { setIsAuthenticated } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const submit = async () => {
    const { email, password, name } = form;
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    setIsSubmitting(true);
    try {
      // call appwrite sign in
      await createUser({
        email,
        password,
        name,
      });
      Alert.alert('Success', 'You are now signed up');
      setIsAuthenticated(true);
      router.replace('/(tabs)');
    }catch (error: any) {
      Alert.alert("something went wrong", error.message || 'Failed to sign up');
    }finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className='gap-8 bg-white rounded-lg p-5 mt-5'>

      <CustomInput 
          placeholder='Enter your name'
          value={form.name}
          label='Full Name'
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
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
        title="Sign Up" 
        onPress={submit} 
      />
      <View className='flex-row justify-center items-center mt-5 gap-2'>
        <Text className='base-regular text-gray-500'>
          Already have an account? 
        </Text>
        <TouchableOpacity onPress={() => router.push('/sign-in')}>
          <Text className='base-bold text-primary'> Sign In</Text>
        </TouchableOpacity>
      </View>
            
      

    </View>
    )
}

export default SignUp