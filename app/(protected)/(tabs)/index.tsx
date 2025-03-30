// TODO: Add react query for caching beers
import { supabase } from "@/lib/supabase";
import { Tables } from "@/types/supabase";
import { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BeerCard, CARD_HEIGHT } from "@/components/BeerCard";

export default function Home() {
  const [beers, setBeers] = useState<Tables<"beers">[]>([]);

  useEffect(() => {
    const fetchBeers = async () => {
      const { data, error } = await supabase.from("beers").select();

      if (!error) {
        setBeers(data);
      }
    };
    fetchBeers();
  }, []);

  const renderItem = useCallback(({ item }: { item: Tables<"beers"> }) => <BeerCard beer={item} />, []);
  const keyExtractor = useCallback((item: Tables<"beers">) => item.id.toString(), []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={beers}
        keyExtractor={keyExtractor}
        getItemLayout={(data, index) => ({
          length: CARD_HEIGHT,
          offset: CARD_HEIGHT * index,
          index,
        })}
        renderItem={renderItem}
        contentContainerClassName="gap-4 p-4"
      />
    </SafeAreaView>
  );
}
