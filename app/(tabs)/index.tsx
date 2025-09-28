import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import cn from 'clsx';
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../globals.css";

export default function Page() {
  const {user} = useAuthStore();
  console.log("User:",JSON.stringify(user,null,2));
  return (
      <SafeAreaView className="flex-1 bg-white" >
        
        {/* Offers List */}
        <FlatList
          data={offers}
          renderItem={({ item }) => {
            const isOdd = item.id % 2 !== 0;
            return (
              <View>
                <Pressable 
                className={cn("offer-card", isOdd ? 'flex-row-reverse' : 'flex-row')} 
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fffff22" }}
                >
                  {({ pressed }) => (
                    <Fragment>
                      <View className="h-full w-1/2">
                        <Image
                            source={item.image}
                            className="size-full"
                            resizeMode="contain"
                          />
                      </View>
                      <View className={cn("offer-card__info px-5", isOdd ? 'pl-10' : 'pr-10')}>
                        <Text className="h1-bold text-white leading-tight">
                          {item.title}
                        </Text>
                        <Image
                          source={images.arrowRight}
                          className="size-10"
                          resizeMode="contain"
                          tintColor={pressed ? "#000" : "#ffffff"}
                        />
                      </View>
                    </Fragment>
                  )}
                </Pressable>
              </View>
            );
          }}
          keyExtractor={item => item.id.toString()}
          contentContainerClassName="pb-28 px-5"
          ListHeaderComponent={() => (
            <View className="flex-between flex-row w-full my-5">
              <View className="flex-start">
                <Text className="paragraph-bold text-primary">Deliver To </Text>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="paragraph-bold text-black">Current Location </Text>
                  <Image
                    source={images.arrowDown}
                    className="size-3"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <CartButton />
            </View>
          )}
          
        />
      </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 24,
//   },
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     maxWidth: 960,
//     marginHorizontal: "auto",
//   },
//   title: {
//     fontSize: 64,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 36,
//     color: "#38434D",
//   },
// });
