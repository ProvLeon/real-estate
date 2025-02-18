import { Image, Text, TouchableOpacity, View } from "react-native";
import images from "../constants/images.ts";
import icons from "../constants/icons.ts";
import { Models } from "react-native-appwrite";

interface Props {
  onPress?: () => void;
  item: Models.Document;
}

export const FeaturedCard = (
  { item: { image, rating, name, address, price }, onPress }: Props,
) => {
  // console.log(item);
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image
        source={{ uri: image }}
        className="size-full rounded-2xl bottom-0"
      />
      <Image
        source={images.cardGradient}
        className="absolute size-full rounded-2xl"
      />
      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          {rating}
        </Text>
      </View>

      <View className="flex flex-col absolute items-start bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-base font-rubik text-white">
          {address}
        </Text>

        <View className="flex flex-row justify-between w-full items-center">
          <Text className="text-xl font-rubik-extrabold text-white ">
            ${price}
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = (
  { item: { image, rating, name, address, price }, onPress }: Props,
) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative flex-1 w-full mt-4 px-3 shadow-lg shadow-black-100/70 rounded-lg py-4 bg-white"
    >
      <View className="flex flex-row items-center bg-white/90 px-3 p-1 rounded-full absolute top-5 right-5 z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          4.5
        </Text>
      </View>

      <Image
        source={{ uri: image }}
        className="w-full h-40 rounded-lg"
      />

      <View className="flex flex-col mt-2">
        <Text
          className="text-base font-rubik-bold text-black-300"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-xs font-rubik text-black-200">
          {address}
        </Text>

        <View className="flex flex-row justify-between mt-2 items-center">
          <Text className="text-base font-rubik-bold text-primary-300 ">
            ${price}
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191d31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
