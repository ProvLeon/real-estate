import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { categories } from "../constants/data.ts";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All",
  );

  const handleCategoryPress = (category: string) => {
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          className={`flex flex-col items-start mr-4 px-4 rounded-full ${
            selectedCategory ? "bg-primary-300" : "bg-primary-100"
          }`}
        >
          <Text>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
