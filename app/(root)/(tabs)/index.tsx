import {
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

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Button title="Seed" onPress={seed} /> */}
      <FlatList
        data={[1, 2, 3, 4]}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex px-5 gap-5"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Card />}
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
              <FlatList
                data={[1, 2, 3, 4, 5]}
                keyExtractor={(item) => item.toString()}
                renderItem={(item) => <FeaturedCard />}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
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
