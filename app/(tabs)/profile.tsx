import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Profile = () => {
  const { user } = useAuthStore(); 
  const { setIsAuthenticated } = useAuthStore();
  // Example `user` structure from your store:
  // const user = 
  // {
  //   fullName: "Adrian Hajdin",
  //   email: "adrian@jsmastery.com",
  //   phone: "+1 555 123 4567",
  //   addresses: {
  //     home: "123 Main Street, Springfield, IL 62704",
  //     work: "221B Rose Street, Foodville, FL 12345"
  //   },
  //   avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  // }
  const editProfile = () => {
    Alert.alert("Edit Profile", "Edit profile functionality to be implemented.");
  }
  const logout = () => {
    try {
      console.log("Logout function called");
      signOut();
      setIsAuthenticated(false);

      Alert.alert("Logged out", "You have been logged out");
      // seed();
    } catch (error) {
      // console.error("Logout error:", error);
      Alert.alert("Error", "Failed to log out");
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      {/* <View className="flex-row items-center justify-between px-5 py-3">
        <Text className="base-bold">Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="orange" />
        </TouchableOpacity>
      </View> */}
      <ScrollView className="flex-1 px-5  my-10">
        {/* Avatar */}
        <View className="items-center mb-6">
          <View className="relative">
            <Image
              source={{ uri: user!.avatar }}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-1 right-1 bg-primary rounded-full p-1">
              <Ionicons name="pencil" size={14} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info cards */}
        <View className="bg-white rounded-2xl p-4 space-y-4 h-500 gap-10">
          {/* Full Name */}
          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={20} color="orange" />
            <View className="ml-3">
              <Text className="text-xs text-gray-500">Full Name</Text>
              <Text className="text-sm font-medium">{user!.name}</Text>
            </View>
          </View>

          {/* Email */}
          <View className="flex-row items-center">
            <Ionicons name="mail-outline" size={20} color="orange" />
            <View className="ml-3">
              <Text className="text-xs text-gray-500">Email</Text>
              <Text className="text-sm font-medium">{user!.email}</Text>
            </View>
          </View>

          {/* <View className="flex-row items-center">
            <Ionicons name="call-outline" size={20} color="orange" />
            <View className="ml-3">
              <Text className="text-xs text-gray-500">Phone number</Text>
              <Text className="text-sm font-medium">{user!.phone}</Text>
            </View>
          </View> */}

          {/* <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="orange" />
            <View className="ml-3 flex-1">
              <Text className="text-xs text-gray-500">Address 1 - (Home)</Text>
              <Text className="text-sm font-medium">{user!.addresses.home}</Text>
            </View>
          </View> */}

          {/* <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="orange" />
            <View className="ml-3 flex-1">
              <Text className="text-xs text-gray-500">Address 2 - (Work)</Text>
              <Text className="text-sm font-medium">{user!.addresses.work}</Text>
            </View>
          </View> */}
        </View>

        {/* Buttons */}
        <View className="mt-8 space-y-3 gap-2">
          <TouchableOpacity className="bg-white border border-primary py-3 rounded-xl items-center "
            onPress={editProfile}
          >
            <Text className="text-primary font-semibold">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-primary py-3 rounded-xl items-center"
            onPress={logout}
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity className="bg-white border border-primary py-3 rounded-xl items-center "
            onPress={seed}
          >
            <Text className="text-primary font-semibold">Seed</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
}

export default Profile