import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { Category, MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import dummyData from "../../lib/data";

const Search = () => {
    const { category, query } = useLocalSearchParams<{query: string; category: string}>()

    // const { data, refetch, loading } = useAppwrite({ fn: getMenu, params: { category,  query,  limit: 6, } });
    // const { data: categories } = useAppwrite({ fn: getCategories });
    const data = {
        menus: dummyData.menu.filter(menu => {
            const matchesCategory = category && category !== 'all' ? menu.category_name === category : true;
            const matchesQuery = query ? menu.name.toLowerCase().includes(query.toLowerCase()) : true;
            return matchesCategory && matchesQuery;
        }),
        // categories: dummyData.categories || CATEGORIES
    }
    const loading = false;
    const categories = dummyData.categories;
    // For demo purposes, we'll use dummy data
    // useEffect(() => {
    //     refetch({ category, query, limit: 6})
    // }, [category, query]);

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={data.menus}
                renderItem={({ item, index }) => {
                    const isFirstRightColItem = index % 2 === 0;

                    return (
                        <View className={cn("flex-1 max-w-[48%]", !isFirstRightColItem ? 'mt-10': 'mt-0')}>
                            <MenuCard item={item as unknown as MenuItem} />
                        </View>
                    )
                }}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperClassName="gap-7"
                contentContainerClassName="gap-7 px-5 pb-32"
                ListHeaderComponent={() => (
                    <View className="my-5 gap-5">
                        <View className="flex-between flex-row w-full">
                            <View className="flex-start">
                                <Text className="small-bold uppercase text-primary">Search</Text>
                                <View className="flex-start flex-row gap-x-1 mt-0.5">
                                    <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                                </View>
                            </View>

                            <CartButton />
                        </View>

                        <SearchBar />

                        <Filter categories={categories as unknown as Category[]} />
                    </View>
                )}
                ListEmptyComponent={() => !loading && <Text>No results</Text>}
            />
        </SafeAreaView>
    )
}

export default Search