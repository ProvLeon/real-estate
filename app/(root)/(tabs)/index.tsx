import { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../../constants/images.ts";
import icons from "../../../constants/icons.ts";
import Search from "../../../components/Search.tsx";
import { Card, FeaturedCard } from "../../../components/Cards.tsx";
import Filters from "../../../components/Filters.tsx";
import { useGlobalContext } from "../../../lib/global-provider.tsx";
import seed from "../../../lib/seed.ts";
import { useLocalSearchParams } from "expo-router";
import { useAppwrite } from "../../../lib/useAppwrite.ts";
import { getLatestProperties, getProperties } from "../../../lib/appwrite.ts";
import { router } from "expo-router";
import { Models } from "react-native-appwrite";
import NoResults from "../../../components/NoResults.tsx";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<
    { query?: string; filter: string }
  >();

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

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
      limit: 6,
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
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs text-black-100 font-rubik">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Feature
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Featured List Cards */}
              {latestPropertiesLoading
                ? (
                  <ActivityIndicator
                    size="large"
                    className="text-primary-300 mt-5"
                  />
                )
                : !latestProperties || latestProperties.length === 0
                ? <NoResults />
                : (
                  <FlatList
                    data={latestProperties}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }: { item: Models.Document }) => (
                      <FeaturedCard
                        item={item}
                        onPress={() => handleCardPress(item.$id)}
                      />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    contentContainerClassName="flex gap-5 mt-5"
                  />
                )}
            </View>
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />

              {
                /* <View className="flex flex-row gap-5 mt-5">
                <Card />
                <Card />
              </View> */
              }
            </View>
            {/* <FeaturedCard /> */}
          </View>
        }
      />
    </SafeAreaView>
  );
}
