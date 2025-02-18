import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { getProperties } from "../../../lib/appwrite.ts";
import { useAppwrite } from "../../../lib/useAppwrite.ts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Models } from "react-native-appwrite";
import NoResults from "../../../components/NoResults.tsx";
import Filters from "../../../components/Filters.tsx";
import { Card } from "../../../components/Cards.tsx";
import Search from "../../../components/Search.tsx";
import icons from "../../../constants/icons.ts";

const Explore = () => {
  const params = useLocalSearchParams<
    { query?: string; filter: string }
  >();

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Button title="Seed" onPress={seed} /> */}
      <FlatList
        data={properties}
        renderItem={({ item }: { item: Models.Document }) => (
          <Card
            item={item}
            onPress={() => handleCardPress(item.$id)}
          />
        )}
        ListEmptyComponent={loading
          ? (
            <ActivityIndicator
              size="large"
              className="text-primary-300, mt-5"
            />
          )
          : <NoResults />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex px-5 gap-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex-row flex items-center justify-between mt-5">
              <TouchableOpacity
                onPress={router.back}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Search for Your Ideal Home
              </Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>

            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
